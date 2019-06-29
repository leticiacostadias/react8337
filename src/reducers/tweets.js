const storeInicial = {
  tweets: [],
  tweetSelecionado: null,
  mostraModal: false
};

function reducerTweets (state = storeInicial, action) {
  switch (action.type) {
    case 'ATUALIZAR_TWEETS':
      return {
        ...state,
        tweets: action.payload
      };
    
    case 'ADD_TWEET':
      const tweets = [action.payload, ...state.tweets];

      return {
        ...state,
        tweets
      };
    
    case 'LIKE_TWEET':
      const tweetsAtualizados = state.tweets
        .map(tweet => {
          if (tweet._id === action.payload) {
            tweet.totalLikes += tweet.likeado ? -1 : 1;
            tweet.likeado = !tweet.likeado;
          }

          return tweet;
        });
      
      return {
        ...state,
        tweets: tweetsAtualizados
      };

    case 'DELETAR_TWEET':
      return {
        ...state,
        tweets: state.tweets
          .filter(tweet => tweet._id !== action.payload)
      };

    case 'TOGGLE_VISUALIZACAO':
      return {
        ...state,
        mostraModal: Boolean(action.payload),
        tweetSelecionado: action.payload
      }

    default:
      return state;
  }
}

export default reducerTweets;