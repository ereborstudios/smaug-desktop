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

use settings::Settings;
use project::Project;

use tauri::{
  api::process::{Command, CommandEvent},
  Manager,
};

fn main() {
  let settings = match Settings::new() {
    Ok(settings) => settings,
    Err(error) => {
      panic!("Problem: {:?}", error);
    },
  };
  
  let settings = settings.save();
    
  tauri::Builder::default()
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
                    my_custom_command
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
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
