import {
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { useStoreState } from 'easy-peasy';
import Layout from '../components/Layout';
import { ProjectStore } from '../stores/ProjectStore';
import LogRecorder from '../components/LogRecorder';
import ProjectHeader from '../components/ProjectHeader';
import ProjectOverviewCard from '../components/ProjectOverviewCard';
import ProjectOptions from './project/Options';
import ProjectPackages from './project/Packages';
import ProjectFiles from './project/Files';
import ProjectLogs from './project/Logs';

export default function Project({ match, ...props }) {
  const project = useStoreState((state) => state.projects.get(match.params.name));
  //const closeSidebar = useStoreActions((actions) => actions.closeSidebar);

  //closeSidebar();

  if (!project) return null;

  return (
    <ProjectStore.Provider runtimeModel={project}>
      <LogRecorder />
      <Layout
        header={<ProjectHeader />}
        hero={<ProjectOverviewCard />}>

        <Switch>
          <Route path="/projects/:name/options" component={ProjectOptions} />
          <Route path="/projects/:name/packages" component={ProjectPackages} />
          <Route path="/projects/:name/files" component={ProjectFiles} />
          <Route path="/projects/:name/logs" component={ProjectLogs} />
          <Redirect from="/projects/:name" to="/projects/:name/options" />
        </Switch>
      </Layout>
    </ProjectStore.Provider>
  );
}
