import { action, thunk } from 'easy-peasy';
import 'easy-peasy/map-set-support';
import { ObjectModel, ArrayModel } from 'objectmodel'
import { invoke } from '@tauri-apps/api/tauri'
import { Project } from './Project';

export const Settings = ObjectModel({
  debug: [Boolean],
  projects: ArrayModel(Project),
}).defaultTo({
  debug: true,
  projects: [],
}).as('Settings');

const model = {
  settings: new Settings(),

  updateSettings: action((state, payload) => {
    return {
      ...state,
      settings: new Settings(payload),
    };
  }),

  loadSettings: thunk(async (actions, payload, { getStoreActions }) => {
    console.log('loadSettings');
    const settings = await invoke('read_settings');
    await actions.updateSettings(settings);
    settings.projects.forEach(async (project) => {
      const p = await Project.create(project);
      getStoreActions().setProject(p);
    });
  }),

  addProjectToSettings: thunk(async (actions, payload) => {
    await invoke('add_project_to_settings', {
      name: payload.name,
      path: payload.Smaugfile(),
    });
  }),

};

export default model;
