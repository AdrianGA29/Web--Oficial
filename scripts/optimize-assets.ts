import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "src", "assets");
const outputDir = path.join(sourceDir, "optimized");

const jobs = [
  { input: "background.png", output: "background.webp", width: 1920, quality: 82 },
  { input: "Laura.png", output: "Laura.webp", width: 500, quality: 82 },
  { input: "Victor.png", output: "Victor.webp", width: 500, quality: 82 },
  { input: "Patricia.jpg", output: "Patricia.webp", width: 500, quality: 82 },
  { input: "Nicolas.jpg", output: "Nicolas.webp", width: 500, quality: 82 },
  { input: "Adrian.jpg", output: "Adrian.webp", width: 500, quality: 82 },
  { input: "Alejandro.jpg", output: "Alejandro.webp", width: 500, quality: 82 },
  { input: "Ariadna.jpg", output: "Ariadna.webp", width: 500, quality: 82 },
];

await fs.mkdir(outputDir, { recursive: true });

for (const job of jobs) {
  const inputPath = path.join(sourceDir, job.input);
  const outputPath = path.join(outputDir, job.output);

  await sharp(inputPath)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 6 })
    .toFile(outputPath);

  const [source, output] = await Promise.all([fs.stat(inputPath), fs.stat(outputPath)]);
  const saved = Math.round((1 - output.size / source.size) * 100);
  console.log(`${job.input} -> optimized/${job.output} (${saved}% smaller)`);
}
