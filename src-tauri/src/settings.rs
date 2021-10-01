use std::fs;
use std::path::PathBuf;
use config::{ConfigError, Config, File};
use directories::ProjectDirs;
use serde_derive::Serialize;
use serde_derive::Deserialize;

use crate::Project;

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct Settings {
  debug: Option<bool>,
  projects: Vec<Project>,
}

impl Settings {
  pub fn new() -> Result<Self, ConfigError> {
    let mut s = Config::default();
    s.merge(File::with_name(Settings::settings_file().to_str().unwrap()).required(false))?;

    //let project = Project { name: "foo".to_string(), path: "bar".to_string() };
    //s.set("projects[0].name", "Levitest").unwrap();
    //s.set("projects[0].path", "/home/ldk/hack/sync/erebor/tmp/levitest/Smaug.toml").unwrap();

    let projects: Vec<config::Value> = Vec::new();
    s.set_default("projects", projects)?;
    s.set_default("debug", false)?;

    // You can deserialize (and thus freeze) the entire configuration as
    s.try_into()
  }

  pub fn add_project(mut self, project: Project) -> Result<Self, ConfigError> {
    self.projects.push(project.clone());
    Ok(self)
  }

  pub fn save(self) {
    let toml_string = toml::to_string(&self).expect("Could not encode TOML value");
    fs::write(Settings::settings_file(), toml_string).expect("Could not write to file!");
  }

  fn settings_file() -> PathBuf {
    match ProjectDirs::from("dev", "smaug",  "dev.smaug.desktop") {
      Some(proj_dirs) => {
        let config_dir = proj_dirs.config_dir();
        fs::create_dir_all(config_dir).expect("Could not create configuration directory!");
        return config_dir.join("Settings.toml");
      },
      None => {
        panic!("Unable to determine configuration directory path");
      },
    };
  }
}

#[tauri::command]
pub fn read_settings() -> Settings {
  println!("Command: read_settings");
  let settings = match Settings::new() {
    Ok(settings) => settings,
    Err(error) => {
      panic!("Problem: {:?}", error);
    },
  };

  return settings;
}

#[tauri::command]
pub fn add_project_to_settings(name: String, path: String) {
  let settings = Settings::new();

  let results = settings.unwrap().add_project(Project { name: name, path: path }).unwrap();
  println!("{:?}", results);

  results.save();
}
