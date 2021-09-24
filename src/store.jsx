import { createStore, action, thunk } from 'easy-peasy';
import 'easy-peasy/map-set-support';
import { run } from './smaug';
import settingsModel from './models/Settings';
import toolkitModel from './models/Toolkit';
import projectModel from './models/Project';
import sidebarModel from './models/Sidebar';
import packageModel from './models/Package';

export const store = createStore({
  ...settingsModel,
  toolkit: toolkitModel,
  ...projectModel,
  ...sidebarModel,
  ...packageModel,

  child: null,
  setChild: action((state, payload) => {
    return {
      ...state,
      child: payload,
    };
  }),
  runChild: thunk(async (actions, payload) => {
    const cmd = await run(payload);
    cmd.stdout.on('data', line => {
      //actions.setGameLog(line);
      console.log(`command stdout: "${line}"`)
    });
    const child = await cmd.spawn();
    actions.setChild(child);
    console.log('pid', child);
  }),
  killChild: thunk(async (actions, payload, helpers) => {
    const { child } = helpers.getState();
    console.log('child', child);
    if (child) {
      const result = await child.kill();
      console.log('result', result, child);
      actions.setChild(null);
    }
  }),
  gameLog: '',
  setGameLog: action((state, payload) => {
    return {
      ...state,
      gameLog: payload
    };
  }),
});
