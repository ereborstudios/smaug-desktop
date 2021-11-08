import Layout from '../components/Layout';
import WelcomeMessage from '../components/WelcomeMessage';
import AppUpdater from '../components/AppUpdater';

export default function Dashboard({ match, ...props }) {
  return (
    <Layout>
      <AppUpdater />
      <WelcomeMessage />
    </Layout>
  );
}
