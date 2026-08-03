# Agent Instructions

This repository (`dynamsoft/tst`) is **public** and served directly via GitHub Pages
(`https://dynamsoft.github.io/tst/...`). Anything committed here is publicly visible.
It hosts samples and per-customer case work (see `cases/`, often named after support
tickets or customer project codenames) used to demonstrate and evaluate Dynamsoft
products.

**Directory and file names are not exempt.** A customer or project codename used as a
folder name (e.g. `cases/<customer-name>`) is itself sensitive information — do not
introduce, reference, or echo such names (including in commit messages, PR descriptions,
or documentation like this file) unless the user has explicitly confirmed the name is
safe to expose publicly.

## Do not commit sensitive customer information

Because this repo is public, agents working in this repo **must not commit** anything
that exposes customer details, including but not limited to:

- Customer names, company names, or project/deal names not already meant to be public
- Personal contact info (emails, phone numbers) belonging to customers or their end users
- Real end-user data or PII — especially scanned ID documents, passports, MRZ data,
  driver's licenses, boarding passes, or any images/data captured from a customer's
  actual users or systems. Use synthetic/sample data only.
- Production API keys, license keys, tokens, or credentials belonging to a customer.
  Only the shared test license documented in `README.md` (scoped to
  `dynamsoft.github.io`) may be used in samples.
- Internal correspondence: support ticket contents, Slack messages, emails, or
  screenshots that reveal customer identity or internal discussion
- Customer-specific server URLs, internal hostnames, database connection strings, or
  infrastructure details
- Any file a customer shared privately (e.g. via a ticket or email) unless it has been
  explicitly cleared for public sample use and scrubbed of identifying information

## Do not commit large or vendored resource files

Keep the repo lean — do not commit large binaries or third-party resources that don't
belong in version control, including but not limited to:

- Installers and executables (e.g. `.exe`, `.msi`, `.dmg`, `.pkg`, `.deb`, `.rpm`)
- Publicly available SDK/runtime downloads (bundles, engine binaries, `.wasm` blobs,
  model files) that can instead be fetched via CDN, package manager, or a documented
  download step
- `node_modules/`, `venv`/`.venv`, and other package-manager-managed dependency
  directories — commit the manifest/lockfile, not the installed packages
- Build output and caches (`dist/`, `build/`, compiled artifacts) unless a specific
  sample genuinely needs to ship a prebuilt bundle
- Any other large binary blob that can be reproduced from a build step or fetched from
  its official source instead of being checked in

If a sample needs one of these, prefer referencing it via CDN/package manager, add a
setup script/instructions to fetch it, or add it to `.gitignore` instead of committing it.

## Before committing or opening a PR

- Review every changed/added file's contents (not just the diff summary) for the items
  above — including binary assets, config files, and sample data files.
- If a case directory (`cases/<id>` or `cases/<name>`) is based on a real customer
  engagement, keep it generic: strip identifying data, use placeholder credentials, and
  favor synthetic sample inputs over real captures.
- Check `git status`/`git diff --stat` for unexpectedly large or vendored files before
  staging — don't rely on `git add -A` without reviewing what it picked up.
- When in doubt about whether something is sensitive, ask the user before committing
  rather than committing and asking forgiveness.
