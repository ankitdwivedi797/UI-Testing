# ui-testing-genai

AI-generated UI test suite for [saucedemo.com](https://www.saucedemo.com),
executed on the Sauce Labs cloud grid, wired to GitHub Actions.

## How it works

1. **Intent** — plain-English test descriptions live in `prompts/`.
2. **Authoring** — those prompts are fed to Sauce AI for Test Authoring,
   which generates a framework-agnostic script. A human reviews it, then
   it's committed to `tests/generated/`.
3. **Manual tests** — edge cases not worth generating from scratch go in
   `tests/manual/`.
4. **Execution** — `wdio.conf.js` points WebdriverIO at the Sauce Labs
   cloud grid (Chrome + Firefox on Windows 11 by default). Nothing runs
   on the CI runner itself; it just triggers the run.
5. **CI** — `.github/workflows/sauce-tests.yml` runs the suite on every
   push/PR to `main`, using `SAUCE_USERNAME` / `SAUCE_ACCESS_KEY` from
   GitHub Actions repo secrets.
6. **Diagnosis** — failures show up with full video/log/screenshot detail
   in your Sauce Labs dashboard; Sauce AI for Insights can be queried
   there in natural language for root-cause analysis.

## Project structure

```
ui-testing-genai/
├── .github/workflows/sauce-tests.yml   # CI: triggers Sauce Labs runs
├── prompts/                            # natural-language test intents
│   ├── login-flow.md
│   └── checkout-flow.md
├── tests/
│   ├── generated/                      # AI-authored specs (reviewed)
│   │   ├── login-flow.spec.js
│   │   └── checkout-flow.spec.js
│   └── manual/                         # hand-written edge cases
│       └── problem-user-visual-bug.spec.js
├── wdio.conf.js                        # WebdriverIO config -> Sauce Labs
├── package.json
├── .env.example
└── .gitignore
```

## Setup

1. **Get Sauce Labs credentials** — sign up at saucelabs.com, grab your
   username and access key from Account Settings.

2. **Local run**
   ```bash
   cp .env.example .env   # fill in real values
   npm install
   source .env            # or use a tool like `dotenv-cli`
   npm run test:sauce
   ```

3. **CI run (GitHub Actions)**
   In your GitHub repo: Settings → Secrets and variables → Actions, add:
   - `SAUCE_USERNAME`
   - `SAUCE_ACCESS_KEY`

   Then push to `main` or open a PR — the workflow runs automatically.

## Adding a new test

1. Write the flow as plain English in a new file under `prompts/`.
2. Feed it to Sauce AI for Test Authoring to generate the script.
3. Review the generated script for correctness, then commit it to
   `tests/generated/`.
4. Push — CI picks it up automatically.

## Pushing this to git

```bash
git init
git add .
git commit -m "Initial UI test suite for saucedemo.com on Sauce Labs"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```
