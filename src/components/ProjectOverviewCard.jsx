import { TagIcon, TerminalIcon, CodeIcon } from '@heroicons/react/solid'
import { ProjectStore } from '../stores/ProjectStore'
import Toggle from './Toggle';
import RunButton from './RunButton';
import BuildButton from './BuildButton';
import PublishButton from './PublishButton';
import ProjectTabs from './ProjectTabs';

export default function ProjectOverviewCard({ ...props }) {
  const title = ProjectStore.useStoreState((state) => state.title);
  const version = ProjectStore.useStoreState((state) => state.version);
  const project = ProjectStore.useStoreState((state) => state.project);

  if (!project) return null;

  return (
    <div className="overflow-hidden bg-white">
      <div className="p-3 bg-gray-900">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="w-16 h-16 mx-auto rounded-full" src={project.iconUrl()} alt="" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-xl font-black text-gray-200 sm:text-2xl">{title}</p>
              <p className="font-mono text-xs font-light text-gray-400">{project.projectBasePath()}</p>
            </div>
          </div>

          <div className="flex justify-end flex-shrink-0 mt-5 sm:mt-0">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <RunButton project={project} />
              <BuildButton project={project} />
              <PublishButton project={project} />
            </span>
          </div>

        </div>
      </div>
      <div className="bg-gray-900 border-black grid grid-cols-1 divide-y divide-black sm:grid-cols-3 sm:divide-y-0 sm:divide-x">

        <div className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-center">
          <TagIcon className="w-5 h-5 mr-1 text-gray-400" aria-hidden="true" />
          <span className="mr-1 text-sm font-medium text-gray-200">Version</span>
          <span className="font-black text-gray-200">{version}</span>
        </div>

        <div className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-center">
          <div className="inline-flex mr-2 font-black text-gray-200">
            <TerminalIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            <span className="ml-1 mr-1 font-medium">DragonRuby</span>
            {project.config.dragonruby.version}
            <span className="inline-flex items-center border-gray-300 px-1.5 py-0.5 rounded-md text-xs font-medium bg-blue-500 text-white font-black uppercase ml-2">
              {project.config.dragonruby.edition}
            </span>
          </div>
        </div>

        <div className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-center">
          <CodeIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          <span className="ml-1 mr-2 text-sm font-medium text-gray-200">Compile Ruby</span>
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
