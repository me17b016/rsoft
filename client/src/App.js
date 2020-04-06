import React from 'react';

import LandingPage from './pages/landing page/landingpage';
import Resume from './pages/resume/resume';
import About from './pages/about/about';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/resume" component={Resume}/>
      <Route path="/about" component={About} />
    </Switch>
  </Router>
);

export default App;
