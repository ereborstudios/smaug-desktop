import { Command } from '@tauri-apps/api/shell'
import { dirname } from '@tauri-apps/api/path'

export const dragonruby = {
  list: async () => {
    const cmd = Command.sidecar('smaug', ['dragonruby', 'list', '--json']);
    const output = await cmd.execute();
    return JSON.parse(output.stdout);
  },

  install: async (zipFile) => {
    const cmd = Command.sidecar('smaug', ['dragonruby', 'install', '--json', zipFile])
    const output = await cmd.execute();
    if (output.code !== 0) {
      throw new Error(output.stderr);
    }
    return JSON.parse(output.stdout);
  },

  uninstall: async (version) => {
    const cmd = Command.sidecar('smaug', ['dragonruby', 'uninstall', '--json', version])
    const output = await cmd.execute();
    if (output.code !== 0) {
      throw new Error(output.stderr);
    }
    return JSON.parse(output.stdout);
  },
};

export const run = async (project) => {
  const cwd = await dirname(project.path);
  const cmd = Command.sidecar('smaug', ['run'], {cwd: cwd});
  //cmd.stdout.on('data', line => {
  //});
  return cmd;
};

export const newProject = async (path) => {
  const cmd = Command.sidecar('smaug', ['new', '--json', path]);
  const output = await cmd.execute();
  if (output.code !== 0) {
    throw new Error(output.stderr);
  }
  return JSON.parse(output.stdout);
};

export const add = async (project, pkg) => {
  const cwd = await dirname(project.path);
  const cmd = Command.sidecar('smaug', ['add', '--json', pkg], {cwd: cwd});
  //cmd.stdout.on('data', line => {
  //});
  const output = await cmd.execute();
  if (output.code !== 0) {
    throw new Error(output.stderr);
  }
  return JSON.parse(output.stdout);
};

export const install = async (project) => {
  const cwd = await dirname(project.path);
  const cmd = Command.sidecar('smaug', ['install', '--json'], {cwd: cwd});
  //cmd.stdout.on('data', line => {
  //});
  const output = await cmd.execute();
  if (output.code !== 0) {
    throw new Error(output.stderr);
  }
  return JSON.parse(output.stdout);
};
