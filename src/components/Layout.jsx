import { useStoreActions } from 'easy-peasy';

import {
  HomeIcon,
  MenuAlt2Icon,
  CollectionIcon,
  CogIcon
} from '@heroicons/react/outline'
import './Layout.css';
import Header from './Header';
import LogViewer from './LogViewer';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Projects', href: '/projects', icon: CollectionIcon },
  //{ name: 'Packages', href: '/packages', icon: CodeIcon },
  //{ name: 'Learn', href: '/learn', icon: BookOpenIcon },
  { name: 'System', href: '/system', icon: CogIcon }
]


export default function Layout({ header, hero, children, ...props }) {
  const openSidebar = useStoreActions((actions) => actions.openSidebar);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <MobileNav navigation={navigation} />
      <DesktopNav navigation={navigation} />
      
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
