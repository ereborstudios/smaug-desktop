import React  from 'react'
import ProjectData from '../../components/ProjectData';
import { LinkIcon } from '@heroicons/react/outline'

export default function ProjectOptions({ match, ...props }) {

  return (
    <div className="flex space-x-4">
      <div className="flex-grow w-1/3 text-left border border-gray-200 shadow sm:rounded-md">
        <ProjectData />
      </div>
      <div className="flex-shrink">
        <button
          disabled
          type="button"
          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <LinkIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Generate Bindings
        </button>
        <p className="text-xs text-gray-400">Not yet implemented</p>
      </div>
    </div>
  );
}
