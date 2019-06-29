import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';

import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {
  state = {
    erro: '',
    token: localStorage.getItem('token')
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const username = this.usernameInput.value;
    const senha = this.senhaInput.value;

    if (username.length === 0 || senha.length === 0) return;

    const resposta = await fetch(
      'http://twitelum-api.herokuapp.com/login',
      {
        method: 'POST',
        body: JSON.stringify({
          senha,
          login: username
        })
      }
    );
    const dados = await resposta.json();

    if (resposta.status !== 200) {
      return this.setState({ erro: dados.message });
    }

    localStorage.setItem('token', dados.token);
    this.setState({ token: localStorage.getItem('token') });
  }

  render() {
    if (this.state.token) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Cabecalho />
        <div className="loginPage">
          <div className="container">
            <Widget>
              <h2 className="loginPage__title">Seja bem vindo!</h2>
              <form
                className="loginPage__form"
                action="/"
                onSubmit={this.handleSubmit}
              >
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="login">Login</label>
                  <input
                    ref={(elem) => this.usernameInput = elem}
                    className="loginPage__input"
                    type="text"
                    id="login"
                    name="login"
                  />
                </div>
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="senha">Senha</label>
                  <input
                    ref={(elem) => this.senhaInput = elem}
                    className="loginPage__input"
                    type="password"
                    id="senha"
                    name="senha"
                  />
                </div>
                {this.state.erro && (
                  <div className="loginPage__errorBox">
                    {this.state.erro}
                  </div>
                )}
                <div className="loginPage__inputWrap">
                  <button className="loginPage__btnLogin" type="submit">
                    Logar
                  </button>
                </div>
              </form>
            </Widget>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default LoginPage