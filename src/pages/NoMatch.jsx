import Layout from '../components/Layout';
import Search from '../components/Search';

export default function Dashboard({ match, ...props }) {
  return (
    <Layout header={<Search />}>
      <h2 className="text-center text-lg font-bold leading-7 text-black sm:text-xl sm:truncate">
        Page not found
      </h2>
    </Layout>
  );
}
