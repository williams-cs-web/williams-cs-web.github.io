#!/usr/bin/env node
// GitHub Pages serves static files: a direct request for /about-us returns
// a real 404 status unless a matching file/directory exists, even though
// our 404.html client-redirect trick makes the page *render* correctly for
// JS-capable visitors. Search crawlers weight the HTTP status over that, so
// interior routes were effectively invisible to indexing.
//
// This app has no SSR, so "pre-rendering" a route just means giving it its
// own copy of the built index.html at <route>/index.html. React Router
// picks up the right page from window.location on mount, same as always,
// but the initial response is now a real 200.
//
// Keep this list in sync with the top-level paths in src/App.jsx.
import { cpSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const indexHtml = join(repoRoot, "index.html");

const ROUTES = [
  "home",
  "about-us",
  "plan-your-major",
  "courses",
  "colloquium",
  "student-life",
  "research",
  "non-majors",
  "news",
  "danyluk-in-memoriam",
];

for (const route of ROUTES) {
  const dir = join(repoRoot, route);
  mkdirSync(dir, { recursive: true });
  cpSync(indexHtml, join(dir, "index.html"));
  execSync(`chmod -R o+rX ${JSON.stringify(dir)}`);
}
