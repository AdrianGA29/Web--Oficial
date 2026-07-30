<?php

declare(strict_types=1);

const CONTACT_TO = 'contacto@temisatrile.com';
const CONTACT_FROM = 'contacto@temisatrile.com';
const MAX_REQUEST_BYTES = 16384;
const RATE_LIMIT_WINDOW = 900;
const RATE_LIMIT_ATTEMPTS = 5;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function clean_text(mixed $value): string
{
    if (!is_string($value)) {
        return '';
    }

    return trim(str_replace("\0", '', $value));
}

function valid_origin(): bool
{
    $origin = isset($_SERVER['HTTP_ORIGIN'])
        ? rtrim((string) $_SERVER['HTTP_ORIGIN'], '/')
        : '';

    if ($origin === '') {
        return true;
    }

    $allowed = [
        'https://temisatrile.com',
        'https://www.temisatrile.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ];

    return in_array($origin, $allowed, true);
}

function rate_limit_allows_request(): bool
{
    $address = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR
        . 'temis-atrile-contact';

    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        return true;
    }

    $path = $directory . DIRECTORY_SEPARATOR . hash('sha256', $address) . '.json';
    $handle = @fopen($path, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return true;
    }

    $now = time();
    $contents = stream_get_contents($handle);
    $attempts = json_decode($contents ?: '[]', true);
    $attempts = is_array($attempts) ? $attempts : [];
    $attempts = array_values(array_filter(
        $attempts,
        static fn ($timestamp): bool =>
            is_int($timestamp) && $timestamp > ($now - RATE_LIMIT_WINDOW)
    ));

    $allowed = count($attempts) < RATE_LIMIT_ATTEMPTS;

    if ($allowed) {
        $attempts[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($attempts));
        fflush($handle);
    }

    flock($handle, LOCK_UN);
    fclose($handle);

    return $allowed;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Método no permitido.']);
}

if (!valid_origin()) {
    respond(403, ['ok' => false, 'message' => 'Origen no permitido.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > MAX_REQUEST_BYTES) {
    respond(413, ['ok' => false, 'message' => 'Solicitud no válida.']);
}

$rawBody = file_get_contents('php://input');
if (
    $rawBody === false
    || $rawBody === ''
    || strlen($rawBody) > MAX_REQUEST_BYTES
) {
    respond(413, ['ok' => false, 'message' => 'Solicitud no válida.']);
}

$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    respond(400, ['ok' => false, 'message' => 'Solicitud no válida.']);
}

// Honeypot: respondemos como si todo hubiera ido bien para no dar pistas al bot.
if (clean_text($data['website'] ?? '') !== '') {
    respond(200, ['ok' => true]);
}

$startedAt = filter_var($data['startedAt'] ?? null, FILTER_VALIDATE_INT);
$elapsedMilliseconds = $startedAt !== false
    ? (int) round(microtime(true) * 1000) - $startedAt
    : 0;

if ($elapsedMilliseconds < 1800) {
    respond(200, ['ok' => true]);
}

$name = clean_text($data['name'] ?? '');
$email = clean_text($data['email'] ?? '');
$phone = clean_text($data['phone'] ?? '');
$company = clean_text($data['company'] ?? '');
$message = clean_text($data['message'] ?? '');
$page = clean_text($data['page'] ?? '');
$privacyAccepted = ($data['privacy'] ?? false) === true;

$errors = [];

if (text_length($name) < 2 || text_length($name) > 120) {
    $errors['name'] = 'Introduce un nombre válido.';
}

if (
    text_length($email) > 254
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
) {
    $errors['email'] = 'Introduce un correo válido.';
}

if (
    $phone !== ''
    && (
        text_length($phone) > 40
        || preg_match('/^[+\d][\d\s().-]{6,39}$/u', $phone) !== 1
    )
) {
    $errors['phone'] = 'Introduce un teléfono válido.';
}

if (text_length($company) < 2 || text_length($company) > 120) {
    $errors['company'] = 'Introduce una empresa o proyecto válido.';
}

if (text_length($message) < 20 || text_length($message) > 2000) {
    $errors['message'] = 'El mensaje debe tener entre 20 y 2000 caracteres.';
}

if (!$privacyAccepted) {
    $errors['privacy'] = 'Debes aceptar la política de privacidad.';
}

if ($page !== '' && text_length($page) > 500) {
    $errors['page'] = 'Página de origen no válida.';
}

if ($errors !== []) {
    respond(422, [
        'ok' => false,
        'message' => 'Revisa los campos indicados.',
        'errors' => $errors,
    ]);
}

if (!rate_limit_allows_request()) {
    respond(429, [
        'ok' => false,
        'message' => 'Demasiadas solicitudes. Inténtalo más tarde.',
    ]);
}

$safeCompany = preg_replace('/[\r\n]+/', ' ', $company) ?: 'Sin empresa';
$subject = 'Nueva solicitud web — ' . $safeCompany;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

date_default_timezone_set('Europe/Madrid');

$body = implode("\r\n", [
    'NUEVA SOLICITUD DESDE TEMISATRILE.COM',
    '======================================',
    '',
    'Nombre: ' . $name,
    'Email: ' . $email,
    'Teléfono: ' . ($phone !== '' ? $phone : 'No indicado'),
    'Empresa o proyecto: ' . $company,
    '',
    'MENSAJE',
    '-------',
    $message,
    '',
    'INFORMACIÓN DEL ENVÍO',
    '---------------------',
    'Privacidad aceptada: Sí',
    'Página: ' . ($page !== '' ? $page : 'No indicada'),
    'Fecha: ' . date('d/m/Y H:i:s T'),
]);

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Temis Atrile web <' . CONTACT_FROM . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$sent = @mail(CONTACT_TO, $encodedSubject, $body, $headers);

if (!$sent) {
    error_log('Temis Atrile contact form: mail transport rejected the message.');
    respond(502, [
        'ok' => false,
        'message' => 'No se ha podido entregar la solicitud.',
    ]);
}

respond(200, ['ok' => true]);
