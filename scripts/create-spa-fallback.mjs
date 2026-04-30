import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const indexPath = resolve("dist", "index.html");
const devIndexPath = resolve("dist", "index.dev.html");
const fallbackPath = resolve("dist", "404.html");

if (existsSync(devIndexPath)) {
  copyFileSync(devIndexPath, indexPath);
}

if (existsSync(indexPath)) {
  copyFileSync(indexPath, fallbackPath);
}
