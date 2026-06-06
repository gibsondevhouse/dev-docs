use apple_native_keyring_store::keychain::{Cred, MacKeychainDomain};
use keyring_core::{Entry, Error as KeyringError};
use std::sync::Mutex;
use tauri::{Manager, WindowEvent};
use tauri_plugin_shell::{process::CommandChild, ShellExt};

const OPENROUTER_KEYCHAIN_SERVICE: &str = "com.planbuilder.openrouter";
const OPENROUTER_KEYCHAIN_ACCOUNT: &str = "openrouterApiKey";

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn keychain_error(error: impl std::fmt::Debug) -> String {
    format!("keychain operation failed: {error:?}")
}

fn openrouter_keychain_entry() -> Result<Entry, String> {
    Cred::build(
        MacKeychainDomain::User,
        OPENROUTER_KEYCHAIN_SERVICE,
        OPENROUTER_KEYCHAIN_ACCOUNT,
    )
    .map_err(keychain_error)
}

#[tauri::command]
fn load_openrouter_api_key() -> Result<String, String> {
    let entry = openrouter_keychain_entry()?;

    match entry.get_password() {
        Ok(password) => Ok(password),
        Err(KeyringError::NoEntry) => Ok(String::new()),
        Err(error) => Err(keychain_error(error)),
    }
}

#[tauri::command]
fn save_openrouter_api_key(api_key: String) -> Result<(), String> {
    let entry = openrouter_keychain_entry()?;

    if api_key.is_empty() {
        return match entry.delete_credential() {
            Ok(()) | Err(KeyringError::NoEntry) => Ok(()),
            Err(error) => Err(keychain_error(error)),
        };
    }

    entry.set_password(&api_key).map_err(keychain_error)
}

struct SidecarState(Mutex<Option<CommandChild>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_dialog::init())
        .manage(SidecarState(Mutex::new(None)))
        .setup(|app| {
            let sidecar = app.shell().sidecar("start-sidecar")?;
            let (_events, child) = sidecar.spawn()?;
            *app.state::<SidecarState>()
                .0
                .lock()
                .expect("sidecar mutex poisoned") = Some(child);
            Ok(())
        })
        .on_window_event(|window, event| {
            if matches!(event, WindowEvent::Destroyed) {
                let child = {
                    let state = window.state::<SidecarState>();
                    let child = state.0.lock().expect("sidecar mutex poisoned").take();
                    child
                };

                if let Some(child) = child {
                    let _ = child.kill();
                }
            }
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            load_openrouter_api_key,
            save_openrouter_api_key
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
