import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';
import Search from '../components/Search';

export default function NewProject() {
  return (
    <Layout header={<Search />}>
      <ProjectList openNewProjectDialog />
    </Layout>
  );
}
