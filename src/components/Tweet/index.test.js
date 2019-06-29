import React from 'react';
import Tweet from './index';
import { shallow } from 'enzyme';

describe('Tweet', () => {
  let props = {
    id: '1234567890',
    userName: 'leticiaCosta',
    nomeUsuario: 'Letícia Costa',
    children: 'React rules!'
  };
  let tweet = null;
  const mountTweet = () => {
    if (!tweet) {
      tweet = shallow(<Tweet {...props} />)
    }

    return tweet;
  }

  beforeEach(() => {
    tweet = null;
    props = {
      id: '1234567890',
      userName: 'leticiaCosta',
      nomeUsuario: 'Letícia Costa',
      children: 'React rules!'
    };
  });

  it('deve executar handleCurtirTweet ao clicar no like', () => {
    props.handleCurtirTweet = jest.fn();

    const tweet = mountTweet();
    const likeButton = tweet.find('.btn--clean');

    likeButton.simulate('click');

    expect(props.handleCurtirTweet).toHaveBeenCalled();
  });

  it('deve renderizar botão de exclusão se removivel for true', () => {
    props.removivel = true;

    const tweet = mountTweet();
    const excluirButton = tweet.find('.btn--remove');

    expect(excluirButton.length).toBe(1);
  });

  it('não deve renderizar botão de exclusão se removivel for false', () => {
    props.removivel = false;

    const tweet = mountTweet();
    const excluirButton = tweet.find('.btn--remove');

    expect(excluirButton.length).toBe(0);
  });

  it('deve executar handleExcluirTweet quando o botão de exclusão for clicado', () => {
    props.removivel = true;
    props.handleExcluirTweet = jest.fn();

    const tweet = mountTweet();
    const excluirButton = tweet.find('.btn--remove');

    excluirButton.simulate('click');

    expect(props.handleExcluirTweet).toHaveBeenCalled();
  });

  it('deve renderizar o nome do usuário no cabeçalho', () => {
    const tweet = mountTweet();
    const elementoNomeUsuario = tweet.find('span.tweet__nomeUsuario');

    expect(elementoNomeUsuario.text()).toEqual(props.nomeUsuario);
  });

  it('deve renderizar o avatar com src igual a avatarUrl', () => {
    props.avatarUrl = 'https://imagem.do.user.com';

    const tweet = mountTweet();
    const elementoAvatar = tweet.find('img.tweet__fotoUsuario');

    expect(elementoAvatar.prop('src')).toEqual(props.avatarUrl);
  });
})