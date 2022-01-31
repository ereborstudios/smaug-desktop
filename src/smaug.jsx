import { Command } from '@tauri-apps/api/shell'
import { dirname, sep } from '@tauri-apps/api/path'
import { readTextFile } from '@tauri-apps/api/fs'
import { invoke } from '@tauri-apps/api/tauri'
import { emit, listen } from '@tauri-apps/api/event'

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
  cmd.stdout.on('data', line => {
    emit('cmd.stdout.data', line);
  });
  return cmd;
};

export const killProcess = async (project) => {
  const cwd = await dirname(project.path);
  const pidfile = [cwd, "logs", "pid.lock"].join(sep);
  //console.log('pidfile', pidfile);
  const pid = await readTextFile(pidfile);
  //console.log('pid: ', pid);
  invoke('kill_process', { pid: Number(pid) });
};

export const pidExists = async (project) => {
  let result;
  try {
    const cwd = await dirname(project.path);
    const pidfile = [cwd, "logs", "pid.lock"].join(sep);
    const pid = await readTextFile(pidfile);
    result = await invoke('pid_exists', { pid: Number(pid) });
  } catch(e) {
    result = false;
  }
  return result;
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

export const build = async (project) => {
  const cwd = await dirname(project.path);
  const cmd = Command.sidecar('smaug', ['build', '--json'], {cwd: cwd});
  const output = await cmd.execute();
  if (output.code !== 0) {
    throw new Error(output.stderr);
  }
  return JSON.parse(output.stdout);
};

export const publish = async (project) => {
  const cwd = await dirname(project.path);
  const cmd = Command.sidecar('smaug', ['publish', '--json'], {cwd: cwd});
  const output = await cmd.execute();
  if (output.code !== 0) {
    throw new Error(output.stderr);
  }
  return JSON.parse(output.stdout);
};
