import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/assets", { recursive: true });
await cp("index.html", "dist/index.html");
await cp("assets", "dist/assets", { recursive: true });
await cp("css", "dist/css", { recursive: true });
await cp("js", "dist/js", { recursive: true });
await cp("CNAME", "dist/CNAME");
await cp(".nojekyll", "dist/.nojekyll");
await cp("robots.txt", "dist/robots.txt");
await cp("sitemap.xml", "dist/sitemap.xml");
await mkdir("dist/.openai", { recursive: true });
await cp(".openai/hosting.json", "dist/.openai/hosting.json");
