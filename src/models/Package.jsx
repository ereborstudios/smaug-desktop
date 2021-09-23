import { action, thunk, computed } from 'easy-peasy';
import { ObjectModel, ArrayModel } from 'objectmodel'
import moment from 'moment';
import { fetch } from '@tauri-apps/api/http';

export const PackageVersion = ObjectModel({
  version: String,
}).as('PackageVersion');

export const Package = ObjectModel({
  name: String,
  versions: ArrayModel(PackageVersion),
}).as('Package');

Package.create = (properties) => {
  //properties.version = getVersionFromName(properties.name);
  return new Package(properties);
};

const model = {
  packages: [],
  packagesRefreshedAt: false,
  packagesExpired: computed((state) => (
    (state.packagesRefreshedAt) ? state.packagesRefreshedAt.isBefore(
      moment().subtract(10, 'minutes')
    ) : true
  )),

  setPackages: action((state, payload) => {
    return {
      ...state,
      packagesRefreshedAt: moment(),
      packages: payload.map((pkg) => Package.create(pkg)),
    };
  }),

  listPackages: thunk(async (actions, payload) => {
    const response = await fetch("https://api.smaug.dev/packages.json", { responseType: 1 });
    console.log('data', response.data);
    actions.setPackages(response.data);
  }),
};

export default model;
