import React, { useEffect } from 'react'
import { FolderIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import { open } from '@tauri-apps/api/dialog'
import { homeDir, sep } from '@tauri-apps/api/path'
import { ProjectStore } from '../stores/ProjectStore'

export default function NewProjectForm() {

  const title = ProjectStore.useStoreState((state) => state.title);
  const setTitle = ProjectStore.useStoreActions((actions) => actions.setTitle);

  const name = ProjectStore.useStoreState((state) => state.name);
  const setName = ProjectStore.useStoreActions((actions) => actions.setName);

  const path = ProjectStore.useStoreState((state) => state.path);
  const setPath = ProjectStore.useStoreActions((actions) => actions.setPath);

  const openBrowseDialog = async () => {
    const parentPath = await open({
      defaultPath: await homeDir(),
      directory: true,
      multiple: false,
    });
    const projectBasePath = [parentPath, name].join(sep);
    setPath(projectBasePath);
  };

  useEffect(() => {
    const setDefaultPath = async () => {
      const home = await homeDir();
      const defaultPath = [home.replace(/\/+$/, ''), name].join(sep);
      await setPath(defaultPath);
    }
    setDefaultPath();
  }, [name, setPath]);

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Title
                <p className="mt-2 text-xs text-gray-400">
                  The game's title
                </p>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex max-w-lg rounded-md shadow-sm">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  This will show up in the title bar of your executable
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Name
                <p className="mt-2 text-xs text-gray-400">
                  The name of your game's executable
                </p>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex max-w-lg rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  This should only contain a-z, A-Z, 0-9, _ or -
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Location
                </label>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-2">
                  <div className="flex mt-1 sm:mt-0 sm:col-span-2 rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FolderIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="path"
                        id="path"
                        autoComplete="path"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        className="flex-1 flex-grow min-w-0 pl-10 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={openBrowseDialog}
                      className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 border border-gray-300 space-x-2 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <DotsHorizontalIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span>Browse</span>
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400 w-max">
                The path to your new project
              </p>

            </div>

          </div>
        </div>
      </div>

    </form>
  )
}

