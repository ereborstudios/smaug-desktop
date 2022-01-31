use std::fs;
use toml::Value;
use toml_edit::{value, Document};

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct Project {
  #[serde(rename = "name")]
  pub name: String,

  #[serde(rename = "path")]
  pub path: String,
}

#[tauri::command]
pub fn read_smaug(path: String) -> Value {
  let contents = fs::read_to_string(path)
      .expect("Something went wrong reading the file");
  let package_info: Value = toml::from_str(&contents).unwrap();
  return package_info;
}

#[tauri::command]
pub fn write_smaug(
    path: String,
    title: String,
    version: String,
    compile_ruby: bool,
    itch_username: String,
    itch_url: String) -> Value {
  let contents = fs::read_to_string(&path)
      .expect("Something went wrong reading the file");

  let mut doc = contents.parse::<Document>().expect("invalid doc");

  let project = doc["project"].as_table().expect("No project");
  println!("project: {:?}", project);
  doc["project"]["title"] = value(title);
  doc["project"]["version"] = value(version);
  doc["project"]["compile_ruby"] = value(compile_ruby);

  doc["itch"]["url"] = value(itch_url);
  doc["itch"]["username"] = value(itch_username);

  std::fs::write(&path, doc.to_string())
    .expect("Couldn't write config file.");

  let package_info: Value = toml::from_str(&contents).unwrap();
  package_info
}
