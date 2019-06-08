import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const RotaPrivada = (props) => {
  if (localStorage.getItem('token')) {
    return <Route {...props} />;
  }

  return <Redirect to="/login" />;
}

export default RotaPrivada;
