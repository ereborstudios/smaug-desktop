import { action, thunk } from 'easy-peasy';
import 'easy-peasy/map-set-support';
import { ObjectModel, FunctionModel } from 'objectmodel'
import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
import { sep } from '@tauri-apps/api/path'
import { Smaugfile } from './Smaugfile';

export const Project = ObjectModel({
  _title: [String],
  name: String,
  path: String,
  config: [Smaugfile],
}).defaultTo({
  _title: 'My New Game',
  name: 'my-new-game',
  path: '',
  getTitle() {
    if (this.config && this.config.project) {
      return this.config.project.title;
    } else {
      return this._title;
    }
  },
  setTitle(value) {
    this._title = value;
    if (this.config && this.config.project) {
      this.config.project.title = value;
    }
  },
}).as('Project');

Project.prototype.Smaugfile = FunctionModel().return(String)(
  function() {
    const tmp = String(this.projectBasePath());
    const regex = new RegExp(`${sep}+$`)
    return [tmp.replace(regex, ''), 'Smaug.toml'].join(sep);
  }
);

Project.prototype.projectBasePath = FunctionModel().return(String)(
  function() {
    const tmp = String(this.path);
    const regex = new RegExp(`${sep}Smaug\\.toml$`)
    return tmp.replace(regex, '');
  }
);

Project.prototype.iconUrl = FunctionModel().return(String)(
  function() {
    const icon = this.config.project.icon;
    const iconPath = [this.projectBasePath().replace(/\/+$/, ''), icon].join(sep);
    return convertFileSrc(iconPath);
  }
);

Project.prototype.save = FunctionModel().return(Promise)(
  async function() {
    const handler = invoke('write_smaug', {
      path: this.Smaugfile(),
      //config: this.config,
      title: this.getTitle(),
      version: this.config.project.version,
      compileRuby: this.config.project.compile_ruby,
      itchUsername: this.config.itch.username,
      itchUrl: this.config.itch.url,
    });
    return handler;
  }
);

Project.create = async (properties) => {
  const data = await invoke('read_smaug', { path: properties.path });
  properties.config = new Smaugfile(data);
  return new Project(properties);
};

const model = {
  projects: new Map(),

  setProject: action((state, payload) => {
    state.projects.set(payload.name, payload);
  }),

  saveProject: thunk(async (actions, payload, { getState }) => {
    const { projects } = getState();
    const project = projects.get(payload.name);
    const result = await project.save();
    console.log('save result', result);
  }),
};

export default model;
