import { FolderAddIcon } from '@heroicons/react/solid'

export default function EmptyVersionList({ ...props }) {
  return (
    <button
      type="button"
      className="relative block w-full p-12 mx-auto mt-2 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      {...props}
    >
      <FolderAddIcon className="w-12 h-12 mx-auto text-gray-400" aria-hidden="true" />
      <span className="block mt-2 text-sm font-medium text-gray-900">Install DragonRuby GTK</span>
    </button>
  )
}
