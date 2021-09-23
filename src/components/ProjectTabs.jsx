import {
  NavLink,
  useRouteMatch,
} from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProjectTabs({ project, ...props }) {
  const match = useRouteMatch("/projects/:name/:tab");

  const tabs = [
    { name: 'Options', href: `/projects/${project.name}/options` },
    { name: 'Packages', href: `/projects/${project.name}/packages` },
    { name: 'Files', href: `/projects/${project.name}/files` },
    { name: 'Logs', href: `/projects/${project.name}/logs` },
  ]

  if (!match) { return null }

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.name.toLowerCase() === match.params.tab).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-300">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <NavLink
                exact
                key={tab.name}
                to={tab.href}
                activeClassName="active"
                className={classNames(
                  (tab.name.toLowerCase() === match.params.tab)
                    ? 'border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-400',
                  'w-1/4 py-1.5 px-1 text-center border-b-4 font-bold text-xs'
                )}
                aria-current={(tab.name.toLowerCase() === match.params.tab) ? 'page' : undefined}
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
