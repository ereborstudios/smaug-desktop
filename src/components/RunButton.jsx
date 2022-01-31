import { useState, useEffect } from 'react';
import useInterval from 'use-interval';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid'
import { pidExists } from '../smaug.jsx';

const iconCls = "mr-1 h-5 w-5";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const BaseButton = ({ children, className, ...props }) => (
  <button
    type="button"
    className={classNames(className, "flex align-middle justify-center items-center px-2 py-2 border border-transparent rounded-l-md shadow-sm text-sm font-bold text-white focus:outline-none focus:ring-offset-gray-800")}
    {...props}>
    { children }
  </button>
);

export default function RunButton({ project, ...props }) {
  const [running, setRunning] = useState(false);
  //const child = useStoreState((state) => state.child);
  const runChild = useStoreActions((actions) => actions.runChild);
  const killChild = useStoreActions((actions) => actions.killChild);
  //const child = true;
  //const runChild = (project) => pidExists(project);
  //

  useInterval(() => {
    const fetchState = async (project) => {
      const response = await pidExists(project);
      setRunning(response);
    }
    fetchState(project);
  }, {
    delay: 500,
    immediate: true,
  });

  return (
    <>
      { running ? <BaseButton className="bg-red-700 hover:bg-red-700 focus:ring-red-600" onClick={() => killChild(project)}><PauseIcon className={iconCls} aria-hidden="true" /> Kill</BaseButton>
              : <BaseButton className="bg-green-700 hover:bg-green-700 focus:ring-green-600" onClick={() => runChild(project)}><PlayIcon className={iconCls} aria-hidden="true" /> Run</BaseButton>}
    </>
  );
}
