import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Habits from './containers/Habits';
import AddHabit from './containers/AddHabit';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/habits" component={Habits} />
      <Route exact path="/habits/create" component={AddHabit} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
