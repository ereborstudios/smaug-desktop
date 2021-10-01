import { CloudDownloadIcon } from '@heroicons/react/solid'
import { open } from '@tauri-apps/api/shell'

export default function NoVersionsMessage() {

  const SMAUG_PURCHASE_URL = 'https://dragonruby.org/toolkit/game#purchase';

  return (
    <div className="bg-gray-700 rounded shadow shadow-lg border">
      <div className="max-w-2xl mx-auto text-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">
          <span className="block">
            Where is your DragonRuby?
          </span>
        </h2>
        <p className="mt-1 text-base leading-6 text-indigo-200">
          Before you get started, you first need to purchase a copy of the DragonRuby Game Toolkit and download a version of the software to install.
        </p>

        <div className="mt-6">
          <button
            type="button"
            className="relative z-10 inline-flex items-center px-4 py-2 -ml-px text-sm font-medium bg-blue-500 border border-gray-800 text-gray-50 space-x-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={() => open(SMAUG_PURCHASE_URL)}>
            <CloudDownloadIcon className="w-5 h-5 text-gray-50" aria-hidden="true" />
            <span>Get <strong>DragonRuby</strong></span>
          </button>
        </div>
      </div>
    </div>
  )
}
