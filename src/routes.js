import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import RotaPrivada from './components/RotaPrivada';

import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

export const Roteamento = () => (
  <Switch>
    <RotaPrivada path={['/', '/tweets/:idTweet']} component={HomePage} exact />
    <Route path="/login" component={LoginPage} />
    <Route path="/logout" component={(() => <Redirect to="/login"/>)} />
    <Route path="/signup" component={SignUp} />
    <Route path="*" component={ErrorPage} />
    {/* <Route path="/categoria/:produtoId" component={ProductPage} /> */}

  </Switch>
);

export default Roteamento;