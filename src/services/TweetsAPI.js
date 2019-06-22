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
