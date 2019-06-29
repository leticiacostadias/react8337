import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mostraNotificacao } from './../Notificacao';

const mockStore = configureMockStore([ thunk ]);

test('mostraNotificacao deve despachar uma ação', () => {
  const store = mockStore('');
  const conteudo = 'Este é o conteúdo da notificação';

  store.dispatch(mostraNotificacao(conteudo));

  expect(store.getActions()).toEqual([
    {
      type: 'MOSTRAR_NOTIFICACAO',
      payload: conteudo  
    }
  ])
});