import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState, useEffect } from 'react';
import { getVersion } from '@tauri-apps/api/app'
import { NavLink } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default ({ navigation }) => {
    const sidebarOpen = useStoreState((state) => state.sidebar.open);

    const [version, setVersion] = useState(null);

    const getVersionAsync = async () => {
      const v = await getVersion();
      setVersion(v);
    }
  
    useEffect(() => {
      if (!version) getVersionAsync();
    }, [version]);

    return(
        <div className={classNames(sidebarOpen ? "md:flex md:flex-shrink-0" : "hidden", "bg-black")}>
        <div className="flex flex-col w-40 z-20">
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
    )
}