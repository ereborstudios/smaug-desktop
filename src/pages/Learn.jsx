import Layout from '../components/Layout';

export default function Learn({ match, ...props }) {

  return (
    <Layout>
      <div className="bg-gray-900 rounded shadow shadow-lg border">
        <div className="max-w-2xl mx-auto text-center pt-8 pb-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold text-indigo-200 sm:text-2xl">
            <span className="block">
              Coming soon!
            </span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-400">
            Would you like to help us add more resources for learning DragonRuby?
          </p>
        </div>
      </div>
    </Layout>
  );
}
