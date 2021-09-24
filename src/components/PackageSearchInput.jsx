import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { CloudDownloadIcon, SearchIcon, CubeIcon } from '@heroicons/react/solid'
import { useStoreState, useStoreActions } from 'easy-peasy';
import Downshift from 'downshift';
import { ProjectStore } from '../stores/ProjectStore'

export default function PackageSearchInput() {
  const alert = useAlert();
  const addPackage = ProjectStore.useStoreActions((actions) => actions.addPackage);
  const packagesExpired = useStoreState((state) => state.packagesExpired);
  const packages = useStoreState((state) => state.packages);
  const listPackages = useStoreActions((actions) => actions.listPackages);

  useEffect(() => {
    if (packagesExpired) listPackages();
  }, [packagesExpired, listPackages]);

  const myAddPackage = async (name) => {
    try {
      await addPackage(name);
      alert.show(`Package "${name}" has been added to the project.`, {
        type: 'success',
      });
    } catch(e) {
      console.error(e);
      alert.show(`Failed to add "${name}" package`, {
        type: 'error',
        details: e.message,
        timeout: 5000,
      })
    }
  };

  return (
    <Downshift
      onChange={selection => {
        console.log(selection ? `You selected ${selection.name}` : 'Selection Cleared')
      }}
      itemToString={item => (item ? item.name : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        clearSelection,
      }) => (
        <div>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </div>
              <div
                className="w-full focus:border-indigo-500"
                {...getRootProps({}, { suppressRefError: true })}>
                <input
                  type="text"
                  name="package"
                  id="package"
                  className="block w-full pl-10 border-gray-300 rounded-none rounded-l-md sm:text-sm"
                  placeholder="Search packages..."
                  {...getInputProps()}
                />
              </div>
            </div>
            <button
              type="button"
              className="relative z-10 inline-flex items-center px-4 py-2 -ml-px text-sm font-medium bg-blue-500 border border-gray-300 text-gray-50 space-x-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              onClick={async () => {
                await myAddPackage(inputValue);
                clearSelection();
              }}
            >
              <CloudDownloadIcon className="w-5 h-5 text-gray-50" aria-hidden="true" />
              <span>Add</span>
            </button>
          </div>

          <ul className="relative mt-2 overflow-scroll text-left bg-white rounded rounded-t-none max-h-32 bg-opacity-50 -top-2" {...getMenuProps()}>
            {isOpen
              ? packages
                  .filter(item => !inputValue || item.name.includes(inputValue))
                  .map((item, index) => (
                    <li
                      className="py-1 pl-2 text-sm font-medium border-b border-b-2 border-dashed"
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : '',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      <div className="flex items-center">
                        <div className="flex flex-1 flex-shrink font-bold">
                          <CubeIcon className="w-5 h-5 mr-2 text-gray-500" aria-hidden="true" />
                          {item.name}
                        </div>
                        <div className="flex-1 flex-grow text-xs font-light">
                          {item.versions[0].description}
                        </div>
                      </div>
                    </li>
                  ))
              : null}
          </ul>

        </div>
      )}
    </Downshift>
  )
}
