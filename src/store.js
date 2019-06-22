import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const storeInicial = {
  tweets: []
};

// action = { type: 'ASSAR_BOLINHO' }

function reducerTweets (state = storeInicial, action) {
  // switch (action.type)
  // if (action.type === 'ASSAR_BOLINHO') {
    // return Object.assign({}, state, { assando: true });
  //   return { ...state, assando: true };
  // }

  // if (action.type === 'BOLINHO_PRONTO') {
  //   return { ...state, bolinho: action.bolinho, assando: false };
  // }

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

    default:
      return state;
  }
}

const store = createStore(
  reducerTweets,
  applyMiddleware(thunk)
);

export default store;