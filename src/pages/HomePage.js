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

// import * as TweetAPI from '../services/TweetsAPI';
import { atualizaTweets, criaTweet } from '../services/TweetsAPI';

class App extends Component {
  // constructor (props) {
  //   super(props);

  // binds
  // this.handleChange = this.handleChange.bind(this);
  // }

  state = {
    // atualizado: false,
    novoTweet: '',
    mostraModal: false,
    tweetSelecionado: null,
    // tweets: []
  }

  // UNSAFE_componentWillMount () {}
  componentDidMount() {
    // console.log(this.props.location);
    // console.log(this.props.match);

    // window.store.subscribe(() => {
    //   this.setState({
    //     tweets: window.store.getState().tweets
    //   })
    // })

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
    // fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`)
    //   .then(resposta => resposta.json())
    //   .then(listaDeTweets => {
    //     const { idTweet } = this.props.match.params;
    //     const novoState = { /* tweets: listaDeTweets */ };

    //     if (idTweet) {
    //       const tweetLink = listaDeTweets.find(
    //         tweet => tweet._id === idTweet
    //       );

    //       if (tweetLink) {
    //         novoState.mostraModal = true;
    //         novoState.tweetSelecionado = tweetLink;
    //       }
    //     }

    //     this.setState(novoState);

    //     // atualiza a store
    //     this.props.handleAtualizaTweets({
    //       type: 'ATUALIZAR_TWEETS',
    //       payload: listaDeTweets
    //     });
    //       // {
    //         // tweets: listaDeTweets
    //         // tweets: listaDeTweets.map(tweet => {
    //         //   tweet.totalLikes += 1;

    //         //   return tweet;
    //         // })
    //       // }
    //     // )
    //   });
  }

  // UNSAFE_componentWillReceiveProps () {}
  // UNSAFE_componentWillUpdate () {}
  // componentDidUpdate () {
  //   if (!this.state.atualizado) {
  //     this.setState({
  //       atualizado: true,
  //       tweets: this.state.tweets.map(tweet => {
  //         tweet.totalLikes += 1;

  //         return tweet;
  //       })
  //     });
  //   }
  // }

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

    // console.log('form submitado');
    // this.state.novoTweet // conteudo

    this.props.handleCriaTweet(this.state.novoTweet, () => {
      this.setState({
        // tweets: [tweetNovo, ...this.state.tweets],
        novoTweet: ''
      });
    });
    // fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     conteudo: this.state.novoTweet
    //   })
    // }).then(resposta => resposta.json())
    // .then(tweetNovo => {
    //   this.props.dispatch(addTweet());
    // });

    // this.setState({
    //   tweets: [this.state.novoTweet, ...this.state.tweets],
    //   novoTweet: ''
    // });
  }

  novoTweetValido = () => this.state.novoTweet.length === 0
    || this.state.novoTweet.length > 140

  // renderizaTweets = () => {
  //   return this.state.tweets.map(
  //     conteudoTweet => (
  //       <Tweet
  //         avatarUrl="https://pbs.twimg.com/profile_images/1023196605086875649/t-q4NJtl_400x400.jpg"
  //         userName="felizberto1234"
  //         nomeUsuario="Felizberto Doguin"
  //       >
  //         {conteudoTweet}
  //       </Tweet>
  //     )
  //   );
  // }

  // excluirTweet = (idTweet) => () => {
  //   excluiTweet(idTweet);
  // }

  abreModalParaTweet = (tweet) => () => {
    this.props.history.push(`/tweets/${tweet._id}`);

    this.setState({
      mostraModal: true,
      tweetSelecionado: tweet
    });
  }

  fechaModal = () => {
    this.props.history.push('/');

    this.setState({
      mostraModal: false,
      tweetSelecionado: null
    });
  }

  render() {
    const {
      novoTweet,
      // tweets,
      mostraModal,
      tweetSelecionado
    } = this.state;

    const { listaDeTweets } = this.props;

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
                  {/* {this.state.novoTweet} */}
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
                    // excluirTweet={this.excluirTweet(tweet._id)}
                    abreModal={this.abreModalParaTweet(tweet)}
                  >
                    {tweet.conteudo}
                  </Tweet>
                ))}
                {/* <Tweet
                  avatarUrl="https://pbs.twimg.com/profile_images/1023196605086875649/t-q4NJtl_400x400.jpg"
                  userName="felizberto1234"
                  nomeUsuario="Felizberto Doguin"
                >
                  {'Hoje eu persegui o gato da vizinha! Foi loko! '}
                  <a href="/hashtags/aventuras">#aventuras</a>
                </Tweet> */}
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
              // excluirTweet={this.excluirTweet(tweetSelecionado._id)}
            >
              {tweetSelecionado.conteudo}
            </Tweet>
          )}
        </Modal>
      </Fragment>
    );
  }
}

function mapStateToProps(stateDaStore) {
  return {
    listaDeTweets: stateDaStore.tweets
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleCriaTweet: (novoTweet, onSuccess) => {
      dispatch(criaTweet(novoTweet, onSuccess));
    },
    handleAtualizaTweets: (onSuccess) => {
      dispatch(atualizaTweets(onSuccess));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
