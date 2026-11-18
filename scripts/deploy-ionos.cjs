const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'out');
const target = 'su154231@access-5021046597.webspace-host.com';
const origin = 'https://temisatrile.com';
const args = process.argv.slice(2);

function run(command, argv, options = {}) {
  const result = spawnSync(command, argv, { cwd: root, stdio: 'inherit', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw Error(`${command} terminó con código ${result.status ?? result.signal}`);
}

const remote = `set -eu
umask 077
dest=/home/www/public
test -d "$dest" && test -w "$dest" && test -f "$dest/index.html" || { echo 'No se encuentra la web en /home/www/public' >&2; exit 1; }
stage=$(mktemp -d "$HOME/.temis-release-XXXXXXXX")
trap 'rm -rf -- "$stage"' EXIT
umask 022
tar -xzf - -C "$stage"
test -s "$stage/index.html"
test -d "$stage/_next/static"
cd "$stage"
# Los archivos con hash deben estar disponibles antes que las páginas nuevas.
cp -R -- _next "$dest/"
for item in .[!.]* ..?* *; do
  [ -e "$item" ] || continue
  case "$item" in _next|index.html) continue ;; esac
  cp -R -- "$item" "$dest/"
done
cp -- index.html "$dest/index.html"
printf '%s\\n' 'Archivos publicados en /home/www/public.'`;

function digest(data) {
  return createHash('sha256').update(data).digest('hex');
}

async function verifyPublicFile(route, expected, contentType) {
  const url = new URL(route, origin);
  url.searchParams.set('deploy-check', String(Date.now()));
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
  if (!response.ok || !response.headers.get('content-type')?.includes(contentType)) {
    throw Error(`${route}: respuesta inesperada en la web pública (${response.status})`);
  }
  if (digest(Buffer.from(await response.arrayBuffer())) !== digest(expected)) {
    throw Error(`${route}: el archivo público todavía no coincide con la compilación local`);
  }
}

async function main() {
  const checkOnly = args.length === 1 && args[0] === '--check';
  if (args.length && !checkOnly) throw Error('Uso: npm run deploy:ionos [-- --check]');
  const npm = process.env.npm_execpath;
  if (!npm) throw Error('Ejecuta el script con npm run deploy:ionos');
  run(process.execPath, [npm, 'run', 'build']);
  const html = fs.readFileSync(path.join(output, 'index.html'));
  if (!html.length) throw Error('out/index.html está vacío');
  const urls = [...new Set(Array.from(html.toString().matchAll(/(?:src|href)="(\/_next\/static\/[\w./-]+\.(?:js|css))"/g), match => match[1]))];
  if (!urls.some(url => url.endsWith('.css')) || !urls.some(url => url.endsWith('.js'))) {
    throw Error('No se encontraron el CSS y el JavaScript de producción en la portada');
  }
  for (const url of urls) fs.accessSync(path.join(output, url.slice(1)));
  console.log(`Exportación verificada: out/index.html y ${urls.length} recursos CSS/JS.`);
  if (checkOnly) return;

  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'temis-ionos-'));
  const archive = path.join(temp, 'site.tar.gz');
  try {
    run('tar', ['-czf', archive, '-C', output, '.']);
    const input = fs.openSync(archive, 'r');
    try {
      console.log('Conectando a IONOS. Introduce tu contraseña si SSH la solicita.');
      run('ssh', ['-T', '-o', 'StrictHostKeyChecking=ask', '-o', 'ConnectTimeout=15', '-p', '22', target, remote], {
        stdio: [input, 'inherit', 'inherit'],
      });
    } finally {
      fs.closeSync(input);
    }
  } finally {
    if (fs.existsSync(archive)) fs.unlinkSync(archive);
    fs.rmdirSync(temp);
  }
  try {
    await verifyPublicFile('/', html, 'text/html');
    const pages = ['servicios', 'servicios/desarrollo-web', 'servicios/automatizacion',
      'servicios/aplicaciones-a-medida', 'servicios/inteligencia-artificial', 'nosotros'];
    await Promise.all(pages.map(page => verifyPublicFile(`/${page}/`, fs.readFileSync(path.join(output, page, 'index.html')), 'text/html')));
    await Promise.all(urls.map(url => verifyPublicFile(url, fs.readFileSync(path.join(output, url.slice(1))), url.endsWith('.css') ? 'text/css' : 'javascript')));
    console.log(`Publicación comprobada: ${origin}/, ${pages.length} páginas interiores y ${urls.length} recursos CSS/JS.`);
  } catch (error) {
    throw Error(`La subida terminó, pero falta validar la web pública: ${error.message}`);
  }
}

main().catch(error => {
  console.error(`Despliegue: ${error.message}`);
  process.exitCode = 1;
});
