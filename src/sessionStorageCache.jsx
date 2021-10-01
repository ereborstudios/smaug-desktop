import { invoke } from '@tauri-apps/api/tauri'

export const sessionStorageCache = {
  'get': async (key) => {
    try {
      const result = await invoke('session_cache_get', { key: key });
      return JSON.parse(result);
    } catch(e) {
      return undefined;
    }
  },

  'set': (key, value) => {
    const result = invoke('session_cache_set',
      { key: key, value: JSON.stringify(value) });
    return result;
  },

  remove: (key) => {
    const result = invoke('session_cache_remove', { key: key });
    return result;
  },

};

export default sessionStorageCache;
