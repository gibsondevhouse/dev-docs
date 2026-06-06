# Stage 1 / Phase 1 / Part 3 — Wire Sidecar to Tauri Startup/Shutdown
**Plan:** 001 — Plan Builder UI

> **For the agent:** This is your direct task prompt. Read it fully, then execute exactly what is described. Do not do more than what is described here.

---

## Task

Make the Python sidecar start automatically when the Tauri app launches and stop when the app closes. Use Tauri's `plugin-shell` to spawn the Python process as a sidecar.

---

## Files to Touch

| File | What to do |
|------|------------|
| `src-tauri/Cargo.toml` | Add `tauri-plugin-shell` dependency |
| `src-tauri/tauri.conf.json` | Add shell plugin config + sidecar allowlist |
| `src-tauri/src/main.rs` | Register shell plugin, spawn sidecar on startup |
| `src/lib/sidecar.ts` | Create: frontend utility to check sidecar health |

---

## Exact Requirements

1. Add the shell plugin to `src-tauri/Cargo.toml`:
   ```toml
   [dependencies]
   tauri-plugin-shell = "2"
   ```

2. Register the plugin in `src-tauri/src/main.rs`:
   ```rust
   fn main() {
       tauri::Builder::default()
           .plugin(tauri_plugin_shell::init())
           .run(tauri::generate_context!())
           .expect("error while running tauri application");
   }
   ```

3. In `src-tauri/tauri.conf.json`, add to the `plugins` section:
   ```json
   "shell": {
     "open": false,
     "sidecar": true
   }
   ```
   And in `bundle.externalBin`, list the sidecar script path:
   ```json
   "externalBin": ["../src-python/start-sidecar"]
   ```

4. Create the startup script `src-python/start-sidecar` (no extension, executable):
   ```bash
   #!/usr/bin/env bash
   cd "$(dirname "$0")"
   uv run uvicorn main:app --host 127.0.0.1 --port 37421 --log-level warning
   ```
   Run `chmod +x src-python/start-sidecar`.

5. In `src-tauri/src/main.rs`, spawn the sidecar at startup using `tauri_plugin_shell`:
   ```rust
   use tauri_plugin_shell::ShellExt;

   tauri::Builder::default()
       .plugin(tauri_plugin_shell::init())
       .setup(|app| {
           let sidecar = app.shell().sidecar("start-sidecar")?;
           sidecar.spawn()?;
           Ok(())
       })
       .run(tauri::generate_context!())
       .expect("error while running tauri application");
   ```

6. Create `src/lib/sidecar.ts` with a health check utility:
   ```typescript
   const SIDECAR_URL = "http://127.0.0.1:37421";

   export async function checkSidecarHealth(): Promise<boolean> {
     try {
       const res = await fetch(`${SIDECAR_URL}/health`);
       const data = await res.json();
       return data.status === "ok";
     } catch {
       return false;
     }
   }

   export { SIDECAR_URL };
   ```

---

## What Not to Change

- Do not modify the React component tree in this part
- Do not change the FastAPI routes

---

## Done When

- [ ] `npm run tauri dev` launches the app AND starts the Python sidecar automatically
- [ ] `curl http://127.0.0.1:37421/health` returns `{"status":"ok"}` while the app is running
- [ ] When the Tauri window is closed, the Python process stops (no orphan process)
- [ ] `src/lib/sidecar.ts` exports `checkSidecarHealth` and `SIDECAR_URL`
- [ ] No Rust compilation errors
- [ ] Changelog updated
