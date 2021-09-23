import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import ProjectData from '../../components/ProjectData';
import DependencyList from '../../components/DependencyList';

export default function ProjectFiles({ match, ...props }) {
  const project = useStoreState((state) => state.projects.get(match.params.name));

  return (
    <div className="flex space-x-4">
      <div className="flex-auto text-left w-1/3 border shadow border-gray-200 sm:rounded-md">
        <h2 className="p-16 text-center text-lg font-bold leading-7 text-black sm:text-xl sm:truncate">
          Not yet implemented
        </h2>
      </div>
    </div>
  );
}
