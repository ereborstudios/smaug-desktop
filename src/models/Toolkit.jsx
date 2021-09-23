import { action, thunk } from 'easy-peasy';
import { ObjectModel, FunctionModel } from 'objectmodel'
import semver from 'semver';
import { dragonruby } from '../smaug';

const getVersionFromName = (name) => {
  const parts = name.split(' ');
  const version = parts[parts.length - 1];
  return name.match(/Pro/) ? `pro-${version}` : version;
};

export const Toolkit = ObjectModel({
  name: String,
  version: String,
}).as('Toolkit');

Toolkit.create = (properties) => {
  properties.version = getVersionFromName(properties.name);
  return new Toolkit(properties);
};

Toolkit.prototype.semver = FunctionModel()(
  function() {
    const v = this.version.replace(/pro-/, '');
    return semver.coerce(v);
  }
);

const model = {
  versions: [],

  setVersions: action((state, payload) => {
    return {
      ...state,
      versions: payload.map((version) => Toolkit.create({ name: version })),
    };
  }),

  listVersions: thunk(async (actions, payload) => {
    const data = await dragonruby.list();
    actions.setVersions(data.versions);
  }),

  install: thunk(async (actions, payload) => {
    const data = await dragonruby.install(payload);
    await actions.listVersions();
    return data;
  }),

  uninstall: thunk(async (actions, payload) => {
    const data = await dragonruby.uninstall(payload.version);
    await actions.listVersions();
    return data;
  }),
};

export default model;
