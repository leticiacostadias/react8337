import Tweet from '../components/Tweet';
import { connect } from 'react-redux';

import { likeTweet } from '../services/TweetsAPI';

function mapDispatchToProps (dispatch, props) {
  return {
    handleCurtirTweet: () => {
      dispatch(likeTweet(props.id));
    }
  };
}

export default connect(null, mapDispatchToProps)(Tweet);