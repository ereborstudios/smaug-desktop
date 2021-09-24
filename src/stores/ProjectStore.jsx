import { createContextStore, action, thunk, computed, thunkOn } from 'easy-peasy';
import 'easy-peasy/map-set-support';
import slug from 'slug';
import { invoke } from '@tauri-apps/api/tauri'
import { newProject, add as smaugAdd, install as smaugInstall } from '../smaug'
import { Smaugfile } from '../models/Smaugfile'

export const ProjectStore = createContextStore((runtimeModel) => ({
  project: runtimeModel,

  title: computed(state => state.project.getTitle()),
  setTitle: action((state, payload) => {
    const project = state.project;
    project.setTitle(payload);
    if (!project.config) {
      project.name = slug(payload);
    }
    return {
      ...state,
      project: project,
    };
  }),

  name: computed(state => state.project.name),
  setName: action((state, payload) => {
    const project = state.project;
    project.name = payload;
    return {
      ...state,
      project: project,
    };
  }),

  path: computed(state => state.project.path),
  setPath: action((state, payload) => {
    const project = state.project;
    project.path = payload;
    return {
      ...state,
      project: project,
    };
  }),

  initialConfig: action((state, payload) => {
    const project = state.project;
    project.config = new Smaugfile(payload);
    return {
      ...state,
      project: project,
    };
  }),

  readSmaugfile: thunk(async (actions, payload) => {
    const config = await invoke('read_smaug', { path: payload });
    actions.initialConfig(config);
  }),

  createProject: thunk(async (actions, payload, helpers) => {
    const { project, title } = helpers.getState();
    await newProject(project.path);
    await actions.readSmaugfile(project.Smaugfile());
    project.config.project.title = title;
    await project.save();
    return project;
  }),

  version: computed(state => state.project.config && state.project.config.project.version),
  setVersion: action((state, payload) => {
    const project = state.project;
    project.config.project.version = payload;
    return {
      ...state,
      project: project,
    };
  }),

  compileRuby: computed(state => state.project.config && state.project.config.project.compile_ruby),
  setCompileRuby: action((state, payload) => {
    const project = state.project;
    project.config.project.compile_ruby = payload;
    return {
      ...state,
      project: project,
    };
  }),

  saveProject: thunk(async (actions, payload, helpers) => {
    const { project } = helpers.getState();
    if (!project.config) return null;
    await project.save();
    return project;
  }),

  saveProjectOnChange: thunkOn(
    actions => [
      actions.setVersion,
      actions.setTitle,
      actions.setCompileRuby,
    ],
    async (actions, target) => {
      console.log('saveProjectOnChange', actions, target);
      await actions.saveProject();
    }
  ),

  dependencies: computed(state => state.project.config && state.project.config.dependencies),
  addPackage: thunk(async (actions, payload, helpers) => {
    const { project } = helpers.getState();
    const result = await smaugAdd(project, payload);
    console.log('addPackage thunk', result);
    await actions.readSmaugfile(project.Smaugfile());
  }),

  installDependencies: thunk(async (actions, payload, helpers) => {
    const { project } = helpers.getState();
    const result = await smaugInstall(project);
    console.log('smaugInstall thunk', result);
    await actions.readSmaugfile(project.Smaugfile());
  }),
}));
