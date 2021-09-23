import Layout from '../components/Layout';
import Search from '../components/Search';

export default function Dashboard({ match, ...props }) {
  return (
    <Layout header={<Search />}>
      <h2>Dashboard</h2>
    </Layout>
  );
}
