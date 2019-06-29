import reducer from './../notificacao';

describe('Reducer Notificação', () => {
  let state;

  it('deve retornar o estado inicial', () => {
    state = reducer(state, {});

    expect(state).toEqual('');
  });

  it('deve atualizar a store quando receber MOSTRAR_NOTIFICACAO', () => {
    state = reducer(state, {
      type: 'MOSTRAR_NOTIFICACAO',
      payload: 'Nova notificação'
    });

    expect(state).toEqual('Nova notificação');
  });

  it('deve limpar a store quando receber REMOVE_NOTIFICACAO', () => {
    state = reducer(state, {
      type: 'REMOVE_NOTIFICACAO'
    });

    expect(state).toEqual('');
  });
})