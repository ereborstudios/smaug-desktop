import React, { useEffect } from 'react'
import { open } from '@tauri-apps/api/shell';
import { ExternalLinkIcon, CubeIcon } from '@heroicons/react/solid'
import { ProjectStore } from '../stores/ProjectStore'
import EmptyDependencyList from './EmptyDependencyList';

export default function DependencyList({ ...props }) {
  const dependencies = ProjectStore.useStoreState((state) => state.dependencies);

  const openExternal = (dependency) => {
    open(`https://smaug.dev/packages/${dependency}`);
  };

  useEffect(() => {
    console.log('setDep', dependencies);
  }, [dependencies]);

  return (
    <div>
      {Object.entries(dependencies).length ?
        <div>
          <div className="overflow-hidden bg-white border shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {Object.entries(dependencies).map((dep) => (
                <li key={dep[0]}>
                  <div className="block px-2 sm:px-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <CubeIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                      <p className="text-sm font-bold truncate">{dep[0]}</p>
                      <div className="flex justify-end flex-grow ml-2">
                        <p className="text-xs subpixel-antialiased font-medium text-gray-400 truncate">{dep[1]}</p>
                      </div>
                      <div className="flex flex-shrink-0 ml-2">
                        
                        <span className="relative z-0 inline-flex shadow-none">
                          <button
                            type="button"
                            onClick={() => openExternal(dep[0])}
                            className="relative inline-flex items-center py-1 ml-4 text-sm font-medium text-gray-400 bg-white border-none hover:bg-gray-50 focus:z-10 focus:outline-none"
                          >
                            <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
                          </button>
                        </span>

                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        : <EmptyDependencyList />
      }
    </div>
  )
}

