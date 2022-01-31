import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import { ProjectStore } from '../stores/ProjectStore'
import { GiftIcon as Icon } from '@heroicons/react/solid'
import Loader from 'react-spinners/RingLoader'

const iconCls = "w-5 h-5 m-0 p-0 mb-1";

const Loading = () => (
  <div className="inline-flex h-auto p-0 m-auto text-sm">
    <Loader size={30} /> <span className="ml-2 mr-2">Building...</span>
  </div>
);

export default function BuildButton({ ...props }) {
  const alert = useAlert();
  const [running, setRunning] = useState(false);
  const buildProject = ProjectStore.useStoreActions((actions) => actions.buildProject);

  const build = async () => {
    console.log('running');
    setRunning(true);
    try {
      const result = await buildProject();
      alert.show(`Build completed for all platforms`, {
        type: 'success',
        details: 'Check the builds/ directory of your project for distributable files.',
        timeout: 10000,
      })
    } catch(e) {
      console.error(e);
      alert.show('Build failed', {
        type: 'error',
        details: e.message,
        timeout: 5000,
      })
    }
    setRunning(false);
  };

  return (
    <button
      type="button"
      disabled={running}
      className="relative items-center justify-center px-2 py-2 -ml-px text-sm font-bold text-gray-500 bg-white border border-gray-300 flex-nowrap hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      onClick={() => build()}
      {...props}>
      {running ? <Loading /> : <div className="flex flex-row justify-center align-middle space-x-1"><Icon className={iconCls} aria-hidden="true" /> <div>Build</div></div>}
    </button>
  );
}
