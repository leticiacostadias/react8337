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

  it('deve renderizar avatar url', () => {
    props.avatarURL = '';
    const tweet = mountTweet();

    // teste aqui
  });
})