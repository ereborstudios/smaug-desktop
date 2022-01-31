import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import Loader from 'react-spinners/RingLoader'
import { SparklesIcon as Icon } from '@heroicons/react/solid'
import { ProjectStore } from '../stores/ProjectStore'

const iconCls = "w-5 h-5 m-0 p-0 mb-1";

const Loading = () => (
  <div className="inline-flex h-auto p-0 m-auto text-sm">
    <Loader size={30} /> <span className="mr-2">Publishing...</span>
  </div>
);

export default function PublishButton({ ...props }) {
  const alert = useAlert();
  const [running, setRunning] = useState(false);
  const publishProject = ProjectStore.useStoreActions((actions) => actions.publishProject);
  const itchUsername = ProjectStore.useStoreState((state) => state.itchUsername);
  const itchUrl = ProjectStore.useStoreState((state) => state.itchUrl);

  const publish = async () => {
    console.log('running');
    setRunning(true);
    try {
      const result = await publishProject();
      alert.show(`Successfully published to ${itchUsername}.itch.io`, {
        type: 'success',
        details: `Your Project URL is ${itchUrl}`,
        timeout: 10000,
      })
    } catch(e) {
      console.error(e);
      alert.show('Failed to publish', {
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
      className="relative items-center justify-center px-2 py-2 -ml-px text-sm font-bold text-gray-500 bg-white border border-gray-300 flex-nowrap rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      onClick={() => publish()}
      {...props}>
      {running ? <Loading /> :
        <div className="flex flex-row justify-center align-middle space-x-1">
          <Icon className={iconCls} aria-hidden="true" />
          <div>Publish</div>
        </div>}
    </button>
  );
}
