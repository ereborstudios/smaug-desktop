import React, { useState, useEffect } from 'react'
import { open } from '@tauri-apps/api/dialog'
import { FolderAddIcon, FolderOpenIcon, TrashIcon } from '@heroicons/react/outline'
import { useAlert } from 'react-alert'
import { useStoreState, useStoreActions } from 'easy-peasy';
import semver from 'semver';
import ConfirmationDialog from './ConfirmationDialog';
import EmptyVersionList from './EmptyVersionList';

export default function VersionList() {
  const alert = useAlert();
  const versions = useStoreState((state) => state.toolkit.versions);
  const listVersions = useStoreActions((actions) => actions.toolkit.listVersions);
  const install = useStoreActions((actions) => actions.toolkit.install);
  const uninstall = useStoreActions((actions) => actions.toolkit.uninstall);
  const [confirmAction, setConfirmAction] = useState(false);

  const uninstallVersion = async (version) => {
    setConfirmAction(false);
    try {
      await uninstall(version);
      alert.show(`${version.name} has been uninstalled.`, {
        type: 'success',
      })
    } catch(e) {
      if (e.message.match(/DragonRubyNotFound/)) {
        alert.show('Failed to uninstall', {
          type: 'error',
          details: e.message,
          timeout: 5000,
        })
      }
    }
  };

  const openDialog = async () => {
    const zipFile = await open({
      filters: [
        { name: 'dragonruby-*.zip', extensions: ['zip'] }
      ],
      directory: false,
      multiple: false,
    });
    try {
      const data = await install(zipFile);
      alert.show(`${data.version} has been installed.`, {
        type: 'success',
        details: data.path,
      })
    } catch(e) {
      if (e.message && e.message.match(/DragonRubyNotFound/)) {
        alert.show('Installation error', {
          type: 'error',
          details: e.message,
          timeout: 5000,
        })
      }
    }
  };

  useEffect(() => {
    listVersions();
  }, [listVersions]);

  return (
    
    <div className="px-4 py-5 bg-white border-b border-gray-200 sm:px-6">
      <div className="flex flex-wrap items-center justify-between -mt-2 -ml-4 sm:flex-nowrap">
        <div className="mt-2 ml-4">
          <h3 className="text-lg font-medium text-gray-900 leading-6">Installed Versions</h3>
        </div>
        <div className="flex-shrink-0 mt-2 ml-4">
          <button
            type="button"
            onClick={openDialog}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FolderAddIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
            Install
          </button>
        </div>
      </div>

      {versions.length ?
        <div className="mt-2 overflow-hidden bg-white border shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {versions.sort((a, b) => semver.lt(a.semver(), b.semver())).map((version) => (
              <li key={version.version}>
                <div className="block px-2 py-2 sm:px-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{version.name}</p>
                    <div className="flex flex-shrink-0 ml-2">
                      
                      <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                          type="button"
                          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <span className="sr-only">Explore</span>
                          <FolderOpenIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmAction(version)}
                          className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <span className="sr-only">Uninstall</span>
                          <TrashIcon className="w-5 h-5 text-red-700" aria-hidden="true" />
                        </button>
                      </span>

                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        : <EmptyVersionList onClick={openDialog} />
      }

      {confirmAction &&
        <ConfirmationDialog
          title={`Remove ${confirmAction.name}?`}
          message="Are you sure you want to uninstall this version?"
          onCancel={() => setConfirmAction(false)}
          onConfirm={() => uninstallVersion(confirmAction)} />
      }

    </div>
  )
}

