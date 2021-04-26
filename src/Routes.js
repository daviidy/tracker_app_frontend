import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Habits from './containers/Habits';
import AddHabit from './containers/AddHabit';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import SingleHabit from './containers/SingleHabit';
import UpdateHabit from './containers/UpdateHabit';
import AddMeasure from './containers/AddMeasure';
import Measurements from './containers/Measurements';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/habits" component={Habits} />
      <Route exact path="/habits/create" component={AddHabit} />
      <Route exact path="/users/sign_up" component={SignUp} />
      <Route exact path="/users/sign_in" component={SignIn} />
      <Route exact path="/habits/:id" component={SingleHabit} />
      <Route exact path="/habits/:id/edit" component={UpdateHabit} />
      <Route exact path="/habits/:id/measurements/create" component={AddMeasure} />
      <Route exact path="/habits/:id/measurements" component={Measurements} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
