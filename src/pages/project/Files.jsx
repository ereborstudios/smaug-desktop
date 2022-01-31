import React from 'react'
//import { useStoreState } from 'easy-peasy';

export default function ProjectFiles({ match, ...props }) {
  //const project = useStoreState((state) => state.projects.get(match.params.name));

  return (
    <div className="flex px-4 py-2 space-x-4">
      <div className="flex-auto w-1/3 text-left border border-gray-200 shadow sm:rounded-md">
        <h2 className="p-16 text-center text-lg font-bold leading-7 text-black sm:text-xl sm:truncate">
          Not yet implemented
        </h2>
      </div>
    </div>
  );
}
