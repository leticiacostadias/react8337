import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
  // constructor (props) {
  //   super(props);

    // binds
    // this.handleChange = this.handleChange.bind(this);
  // }

  state = {
    novoTweet: ''
  }

  handleChange = (event) => this.setState({
    novoTweet: event.target.value
  })

  novoTweetValido = () => this.state.novoTweet.length === 0
    || this.state.novoTweet.length > 140

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@omariosouto"/>
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet">
                        <div className="novoTweet__editorArea">
                            <span
                              className={`novoTweet__status ${this.novoTweetValido() && 'novoTweet__status--invalido'}`}
                            >
                              {this.state.novoTweet.length}/140
                            </span>
                            {/* {this.state.novoTweet} */}
                            <textarea
                                onChange={this.handleChange}
                                className="novoTweet__editor"
                                placeholder="O que está acontecendo?"
                                value={this.state.novoTweet}
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
                        <Tweet
                            avatarUrl="https://pbs.twimg.com/profile_images/1023196605086875649/t-q4NJtl_400x400.jpg"
                            userName="felizberto1234"
                            nomeUsuario="Felizberto Doguin"
                        >
                            {'Hoje eu persegui o gato da vizinha! Foi loko! '}
                            <a href="/hashtags/aventuras">#aventuras</a>
                        </Tweet>
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
