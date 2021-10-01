import Layout from '../components/Layout';
import WelcomeMessage from '../components/WelcomeMessage';

export default function Dashboard({ match, ...props }) {
  return (
    <Layout>
      <WelcomeMessage />
    </Layout>
  );
}
