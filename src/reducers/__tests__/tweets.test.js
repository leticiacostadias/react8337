import reducer from './../tweets';

describe('Reducer Tweets', () => {
  let state;

  it('deve retornar o estado inicial', () => {
    state = reducer(state, {});

    expect(state).toEqual({
      tweets: [],
      tweetSelecionado: null,
      mostraModal: false
    });
  });

  it('deve atualizar a lista de tweets ao receber ATUALIZAR_TWEETS', () => {
    state = reducer(state, {
      type: 'ATUALIZAR_TWEETS',
      payload: [
        { conteudo: 'Um tweet', nomeUsuario: 'Felizberto' },
        { conteudo: 'Outro tweet', nomeUsuario: 'Marquinhos' }
      ]
    });

    expect(state).toEqual({
      tweets: [
        { conteudo: 'Um tweet', nomeUsuario: 'Felizberto' },
        { conteudo: 'Outro tweet', nomeUsuario: 'Marquinhos' }
      ],
      tweetSelecionado: null,
      mostraModal: false
    })
  })
});