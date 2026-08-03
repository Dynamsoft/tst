/**
 * Copies the Mobile Document Scanner bundle and the Dynamsoft engine resources
 * (WASM, models, UI template) out of node_modules and into public/dynamsoft/.
 *
 * Self-hosting matters here: the app is served with COEP `require-corp`, which
 * blocks CDN resources that don't send a CORP header. Serving the engine from
 * our own origin sidesteps that, and lets the demo run offline.
 *
 * The layout is not free-form. Because App.tsx sets
 * `engineResourcePaths.rootDirectory`, both bundles resolve every internal
 * resource as
 *
 *     <rootDirectory><package>@<version>/[dist/]
 *
 * with the `dist/` segment for the code packages and none for the data package.
 * So the directory names must carry the installed version, and
 * dynamsoft-capture-vision-data — the MRZ models, templates and char resources,
 * which lives at its package root rather than under dist/ — must be copied too.
 */
import { cp, mkdir, rm, access, readFile } from "node:fs/promises";
import { dirname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const nodeModules = join(root, "node_modules");
const dest = join(root, "public", "dynamsoft");

/**
 * `subdir` is both the part of the package we copy and the suffix the engine
 * appends when resolving it. `check` is a file that has to exist afterwards, so
 * an upstream layout change fails here instead of 404ing at runtime.
 */
const PACKAGES = [
  {
    name: "dynamsoft-document-scanner",
    subdir: "dist",
    check: "document-scanner.ui.xml",
  },
  {
    name: "dynamsoft-capture-vision-bundle",
    subdir: "dist",
    check: "dynamsoft-capture-vision-bundle-ml-simd.wasm",
  },
  {
    name: "dynamsoft-capture-vision-data",
    subdir: "",
    check: join("models", "MRZLocalization.data"),
  },
];

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

const fail = (message) => {
  console.error(`Error: ${message}`);
  process.exit(1);
};

const versionOf = async (pkgDir) =>
  JSON.parse(await readFile(join(pkgDir, "package.json"), "utf8")).version;

if (!(await exists(nodeModules))) {
  fail("node_modules not found. Run 'npm install' first.");
}

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });

for (const { name, subdir, check } of PACKAGES) {
  const pkgDir = join(nodeModules, name);
  if (!(await exists(pkgDir))) {
    fail(`${name} is missing from node_modules. Run 'npm install' first.`);
  }

  const version = await versionOf(pkgDir);
  const from = join(pkgDir, subdir);
  const to = join(dest, `${name}@${version}`, subdir);

  await mkdir(dirname(to), { recursive: true });
  await cp(from, to, {
    recursive: true,
    // Skip nested dependencies, if npm did not hoist them. Matched relative to
    // `from`, which is itself inside node_modules.
    filter: (src) => !src.slice(from.length).includes(`${sep}node_modules${sep}`),
  });

  if (!(await exists(join(to, check)))) {
    fail(`expected ${check} under ${to} after copying ${name}@${version}.`);
  }
  console.log(`  copied ${name}@${version}${subdir ? `/${subdir}` : ""}`);
}

console.log(`Done. Engine resources in ${dest}`);
