# UI Test Automation with AI-Assisted Authoring

![Sauce UI Tests](https://github.com/ankitdwivedi797/UI-Testing/actions/workflows/sauce-tests.yml/badge.svg)

An end-to-end automated UI testing pipeline. Test flows are described in
plain English, converted into executable browser scripts, and run against
a real Chrome browser on Sauce Labs' cloud grid — triggered automatically
by GitHub Actions on every push to `main`.

**Stack:** WebdriverIO · Mocha · Sauce Labs · GitHub Actions · Node.js

## How it works

1. **Intent** — test flows are written in plain English in `prompts/`.
2. **Script** — each prompt maps to a WebdriverIO/Mocha spec in `tests/generated/`.
3. **CI trigger** — `.github/workflows/sauce-tests.yml` runs on every push/PR to `main`.
4. **Execution** — tests run on Sauce Labs' cloud grid (real Chrome browser,
   EU region), not on the CI runner itself.
5. **Result** — pass/fail reported directly in the GitHub Actions run, with
   full video, screenshots, and logs available on the Sauce Labs dashboard
   for any failure.

## Project structure

## Setup

1. Create a free Sauce Labs account and grab your username + access key
   from Account Settings.
2. Locally:
```bash
   cp .env.example .env   # fill in real values
   npm install
   source .env
   npm run test:sauce
```
3. In CI: add `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` as GitHub repo
   secrets (Settings → Secrets and variables → Actions).

## What I learned building this

Getting a real cloud-testing pipeline working end-to-end surfaced a series
of real infrastructure issues, not just code bugs:

- **Region mismatch** — Sauce Labs accounts are pinned to a specific data
  center (US/EU); pointing WebdriverIO at the wrong one causes silent
  auth failures.
- **Concurrency limits** — free trial accounts allow only 1 concurrent
  browser session; running a full browser matrix in parallel gets
  rejected by the API.
- **Element timing** — cloud browser sessions need explicit waits for
  elements to be interactable, not just present in the DOM.

Diagnosing each of these required reading raw WebdriverIO/Sauce Labs logs
and cross-referencing with Sauce's video replay of the failing session.

## Status

Currently CI runs a verified-stable login test on every push. Additional
flows (checkout, negative-path login) are written and included in the repo
under `tests/generated/` and `tests/manual/`, pending selector verification
against the live site before being added back into the CI run.
