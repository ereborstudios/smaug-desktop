import { useStoreState, useStoreActions } from 'easy-peasy';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid'

const iconCls = "-ml-1 mr-2 h-4 w-4";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const BaseButton = ({ children, className, ...props }) => (
  <button
    type="button"
    className={classNames(className, "inline-flex items-center px-2 py-1 border border-transparent rounded-l-md shadow-sm text-xs font-medium text-white focus:outline-none focus:ring-offset-gray-800")}
    {...props}>
    { children }
  </button>
);

export default function RunButton({ project, ...props }) {
  const child = useStoreState((state) => state.child);
  const runChild = useStoreActions((actions) => actions.runChild);
  const killChild = useStoreActions((actions) => actions.killChild);

  return (
    <>
      { child ? <BaseButton className="bg-red-700 hover:bg-red-700 focus:ring-red-600" onClick={() => killChild()}><PauseIcon className={iconCls} aria-hidden="true" /> Kill</BaseButton>
              : <BaseButton className="bg-green-700 hover:bg-green-700 focus:ring-green-600" onClick={() => runChild(project)}><PlayIcon className={iconCls} aria-hidden="true" /> Run</BaseButton>}
    </>
  );
}
