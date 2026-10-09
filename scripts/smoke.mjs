// Site check: crawls every internal link from the home page and fails on
// broken pages or content rules. Run against a started server:
//   npm run build && npm start   (then, in another shell)   npm run check
// BASE_URL defaults to http://localhost:3000.

const base = process.env.BASE_URL || "http://localhost:3000";
const failures = [];
const fail = (msg) => failures.push(msg);

// Words and details that must never appear on the site.
const banned = [
  [/stunning|must-see|luxury lifestyle|private client|masterpiece/i, "banned marketing word"],
  [/700 West Center|02379/, "office address (Michelle asked to omit it)"],
  [/\bSAMPLE\b/, "sample listing label"],
  [/Brokerage name on file/, "brokerage placeholder"],
];

const seen = new Set();
const queue = ["/"];
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(base + path, { redirect: "manual" });
  const type = res.headers.get("content-type") || "";
  if (res.status !== 200) { fail(`${res.status} ${path}`); continue; }
  if (!type.includes("text/html")) continue;
  const html = await res.text();

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${path}: ${h1} h1 headings (expected 1)`);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) fail(`${path}: missing meta description`);
  else if (desc.length > 160) fail(`${path}: description is ${desc.length} characters (max 160)`);
  if (!/<title>[^<]*Michelle Lawton[^<]*<\/title>/.test(html)) fail(`${path}: title missing "Michelle Lawton"`);
  if (!/property="og:image"/.test(html)) fail(`${path}: missing og:image`);
  if (!/508-942-1180/.test(html)) fail(`${path}: phone number not on page`);
  if (!/CENTURY 21 North East/.test(html)) fail(`${path}: brokerage not on page`);
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  for (const [re, label] of banned) if (re.test(text)) fail(`${path}: contains ${label}`);

  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1].replace(/\/$/, "") || "/";
    if (!href.startsWith("/_next") && !/\.(png|jpg|ico|svg|xml|txt|vcf)$/.test(href)) queue.push(href);
  }
}

for (const path of ["/michelle-lawton.vcf", "/opengraph-image", "/og?page=%2Fcape-cod", "/sitemap.xml", "/robots.txt"]) {
  const res = await fetch(base + path);
  if (res.status !== 200) fail(`${res.status} ${path}`);
}
const missing = await fetch(base + "/this-page-does-not-exist");
if (missing.status !== 404) fail(`unknown page returned ${missing.status}, expected 404`);

console.log(`Checked ${seen.size} pages.`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n- ` + failures.join("\n- "));
  process.exit(1);
}
console.log("All checks passed.");
