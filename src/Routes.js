import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Habits from './containers/Habits';
import AddHabit from './containers/AddHabit';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/habits" component={Habits} />
      <Route exact path="/habits/create" component={AddHabit} />
      <Route exact path="/users/sign_up" component={SignUp} />
      <Route exact path="/users/sign_in" component={SignIn} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
