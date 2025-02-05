// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[tauri::command]
fn set_theme(theme: &str, window: tauri::Window) {
    match theme {
        "dark" => {
            window
                .set_theme(Some(tauri::Theme::Dark))
                .expect("Failed to set dark theme");
        }
        "light" => {
            window
                .set_theme(Some(tauri::Theme::Light))
                .expect("Failed to set light theme");
        }
        _ => {
            window.set_theme(None).expect("Failed to set system theme");
        }
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![set_theme])
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .run(tauri::generate_context!())
        .expect("failed run app")
}
