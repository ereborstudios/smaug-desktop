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
    <div className="flex max-w-lg rounded-md shadow-sm">
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

  const itchUsername = ProjectStore.useStoreState((state) => state.itchUsername);
  const setItchUsername = ProjectStore.useStoreActions((actions) => actions.setItchUsername);

  const itchUrl = ProjectStore.useStoreState((state) => state.itchUrl);
  const setItchUrl = ProjectStore.useStoreActions((actions) => actions.setItchUrl);

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
    <div className="flex-grow w-1/3 overflow-hidden text-left space-y-4">
      <div className="border border-gray-200 shadow sm:rounded-md">
        <div className="overflow-hidden bg-white sm:rounded-md">
          <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
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
                    className="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
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
                    className="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                  />
                </Field>
              </Row>

            </dl>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 shadow sm:rounded-md">
        <div className="overflow-hidden bg-white sm:rounded-md">
          <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <Row>
                <Label>
                  Itch Username
                </Label>
                <Field helpText="Your username on Itch.io">
                  <input
                    type="text"
                    name="itchUsername"
                    id="itchUsername"
                    autoComplete="itchUsername"
                    value={itchUsername}
                    onChange={(e) => setItchUsername(e.target.value)}
                    className="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                  />
                </Field>
              </Row>

              <Row>
                <Label helpText="The project URL you set when you created the game on Itch.io">
                  Itch URL
                </Label>
                <Field helpText="This will also be the name of your build files, so fill it out even if you aren't uploading to Itch.io.">
                  <input
                    type="text"
                    name="itchUrl"
                    id="itchUrl"
                    autoComplete="itchUrl"
                    value={itchUrl}
                    onChange={(e) => setItchUrl(e.target.value)}
                    className="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                  />
                </Field>
              </Row>

            </dl>
          </div>

        </div>
      </div>
    </div>
  )
}
