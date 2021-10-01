use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use config::{ConfigError, Config, File};
use directories::ProjectDirs;
use serde_derive::Serialize;
use serde_derive::Deserialize;

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Session {
  cache: HashMap<String, String>,
}

impl Session {
  pub fn new() -> Result<Self, ConfigError> {
    let mut s = Config::default();
    s.merge(File::with_name(Session::session_file().to_str().unwrap()).required(false))?;

    let cache: HashMap<String, String> = HashMap::new();

    s.set_default("cache", cache)?;
    s.try_into()
  }

  pub fn save(&self) {
    let toml_string = toml::to_string(&self).expect("Could not encode TOML value");
    fs::write(Session::session_file(), toml_string).expect("Could not write to file!");
  }

  fn session_file() -> PathBuf {
    match ProjectDirs::from("dev", "smaug",  "dev.smaug.desktop") {
      Some(proj_dirs) => {
        let config_dir = proj_dirs.config_dir();
        fs::create_dir_all(config_dir).expect("Could not create configuration directory!");
        return config_dir.join("session.toml");
      },
      None => {
        panic!("Unable to determine configuration directory path");
      },
    };
  }
}

#[tauri::command]
pub fn session_cache_get(
  key: String,
) -> Result<String, String> {
  let session = match Session::new() {
    Ok(session) => session,
    Err(error) => {
      panic!("Session error: {:?}", error);
    },
  };
  match session.cache.get(&key) {
    Some(value) => Ok(value.into()),
    None => Err("null".into()),
  }
}

#[tauri::command]
pub fn session_cache_set(
  key: String,
  value: String,
) {
  let mut session = match Session::new() {
    Ok(session) => session,
    Err(error) => {
      panic!("Session error: {:?}", error);
    },
  };
  session.cache.insert(key.clone(), value);
  session.save();
}

#[tauri::command]
pub fn session_cache_remove(
  key: String,
) {
  let mut session = match Session::new() {
    Ok(session) => session,
    Err(error) => {
      panic!("Session error: {:?}", error);
    },
  };
  session.cache.remove(&key);
  session.save();
}
