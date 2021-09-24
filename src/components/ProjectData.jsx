import { useState, useEffect } from 'react'
import semver from 'semver';
import { ProjectStore } from '../stores/ProjectStore'

const Row = ({ children, ...props }) => (
  <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
    {children}
  </div>
);

const Label = ({ helpText, children, ...props }) => (
  <dt className="text-base font-bold text-gray-700">
    <label htmlFor="about" className="block sm:pt-2">
      {children}
      {helpText &&
        <p className="mt-2 text-xs font-medium text-gray-400">
          {helpText}
        </p>
      }
    </label>
  </dt>
);

const Field = ({ helpText, children, ...props }) => (
  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
    <div className="max-w-lg flex rounded-md shadow-sm">
      {children}
    </div>
    {helpText &&
      <p className="mt-2 text-xs text-gray-400">
        {helpText}
      </p>
    }
  </dd>
);

export default function ProjectData({ ...props }) {

  const title = ProjectStore.useStoreState((state) => state.title);
  const setTitle = ProjectStore.useStoreActions((actions) => actions.setTitle);

  const version = ProjectStore.useStoreState((state) => state.version);
  const setVersion = ProjectStore.useStoreActions((actions) => actions.setVersion);

  const [newVersion, setNewVersion] = useState(version);

  useEffect(() => {
    setNewVersion(version);
  }, [version]);

  useEffect(() => {
    if (version !== newVersion) {
      if (semver.valid(newVersion)) {
        setVersion(newVersion);
      } else {
        console.log('invalid', newVersion);
      }
    }
  }, [newVersion, setVersion, version]);

  return (
    <div className="bg-white overflow-hidden sm:rounded-md">
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <Row>
            <Label helpText="The game's title">
              Title
            </Label>
            <Field helpText="This will show up in the title bar of your executable">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
              />
            </Field>
          </Row>

          <Row>
            <Label>
              Version
            </Label>
            <Field>
              <input
                type="text"
                name="version"
                id="version"
                autoComplete="version"
                value={newVersion}
                onChange={(e) => setNewVersion(e.target.value)}
                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
              />
            </Field>
          </Row>

        </dl>
      </div>
    </div>
  )
}
