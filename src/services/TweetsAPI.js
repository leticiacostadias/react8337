import { mostraNotificacao } from './Notificacao';

// export function addTweet(tweetNovo) {
//   return {
//     type: 'ADD_TWEET',
//     payload: tweetNovo
//   };
// }

export function atualizaTweets(onSuccess) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`)
      .then(resposta => resposta.json())
      .then(listaDeTweets => {
        if (onSuccess) onSuccess(listaDeTweets);

        // atualiza a store
        dispatch({
          type: 'ATUALIZAR_TWEETS',
          payload: listaDeTweets
        });
      });
  }
}

export function criaTweet(novoTweet, onSuccess) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conteudo: novoTweet
      })
    }).then(resposta => resposta.json())
      .then(tweetNovo => {
        dispatch({
          type: 'ADD_TWEET',
          payload: tweetNovo
        });

        dispatch(mostraNotificacao('Tweet adicionado com sucesso!'));

        // dispatch({
        //   type: 'MOSTRAR_NOTIFICACAO',
        //   payload: 'Tweet adicionado com sucesso!'
        // });

        // setTimeout(() => {
        //   dispatch({ type: 'REMOVE_NOTIFICACAO' });
        // }, 3000);

        if (onSuccess) onSuccess();
      })
  };
}

export function likeTweet(idTweet) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    fetch(`http://twitelum-api.herokuapp.com/tweets/${idTweet}/like?X-AUTH-TOKEN=${token}`, {
      method: 'POST'
    }).then(resposta => {
      if (resposta.ok) {
        dispatch({
          type: 'LIKE_TWEET',
          payload: idTweet
        });
      }
    });
  }
}

export function excluiTweet(idTweet, onSuccess) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    fetch(`http://twitelum-api.herokuapp.com/tweets/${idTweet}?X-AUTH-TOKEN=${token}`, {
      method: 'DELETE'
    }).then(resposta => {
      if (resposta.ok) {
        dispatch({
          type: 'DELETAR_TWEET',
          payload: idTweet
        });

        dispatch({
          type: 'TOGGLE_VISUALIZACAO',
          payload: null
        });

        dispatch(mostraNotificacao('Tweet excluído com sucesso!'));

        if (onSuccess) onSuccess();
      }
    });
  }
}
