import { Fragment } from 'react'
import { Link } from "react-router-dom";
import { open } from '@tauri-apps/api/shell'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderOpenIcon
} from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import { ProjectStore } from '../stores/ProjectStore'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProjectHeader({ ...props }) {
  const title = ProjectStore.useStoreState((state) => state.title);
  const name = ProjectStore.useStoreState((state) => state.name);
  const project = ProjectStore.useStoreState((state) => state.project);

  return (
    <div className="flex w-full">
      <div className="w-full lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center">
              <li>
                <div className="flex">
                  <Link to="/projects" className="text-xs font-medium text-gray-300 hover:text-white">
                    Projects
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="flex-shrink-0 w-4 h-4 text-gray-500" aria-hidden="true" />
                  <Link to={`/projects/${name}`} className="text-xs font-medium text-gray-300 hover:text-white">
                    { title }
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex mt-5 lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <button
              type="button"
              onClick={() => open(project.projectBasePath())}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              <FolderOpenIcon className="w-4 h-4 mr-2 -ml-1 text-gray-300" aria-hidden="true" />
              Explore
            </button>
          </span>

          {/* Dropdown */}
          <Menu as="span" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
              More
              <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-gray-400" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 w-48 py-1 mt-2 -ml-1 bg-white shadow-lg origin-top-left rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
