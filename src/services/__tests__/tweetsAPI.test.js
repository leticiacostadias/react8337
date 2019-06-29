import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as tweetsAPI from './../TweetsAPI';

const mockStore = configureMockStore([ thunk ]);

describe('Tweets API', () => {
  const mockedStore = () => {
    return mockStore({
      tweets: [],
      tweetSelecionado: null,
      mostraModal: false
    })
  };

  afterEach(() => {
    fetchMock.restore();
  });

  it('deve despachar uma ação LIKE_TWEET caso a chamada a API tenha sucesso', () => {
    const store = mockedStore();
    const idTweet = '1234567890';

    fetchMock
      .post(`http://twitelum-api.herokuapp.com/tweets/${idTweet}/like?X-AUTH-TOKEN=meuToken`, {
        status: 201,
        body: {
          liker: "vanessametonini",
          message: "Like inserido com sucesso!",
          status: 201
        }
      });

    return store.dispatch(tweetsAPI.likeTweet(idTweet)).then(() => {
      expect(store.getActions()).toEqual([
        { type: 'LIKE_TWEET', payload: idTweet }
      ]);
    });
  });

  it('deve despachar uma ação ADD_TWEET caso a chamada a API tenha sucesso', () => {
    const store = mockedStore();
    const tweetNovo = 'Esse é um novo tweet';
    const mockOnSuccess = jest.fn();
    const novoTweetPayload = {
      usuario: {
        login: 'vanessametonini',
        nome: 'Vanessa',
        sobrenome: 'Tonini',
        foto: 'https://www.caelum.com.br/imagens/instrutores/fotos/vanessa-tonini-120.jpg',
        email: 'vanessa.tonini@caelum.com.br'
      },
      conteudo: 'Esse é um novo tweet',
      dataCriacao:'2019-06-29T18:17:32.355Z',
      likes: [],
      totalLikes: 0,
      _id: "D0cJoNmAe6NK7ArI",
      createdAt: '2019-06-29T18:17:32.355Z',
      updatedAt: '2019-06-29T18:17:32.355Z',
      removivel: true
    };

    fetchMock
      .post('http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=meuToken', {
        status: 201,
        body: novoTweetPayload
      });

    return store.dispatch(tweetsAPI.criaTweet(tweetNovo, mockOnSuccess)).then(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(store.getActions()).toEqual([
        { type: 'ADD_TWEET', payload: novoTweetPayload },
        { type: 'MOSTRAR_NOTIFICACAO', payload: 'Tweet adicionado com sucesso!' }
      ]);
    })
  });
});
