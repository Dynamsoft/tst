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

## Before committing or opening a PR

- Review every changed/added file's contents (not just the diff summary) for the items
  above — including binary assets, config files, and sample data files.
- If a case directory (`cases/<id>` or `cases/<name>`) is based on a real customer
  engagement, keep it generic: strip identifying data, use placeholder credentials, and
  favor synthetic sample inputs over real captures.
- When in doubt about whether something is sensitive, ask the user before committing
  rather than committing and asking forgiveness.
