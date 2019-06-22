import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducerTweets from './reducers/tweets';
import reducerNotificacao from './reducers/notificacao';

const store = createStore(
  combineReducers({
    tweets: reducerTweets,
    notificacao: reducerNotificacao
  }),
  applyMiddleware(thunk)
);

export default store;