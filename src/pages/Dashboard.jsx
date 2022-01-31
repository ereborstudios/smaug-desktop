import Layout from '../components/Layout';
import WelcomeMessage from '../components/WelcomeMessage';
import AppUpdater from '../components/AppUpdater';

export default function Dashboard({ match, ...props }) {
  return (
    <Layout>
      <div className="px-4 py-2">
        <AppUpdater />
        <WelcomeMessage />
      </div>
    </Layout>
  );
}
