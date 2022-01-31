import React  from 'react'
import ProjectData from '../../components/ProjectData';
import { LinkIcon } from '@heroicons/react/outline'

export default function ProjectOptions({ match, ...props }) {

  return (
    <div className="flex px-4 py-2 space-x-2">
      <ProjectData />
      <div className="flex-shrink">
        <button
          disabled
          type="button"
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-200 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <LinkIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
          Generate Bindings
        </button>
        <p className="text-xs text-gray-400">Not yet implemented</p>
      </div>
    </div>
  );
}
