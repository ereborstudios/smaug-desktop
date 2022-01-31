import { createStore, action, thunk, computed } from 'easy-peasy';
import 'easy-peasy/map-set-support';
import { run, killProcess } from './smaug';
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

  runChild: thunk(async (actions, payload) => {
    const cmd = await run(payload);
    await cmd.spawn();
  }),
  killChild: thunk(async (actions, payload, helpers) => {
    await killProcess(payload);
  }),
  gameLogs: [''],
  pushGameLog: action((state, payload) => {
    state.gameLogs.push(payload);
  }),
  getGameLog: computed(
    [(state) => state.gameLogs],
    (gameLogs) => {
      const filtered = gameLogs.filter((line) => {
        if (line.match(/\*\* INFO: .*/)) return false;
        if (line.match(/\* INFO: .*/)) return false;
        if (line === '') return false;
        return true;
      });
      return filtered.join("\n").replace(/[\r\n]+/g, '\n').slice(1);
    }
  ),
});
