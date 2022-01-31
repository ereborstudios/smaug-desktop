import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { getVersion } from '@tauri-apps/api/app'
import {
  NavLink
} from "react-router-dom";
import {
  HomeIcon,
  MenuAlt2Icon,
  XIcon,
  CollectionIcon,
  CodeIcon,
  BookOpenIcon,
  CogIcon
} from '@heroicons/react/outline'
import './Layout.css';
import Header from './Header';
import LogViewer from './LogViewer';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Projects', href: '/projects', icon: CollectionIcon },
  //{ name: 'Packages', href: '/packages', icon: CodeIcon },
  //{ name: 'Learn', href: '/learn', icon: BookOpenIcon },
  { name: 'System', href: '/system', icon: CogIcon }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ header, hero, children, ...props }) {
  const sidebarOpen = useStoreState((state) => state.sidebar.open);
  const openSidebar = useStoreActions((actions) => actions.openSidebar);
  const closeSidebar = useStoreActions((actions) => actions.closeSidebar);
  const [version, setVersion] = useState(null);

  const getVersionAsync = async () => {
    const v = await getVersion();
    setVersion(v);
  }

  useEffect(() => {
    if (!version) getVersionAsync();
  }, [version]);

  //const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={openSidebar}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => closeSidebar()}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="w-auto h-8"
                  src="https://smaug.dev/smaug.png"
                  alt="Smaug"
                />
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="sidebar">
                  {navigation.map((item) => (
                    <NavLink
                      exact
                      key={item.name}
                      to={item.href}
                      activeClassName="active">
                      <item.icon className="icon" aria-hidden="true" />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className={classNames(sidebarOpen ? "md:flex md:flex-shrink-0" : "hidden")}>
        <div className="flex flex-col w-40">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center flex-shrink-0 h-16 px-4 bg-gray-800">
              <img
                className="w-auto h-8 mt-1 mr-3"
                src="https://smaug.dev/smaug.png"
                alt="Smaug"
              />
              <div className="flex-1 text-left">
                <h2 className="text-lg font-bold text-white">
                  smaug
                </h2>
                <h3 className="text-xs tracking-widest text-gray-400 font-base">
                  v{version}
                </h3>
              </div>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="static-sidebar">
                {navigation.map((item) => (
                  <NavLink
                    exact
                    key={item.name}
                    to={item.href}
                    activeClassName="active">
                    <item.icon className="icon" aria-hidden="true" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-0 h-screen overflow-hidden">
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-gray-800 shadow">
          <button
            type="button"
            className="px-4 text-gray-500 border-r border-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => openSidebar()}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <Header>
            { header }
          </Header>
        </div>

        <main className="relative flex-1 overflow-y-auto focus:outline-none">

          { hero }

          <div className="mx-auto max-w-7xl">
            { children }
          </div>
        </main>

        {/*
        <div className="flex-auto">
          <div className="h-full text-left logViewer">
            <LogViewer />
          </div>
        </div>
        */}
      </div>
    </div>
  )
}
