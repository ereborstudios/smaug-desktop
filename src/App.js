import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { StoreProvider } from 'easy-peasy';
import { store } from './store';
import AlertTemplate from './components/AlertTemplate';
import './App.css'
import System from './pages/System';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';

function App() {

  const alertOptions = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }

  return (
    <StoreProvider store={store}>
      <Router>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <div className="App">
            <Switch>
              <Route path="/system" component={System} />
              <Route path="/projects/:name" component={Project} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/" component={Dashboard} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </AlertProvider>
      </Router>
    </StoreProvider>
  )
}

export default App
