import React from 'react';
import Tweet from './index';
import { shallow } from 'enzyme';

describe('Tweet', () => {
  let props = {};
  let tweet = null;
  const mountTweet = () => {
    if (!tweet) {
      tweet = shallow(<Tweet {...props} />)
    }

    return tweet;
  }

  beforeEach(() => {
    tweet = null;
    props = {};
  });

  it('deve renderizar avatar url', () => {
    props.avatarURL = '';
    const tweet = mountTweet();

    // teste aqui
  });
})