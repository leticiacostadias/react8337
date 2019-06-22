import { createStore } from 'redux';

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

    default:
      return state;
  }
}

const store = createStore(reducerTweets);

export default store;