import { invoke } from '@tauri-apps/api/tauri'
import { Command } from '@tauri-apps/api/shell'
import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';
import Search from '../components/Search';

export default function Projects() {
  return (
    <Layout header={<Search />}>
      <ProjectList />
    </Layout>
  );
}
