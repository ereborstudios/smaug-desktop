#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate config;
extern crate serde;

#[macro_use]
extern crate serde_derive;

pub mod project;
mod settings;
pub mod session;

use settings::Settings;
use project::Project;

use tauri::{
  api::process::{Command, CommandEvent},
  Manager,
  CustomMenuItem,
  Menu,
  MenuItem,
  Submenu
};

fn main() {
  let settings = match Settings::new() {
    Ok(settings) => settings,
    Err(error) => {
      panic!("Settings error: {:?}", error);
    },
  };
  
  let settings = settings.save();

  let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("CmdOrControl+Q");
  let new_project = CustomMenuItem::new("newProject".to_string(), "Project").accelerator("CmdOrControl+N");
  let manage_versions = CustomMenuItem::new("manageVersions".to_string(), "Manage versions");
  let new_menu = Submenu::new("New", Menu::new().add_item(new_project));
  let file_menu = Submenu::new("File", Menu::new()
                             .add_submenu(new_menu)
                             .add_item(quit));
  let dragonruby_menu = Submenu::new("DragonRuby", Menu::new()
                                .add_item(manage_versions));
  let system_menu = Submenu::new("System", Menu::new()
                                .add_submenu(dragonruby_menu));
  let menu = Menu::new()
    .add_submenu(file_menu)
    .add_submenu(system_menu);

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| {
      match event.menu_item_id() {
        "quit" => {
          std::process::exit(0);
        }
        _ => {}
      }
    })
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      tauri::async_runtime::spawn(async move {
        let (mut rx, mut child) = Command::new_sidecar("smaug")
          .expect("failed to setup `app` sidecar")
          .spawn()
          .expect("Failed to spawn packaged node");

        let mut i = 0;
        while let Some(event) = rx.recv().await {
          if let CommandEvent::Stdout(line) = event {
            window
              .emit("message", Some(format!("'{}'", line)))
              .expect("failed to emit event");
            i += 1;
            if i == 4 {
              child.write("message from Rust\n".as_bytes()).unwrap();
              i = 0;
            }
          }
        }
      });

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
                    settings::read_settings,
                    project::read_smaug,
                    project::write_smaug,
                    settings::add_project_to_settings,
                    session::session_cache_get,
                    session::session_cache_set,
                    session::session_cache_remove,
                    kill_process,
                    pid_exists,
                    my_custom_command
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[cfg(target_family = "unix")]
fn kill_process_unix(pid: i32) {
    let p: nix::unistd::Pid = nix::unistd::Pid::from_raw(pid);
    nix::sys::signal::kill(p, nix::sys::signal::Signal::SIGHUP).unwrap();
}

#[cfg(target_family = "windows")]
fn kill_process_windows(pid: i32) {
    let output = std::process::Command::new("taskkill")
        .arg("/PID")
        .arg(pid.to_string())
        .arg("/F")
        .output()
        .expect("Failed to execute taskkill command");

    if !output.status.success() {
        panic!("Failed to kill process with PID: {}", pid);
    }
}

#[tauri::command]
fn kill_process(pid: i32) {
    #[cfg(target_family = "unix")]
    kill_process_unix(pid);

    #[cfg(target_family = "windows")]
    kill_process_windows(pid);
}

#[tauri::command]
fn pid_exists(pid: remoteprocess::Pid) -> bool {
  match remoteprocess::Process::new(pid) {
    Ok(process) => process.exe().is_ok(),
    Err(error) => false
  }
}

#[tauri::command]
fn my_custom_command() {
  println!("I was invoked from JS!");

  let settings = Settings::new();
  println!("{:?}", settings);

  let results = settings.unwrap().add_project(Project { name: "Foobar".to_string(), path: "/tmp".to_string() }).unwrap();
  println!("{:?}", results);

  results.save();

  /*
  let mut file = Projects::default();
  file.projects.insert(
      "Foobar",
      Project {
          name: "Foobar",
          path: "/tmp/foobar",
      },
  );
  file.projects.insert(
      "Foobaz",
      Project {
          name: "FooBaz",
          path: "/tmp/foobaz",
      },
  );
  */

  //let toml_string = toml::to_string(&results).expect("Could not encode TOML value");
  //println!("{}", toml_string);

  /*
  if let Some(proj_dirs) = ProjectDirs::from("com", "tauri",  "com.tauri.dev") {
    let settings_file = proj_dirs.config_dir().join("projects.toml");
    //println!("Expanded Path: {}", settings_file.display());
    fs::write(settings_file, toml_string).expect("Could not write to file!");
  }
  */
}
