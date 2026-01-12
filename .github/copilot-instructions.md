# Copilot AI Agent Instructions for This Monorepo

This workspace contains multiple subprojects, primarily focused on chatbots, plugins, web UIs, and data tools. Key conventions and workflows are outlined below to help AI agents contribute productively.

## Architecture Overview
- **Monorepo Structure:** Each top-level folder is a distinct project (e.g., `koishi`, `koishi-webui`, `VincentZyu233`, `fastapi`, etc.).
- **Koishi Ecosystem:** The `koishi` and `koishi-webui` folders are core to the Koishi chatbot framework. They use TypeScript, with a strong focus on plugin-based extensibility. See their `README.md` for project-specific details.
- **FastAPI Service:** The `fastapi/fastapi-steamdb-cs-changelist-tampermonkey` project combines a Tampermonkey userscript (JS) with a FastAPI backend (Python) for scraping and storing SteamDB/CS2 changelist data.
- **Other Tools:** Additional folders (e.g., `VincentZyu233`, `yunzai`, `ledao`) contain plugins, documentation, or deployment scripts for various bot and data projects.

## Developer Workflows
- **Build/Install:**
  - Node.js projects: Use `pnpm install` or `npm install` in each subproject as needed.
  - Python projects: Use `pip install -r requirements.txt` (see `fastapi/py/`).
- **Run/Dev:**
  - Koishi: Use `koishi start` or `yakumo` scripts (see `yakumo.yml`).
  - FastAPI: Activate venv, then `python main.py` in the `py/` directory.
- **Testing:**
  - Most core projects use TypeScript or Python unit tests. Check for `test/` folders or `yakumo`/CI scripts.
- **Deployment:**
  - Some projects have GitHub Actions in `.github/workflows/` for CI/CD.
  - VitePress docs deploy via GitHub Pages (see `VincentZyu233/docs/`).

## Project-Specific Patterns
- **TypeScript:** Prefer strict typing and modular plugin structure (see `koishi/packages/`, `koishi/plugins/`).
- **Python:** Use FastAPI for REST APIs, SQLite for storage, and environment-based config (see `config.py`).
- **Tampermonkey Scripts:** Place user scripts in `js/` and document install steps in the local `README.md`.
- **Docs:** Each major project has its own `README.md` with usage, install, and architecture notes. For Koishi, see also `koishi-docs/`.

## Integration & Communication
- **APIs:** Cross-component communication is via REST (FastAPI) or plugin APIs (Koishi).
- **Data Flow:** Tampermonkey scripts scrape data, POST to FastAPI, which stores in SQLite and exposes REST endpoints.
- **Plugin Discovery:** Koishi plugins are auto-discovered from the `plugins/` directory.

## Examples
- To add a Koishi plugin: create a new folder in `koishi/plugins/`, export a TypeScript plugin class, and update `package.json` if needed.
- To extend FastAPI: add endpoints in `main.py`, update `requirements.txt` for new dependencies, and document in `README.md`.

## References
- [koishi/README.md](../../koishi/README.md)
- [koishi-webui/README.md](../../koishi-webui/README.md)
- [fastapi/fastapi-steamdb-cs-changelist-tampermonkey/README.md](../../fastapi/fastapi-steamdb-cs-changelist-tampermonkey/README.md)
- [VincentZyu233/README.md](../README.md)

---
If any section is unclear or missing, please provide feedback for further refinement.
