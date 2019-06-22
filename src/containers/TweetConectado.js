import Tweet from '../components/Tweet';
import { connect } from 'react-redux';

import { likeTweet, excluiTweet } from '../services/TweetsAPI';

function mapDispatchToProps (dispatch, props) {
  return {
    handleCurtirTweet: () => dispatch(likeTweet(props.id)),
    handleExcluirTweet: () => dispatch(excluiTweet(props.id))
  };
}

export default connect(null, mapDispatchToProps)(Tweet);