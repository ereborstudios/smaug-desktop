import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
import { CogIcon, SwitchVerticalIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { getVersion } from '@tauri-apps/api/app'

export default function AppUpdater() {
  const alert = useAlert();
  const [update, setUpdate] = useState(false);
  const [version, setVersion] = useState(null);
  const [pending, setPending] = useState(false);

  const getVersionAsync = async () => {
    const v = await getVersion();
    setVersion(v);
  }

  useEffect(() => {
    if (!version) getVersionAsync();
  }, [version]);

  const tryUpdate = async () => {
    try {
      const {shouldUpdate, manifest} = await checkUpdate();
      if (shouldUpdate) {
        setUpdate(manifest);
      } else {
        setUpdate(false);
      }
    } catch(error) {
      console.error(error);
    }
  };

  const startUpdate = async () => {
    try {
      setPending(true);
      await installUpdate();
      alert.show(`Update installed`, {
        type: 'success',
      });
      setPending(false);
      await relaunch();
    } catch(error) {
      console.error(error);
      setPending(false);
      alert.show(`Failed to update`, {
        type: 'error',
        details: error,
        timeout: 5000,
      })
    }
  };

  useEffect(() => {
    tryUpdate();
  }, [update, pending]);

  return (
    <>
      {update &&
        <div className="mb-4 bg-gray-300 border border-gray-400 rounded shadow shadow-lg">
          <div className="max-w-2xl px-4 pt-4 pb-4 mx-auto text-center sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              <span className="block">
                A new version is available!
              </span>
            </h2>

            <div className="p-4 mx-auto mt-4 font-mono bg-gray-200 border border-gray-400 rounded w-max rounded-xl">
              <p className="mt-1 text-sm text-gray-600 leading-6">
                {update.body}
              </p>
            </div>

            <div className="mt-4">
              {pending ?
                <button
                  type="button"
                  className="relative z-10 inline-flex items-center px-4 py-2 -ml-px text-2xl font-medium text-gray-600 bg-blue-200 border border-gray-400 rounded-lg cursor-default space-x-2"
                  disabled>
                  <div className="flex items-center space-x-2 animate-pulse">
                    <CogIcon className="w-6 h-6 text-black animate-spin" aria-hidden="true" />
                    <span>Updating...</span>
                  </div>
                </button>
              :
                <button
                  type="button"
                  className="relative z-10 inline-flex items-center px-4 py-2 -ml-px text-2xl font-medium bg-blue-500 border border-gray-800 rounded-lg text-gray-50 space-x-2 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  onClick={startUpdate}>
                  <SwitchVerticalIcon className="w-6 h-6 text-gray-50" aria-hidden="true" />
                  <span><strong>Update</strong> now</span>
                </button>
              }

                <div className="flex flex-row items-center justify-center mx-auto mt-1 text-center">
                  <div className="text-sm font-semibold text-red-800">
                    v{version}
                  </div>
                  <ArrowNarrowRightIcon className="w-5 h-5 mx-2 text-gray-600" aria-hidden="true" />
                  <div className="text-sm font-semibold text-green-800">
                    v{update.version}
                  </div>
                </div>

            </div>
          </div>
        </div>
      }
    </>
  )
}
