import { TagIcon, TerminalIcon, CodeIcon } from '@heroicons/react/solid'
import { ProjectStore } from '../stores/ProjectStore'
import Toggle from './Toggle';
import RunButton from './RunButton';
import ProjectTabs from './ProjectTabs';

export default function ProjectOverviewCard({ ...props }) {
  const title = ProjectStore.useStoreState((state) => state.title);
  const version = ProjectStore.useStoreState((state) => state.version);
  const project = ProjectStore.useStoreState((state) => state.project);

  if (!project) return null;

  return (
    <div className="bg-white overflow-hidden">
      <div className="bg-gray-900 p-3">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="mx-auto h-16 w-16 rounded-full" src={project.iconUrl()} alt="" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-xl font-black text-gray-200 sm:text-2xl">{title}</p>
              <p className="text-xs font-light font-mono text-gray-400">{project.projectBasePath()}</p>
            </div>
          </div>

          <div className="mt-5 flex-shrink-0 flex justify-center sm:mt-0">
            
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <RunButton project={project} />

              <button
                type="button"
                className="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span>Build</span>
              </button>

              <button
                type="button"
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span>Publish</span>
              </button>
            </span>

          </div>

        </div>
      </div>
      <div className="border-black bg-gray-900 grid grid-cols-1 divide-y divide-black sm:grid-cols-3 sm:divide-y-0 sm:divide-x">

        <div className="px-6 py-2 text-sm font-medium text-center inline-flex justify-center items-center">
          <TagIcon className="h-5 w-5 mr-1 text-gray-400" aria-hidden="true" />
          <span className="mr-1 text-sm font-medium text-gray-200">Version</span>
          <span className="font-black text-gray-200">{version}</span>
        </div>

        <div className="px-6 py-2 text-sm font-medium text-center inline-flex justify-center items-center">
          <div className="font-black text-gray-200 inline-flex mr-2">
            <TerminalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="mr-1 ml-1 font-medium">DragonRuby</span>
            {project.config.dragonruby.version}
            <span className="inline-flex items-center border-gray-300 px-1.5 py-0.5 rounded-md text-xs font-medium bg-blue-500 text-white font-black uppercase ml-2">
              {project.config.dragonruby.edition}
            </span>
          </div>
        </div>

        <div className="px-6 py-2 text-sm font-medium text-center inline-flex justify-center items-center">
          <CodeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="mr-2 ml-1 text-sm font-medium text-gray-200">Compile Ruby</span>
          <div className="inline-flex">
            <Toggle />
          </div>
        </div>

      </div>

      <div className="bg-gray-200">
        <ProjectTabs project={project} />
      </div>
    </div>
  )
}
