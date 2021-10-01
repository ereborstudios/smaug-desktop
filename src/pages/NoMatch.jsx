import Layout from '../components/Layout';

export default function Dashboard({ match, ...props }) {
  return (
    <Layout>
      <div className="bg-gray-400 rounded shadow shadow-lg w-2/3 mx-auto rounded-xl">
        <div className="max-w-2xl mx-auto text-center pt-8 pb-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold text-gray-800 sm:text-2xl">
            <span className="block">
              Sorry, this page does not exist.
            </span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-900 font-medium">
            At least, not yet!
          </p>
        </div>
      </div>
    </Layout>
  );
}
