// reducer => function () {}
function createStore (reducer) {
  let store;
  const subscribers = [];

  store = reducer(store);
  
  // { type: '' }
  function dispatch (action) {
    // thunk rules here
    if (typeof action === 'function') {
      action = action(dispatch);
    }

    store = reducer(store, action);
    subscribers.forEach(func => func());
  }

  function subscribe (func) {
    subscribers.push(func);
  }
}
