import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { PlusIcon } from '@heroicons/react/outline'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { ChevronRightIcon, FolderIcon } from '@heroicons/react/solid'
import NewProjectDialog from './NewProjectDialog';
import EmptyProjectList from './EmptyProjectList';
import { ProjectStore } from '../stores/ProjectStore'
import { Project } from '../models/Project'

export default function ProjectList({ openNewProjectDialog, ...props }) {
  //const settings = useStoreState((state) => state.settings);
  const settingsExpired = useStoreState((state) => state.settingsExpired);
  const loadSettings = useStoreActions((actions) => actions.loadSettings);

  const projects = useStoreState((state) => state.projects);
  const [newProjectDialog, setNewProjectDialog] = useState(false);

  useEffect(() => {
    if (settingsExpired) loadSettings();
  }, [settingsExpired, loadSettings]);

  useEffect(() => {
    setNewProjectDialog(openNewProjectDialog);
  }, [openNewProjectDialog]);

  return (
    <div className="px-4 py-5 bg-white border-b border-gray-200 sm:px-6">
      <div className="flex flex-wrap items-center justify-between -mt-2 -ml-4 sm:flex-nowrap">
        <div className="mt-2 ml-4">
          <h3 className="text-lg font-medium text-gray-900 leading-6">Projects</h3>
        </div>
        <div className="flex-shrink-0 mt-2 ml-4">
          <button
            type="button"
            onClick={() => setNewProjectDialog(true)}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
            New project
          </button>
        </div>
      </div>


      {projects.size ?
        <div className="mt-2 overflow-hidden bg-white border shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {Array.from(projects.values()).map((project) => (
              <li key={project.path}>
                <Link
                  to={`/projects/${project.name}`}
                  className="block hover:bg-gray-300">
                  <div className="px-2 py-2 sm:px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <FolderIcon className="w-5 h-5 mx-2" aria-hidden="true" />
                        <p className="text-sm font-medium truncate">{project.getTitle()}</p>
                      </div>
                      <div className="flex justify-end flex-grow ml-2">
                        <p className="text-xs subpixel-antialiased font-medium text-gray-400 truncate">
                          {project.path.replace(/\/Smaug\.toml$/, '')}
                        </p>
                      </div>
                    
                      <div className="flex-shrink-0 ml-5">
                        <ChevronRightIcon className="w-5 h-5 text-black" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        : <EmptyProjectList onClick={() => setNewProjectDialog(true)} />
      }

      <ProjectStore.Provider runtimeModel={new Project()}>
        {newProjectDialog &&
          <NewProjectDialog
            title={`New Project`}
            message="Start a new DragonRuby project"
            onCancel={() => setNewProjectDialog(false)}
            onConfirm={() => setNewProjectDialog(false)} />
        }
      </ProjectStore.Provider>
    </div>
  )
}
