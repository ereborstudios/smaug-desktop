import Layout from '../components/Layout';
import Search from '../components/Search';
import VersionList from '../components/VersionList';

export default function System({ match, ...props }) {
  return (
    <Layout header={<Search />}>
      <VersionList />
    </Layout>
  );
}
