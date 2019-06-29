import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Cabecalho from './../components/Cabecalho';
import NavMenu from './../components/NavMenu';
import Dashboard from './../components/Dashboard';
import Widget from './../components/Widget';
import TrendsArea from './../components/TrendsArea';
import Modal from './../components/Modal';

import Tweet from './../containers/TweetConectado';

import { atualizaTweets, criaTweet } from '../services/TweetsAPI';

class App extends Component {
  state = {
    novoTweet: '',
  }

  componentDidMount() {
    this.props.handleAtualizaTweets((listaDeTweets) => {
      const { idTweet } = this.props.match.params;
      const novoState = { /* tweets: listaDeTweets */ };

      if (idTweet) {
        const tweetLink = listaDeTweets.find(
          tweet => tweet._id === idTweet
        );

        if (tweetLink) {
          novoState.mostraModal = true;
          novoState.tweetSelecionado = tweetLink;
        }
      }

      this.setState(novoState);
    });
  }

  componentDidCatch(error) {
    console.log('xi, algo deu errado!');
    console.log(error);
    this.setState({ erro: true });
  }

  handleChange = (event) => this.setState({
    novoTweet: event.target.value
  })

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.handleCriaTweet(this.state.novoTweet, () => {
      this.setState({ novoTweet: '' });
    });
  }

  novoTweetValido = () => this.state.novoTweet.length === 0
    || this.state.novoTweet.length > 140

  abreModalParaTweet = (tweet) => () => {
    this.props.history.push(`/tweets/${tweet._id}`);

    this.props.handleToggleModal(tweet);
  }

  fechaModal = () => {
    this.props.history.push('/');

    this.props.handleToggleModal(null);
  }

  render() {
    const { novoTweet, } = this.state;

    const {
      listaDeTweets,
      mostraModal,
      tweetSelecionado,
      notificacao
    } = this.props;

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.handleSubmit}>
                <div className="novoTweet__editorArea">
                  <span
                    className={`novoTweet__status ${this.novoTweetValido() && 'novoTweet__status--invalido'}`}
                  >
                    {novoTweet.length}/140
                  </span>
                  <textarea
                    onChange={this.handleChange}
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    value={novoTweet}
                  >
                  </textarea>
                </div>
                <button
                  type="submit"
                  className="novoTweet__envia"
                  disabled={this.novoTweetValido()}
                >
                  Tweetar
                </button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {listaDeTweets.length === 0 && (
                  <span>Twitte alguma coisa!</span>
                )}
                {listaDeTweets.map((tweet) => (
                  <Tweet
                    key={tweet._id}
                    id={tweet._id}
                    removivel={tweet.removivel}
                    avatarUrl={tweet.usuario.foto}
                    userName={tweet.usuario.login}
                    likeado={tweet.likeado}
                    totalLikes={tweet.totalLikes || tweet.likes.length}
                    nomeUsuario={`${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
                    abreModal={this.abreModalParaTweet(tweet)}
                  >
                    {tweet.conteudo}
                  </Tweet>
                ))}
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal
          estaAberto={mostraModal}
          fechaModal={this.fechaModal}
        >
          {tweetSelecionado && (
            <Tweet
              id={tweetSelecionado._id}
              removivel={tweetSelecionado.removivel}
              avatarUrl={tweetSelecionado.usuario.foto}
              userName={tweetSelecionado.usuario.login}
              likeado={tweetSelecionado.likeado}
              totalLikes={tweetSelecionado.totalLikes || tweetSelecionado.likes.length}
              nomeUsuario={`${tweetSelecionado.usuario.nome} ${tweetSelecionado.usuario.sobrenome}`}
            >
              {tweetSelecionado.conteudo}
            </Tweet>
          )}
        </Modal>

        {notificacao && (
          <div className="notificacaoMsg">
            {notificacao}
          </div>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(stateDaStore) {
  return {
    listaDeTweets: stateDaStore.tweets.tweets,
    mostraModal: stateDaStore.tweets.mostraModal,
    tweetSelecionado: stateDaStore.tweets.tweetSelecionado,
    notificacao: stateDaStore.notificacao
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleCriaTweet: (novoTweet, onSuccess) => {
      dispatch(criaTweet(novoTweet, onSuccess));
    },
    handleAtualizaTweets: (onSuccess) => {
      dispatch(atualizaTweets(onSuccess));
    },
    handleToggleModal: (tweet) => {
      dispatch({
        type: 'TOGGLE_VISUALIZACAO',
        payload: tweet
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
