import React, { useState, useEffect } from 'react'
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
  }, [name]);

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
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
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
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
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
                  <div className="mt-1 sm:mt-0 sm:col-span-2 flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FolderIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="path"
                        id="path"
                        autoComplete="path"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 flex-grow min-w-0 rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={openBrowseDialog}
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <DotsHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Browse</span>
                    </button>
                  </div>
                </div>
              </div>
              <p className="w-max mt-2 text-xs text-gray-400">
                The path to your new project
              </p>

            </div>

          </div>
        </div>
      </div>

    </form>
  )
}

