import React, { Component } from 'react';
import propTypes from 'prop-types';
import './tweet.css';

// this.props

class Tweet extends Component {
  static propTypes = {
    totalLikes: propTypes.number,
    avatarUrl: propTypes.string,
    id: propTypes.string.isRequired,
    userName: propTypes.string.isRequired,
    nomeUsuario: propTypes.string.isRequired,
    likeado: propTypes.bool,
    removivel: propTypes.bool,
    children: propTypes.node.isRequired,
    abreModal: propTypes.func
  }

  static defaultProps = {
    totalLikes: 0,
    likeado: false,
    removivel: false,
    avatarUrl: 'https://place-hold.it/50x50',
    abreModal: null
  }

  // state = {
  //   likeado: this.props.likeado,
  //   totalLikes: this.props.totalLikes
  // }

  // curtirTweet = () => {
  //   this.props.handleCurtirTweet();
    // const { likeado, totalLikes } = this.state;
    // const { id } = this.props;
    
    // const token = localStorage.getItem('token');

    // fetch(`http://twitelum-api.herokuapp.com/tweets/${id}/like?X-AUTH-TOKEN=${token}`, {
    //   method: 'POST'
    // })
    //   .then(resposta => {
    //     if (resposta.ok) {
    //       this.setState({
    //         likeado: !likeado,
    //         totalLikes: totalLikes + (likeado ? -1 : +1)
    //       });
    //     }
    //   });
  // }

  handleClick = (event) => {
    if (event.target.closest('.tweet__footer')) return;

    if (this.props.abreModal) this.props.abreModal();
  }

  render() {
    return (
      <article className="tweet" onClick={this.handleClick}>
        <div className="tweet__cabecalho">
          <img
            className="tweet__fotoUsuario"
            src={this.props.avatarUrl}
            alt=""
          />
          <span className="tweet__nomeUsuario">
            {this.props.nomeUsuario}
          </span>
          <a href="/">
            <span className="tweet__userName">
              @{this.props.userName}
            </span>
          </a>
        </div>
        <p className="tweet__conteudo">
          {this.props.children}
        </p>
        <footer className="tweet__footer">
          <button className="btn btn--clean" onClick={this.props.handleCurtirTweet}>
            <svg
              className={`icon icon--small iconHeart ${this.props.likeado && 'iconHeart--active'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.5 47.5"
            >
              <defs>
                <clipPath id="a">
                  <path d="M0 38h38V0H0v38z"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
              </g>
            </svg>
            {this.props.totalLikes}
          </button>

          {this.props.removivel && (
            <button onClick={this.props.handleExcluirTweet} className="btn btn--blue btn--remove">X</button>
          )}
        </footer>
      </article>
    )
  }
}

export default Tweet