import Layout from '../components/Layout';
import Search from '../components/Search';
import WelcomeMessage from '../components/WelcomeMessage';

export default function Dashboard({ match, ...props }) {
  return (
    <Layout>
      <WelcomeMessage />
    </Layout>
  );
}
