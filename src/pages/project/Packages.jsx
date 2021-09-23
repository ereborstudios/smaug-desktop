import React, { useEffect } from 'react'
import { open } from '@tauri-apps/api/shell';
import { useAlert } from 'react-alert'
import { CloudDownloadIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { ProjectStore } from '../../stores/ProjectStore'
import ProjectData from '../../components/ProjectData';
import DependencyList from '../../components/DependencyList';
import PackageSearchInput from '../../components/PackageSearchInput';

export default function ProjectPackages({ match, ...props }) {
  const alert = useAlert();
  const project = useStoreState((state) => state.projects.get(match.params.name));
  const installDependencies = ProjectStore.useStoreActions((actions) => actions.installDependencies);

  const install = async () => {
    try {
      await installDependencies();
      alert.show(`Successfully installed your dependencies.`, {
        type: 'success',
      });
    } catch(e) {
      console.error(e);
      alert.show(`Failed to install`, {
        type: 'error',
        details: e.message,
        timeout: 5000,
      })
    }
  };

  return (
    <div>
      <div className="flex justify-between w-full border-gray-200 space-x-8">
        <div className="flex-auto flex-grow w-full">
          <PackageSearchInput />
        </div>
        <div className="flex-auto flex-shrink">
          <button
            type="button"
            onClick={() => open("https://smaug.dev/packages/")}
            className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 border-none shadow-none w-max hover:text-indigo-900">
            <ExternalLinkIcon className="w-5 h-5 mr-1 -ml-1" aria-hidden="true" />
            Explore
          </button>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1 space-y-4">
          <DependencyList />

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => install()}
              className="relative inline-flex items-center justify-center flex-1 w-full px-4 py-2 mx-40 text-sm font-medium text-white bg-green-600 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <CloudDownloadIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
              Install dependencies
            </button>

            <button
              disabled
              type="button"
              className="relative inline-flex items-center justify-center hidden px-4 py-2 text-sm font-medium text-blue-800 bg-blue-200 border border-transparent shadow shadow-sm rounded-md border-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-max">
              Check for updates
            </button>
          </div>
        </div>
        <div className="flex-shrink hidden text-sm text-left w-min space-y-4">

          These packages are listed as dependencies.

        </div>
      </div>
    </div>
  );
}
