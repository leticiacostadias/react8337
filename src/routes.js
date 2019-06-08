import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

export const Roteamento = (props) => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/login" component={LoginPage} />
    {/* <Route path="/categoria/:produtoId" component={ProductPage} /> */}
  </Switch>
);

export default Roteamento;