import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Habits from './containers/Habits';
import AddHabit from './containers/AddHabit';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import SingleHabit from './containers/SingleHabit';
import UpdateHabit from './containers/UpdateHabit';
import AddMeasure from './containers/AddMeasure';
import Measurements from './containers/Measurements';
import UpdateMeasure from './containers/UpdateMeasure';
import More from './components/More';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Habits} />
      <Route exact path="/measures" component={Habits} />
      <Route exact path="/progress" component={Habits} />
      <Route exact path="/habits/create" component={AddHabit} />
      <Route exact path="/users/sign_up" component={SignUp} />
      <Route exact path="/users/sign_in" component={SignIn} />
      <Route exact path="/habits/:id" component={SingleHabit} />
      <Route exact path="/habits/:id/edit" component={UpdateHabit} />
      <Route exact path="/habits/:id/measurements/create" component={AddMeasure} />
      <Route exact path="/habits/:id/measurements" component={Measurements} />
      <Route exact path="/habits/:habitId/measurements/:measureId" component={UpdateMeasure} />
      <Route exact path="/more" component={More} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
