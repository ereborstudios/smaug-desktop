export default function EmptyDependencyList({ ...props }) {
  return (
    <div
      className="relative block w-full p-12 mx-auto text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      {...props}
    >
      <span className="block mt-2 text-sm font-medium text-gray-900">No package dependencies</span>
    </div>
  )
}
