import React, { Component, Fragment } from 'react';
import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'
import Tweet from './../components/Tweet'

class App extends Component {
  // constructor (props) {
  //   super(props);

    // binds
    // this.handleChange = this.handleChange.bind(this);
  // }

  state = {
    novoTweet: '',
    atualizado: false,
    tweets: []
  }

  // UNSAFE_componentWillMount () {}
  componentDidMount () {
    const token = localStorage.getItem('token');

    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`)
      .then(resposta => resposta.json())
      .then(listaDeTweets => this.setState({
        tweets: listaDeTweets
        // tweets: listaDeTweets.map(tweet => {
        //   tweet.totalLikes += 1;

        //   return tweet;
        // })
      }));
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

  componentDidCatch (error) {
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
    const token = localStorage.getItem('token');

    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conteudo: this.state.novoTweet
      })
    }).then(resposta => resposta.json())
      .then(tweetNovo => {
        this.setState({
          tweets: [tweetNovo, ...this.state.tweets],
          novoTweet: ''
        });
      });

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

  render() {
    const { novoTweet, tweets } = this.state;

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto"/>
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
                {tweets.length === 0 && (
                  <span>Twitte alguma coisa!</span>
                )}
                {tweets.map((tweet) => (
                  <Tweet
                    key={tweet._id}
                    avatarUrl={tweet.usuario.foto}
                    userName={tweet.usuario.login}
                    likeado={tweet.likeado}
                    totalLikes={tweet.totalLikes || tweet.likes.length}
                    nomeUsuario={`${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
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
      </Fragment>
    );
  }
}

export default App;
