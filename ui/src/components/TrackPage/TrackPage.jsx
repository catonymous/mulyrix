import React, { Component } from 'react';
import { connectAsPage } from '../Page';
import Audio from './Audio';
import LyricsTabs from './LyricsTabs';
import PropTypes from 'prop-types';
import CustomTypes from '../custom-types';
import MediaControl from '../MediaControl';

export default connectAsPage((state, props) => ({
  header: `${props.match.params.track}. ${props.match.params.title}`,
  subheader: 'Аудио, тексты',
  library: state.media.library
}))(class extends Component {
  static propTypes = {
    match: CustomTypes.match.isRequired,
    library: PropTypes.object
  };
  render() {
    const { library, match } = this.props;
    const params = match.params;
    const artist = library ? library[params.artist] : null;
    const album = artist ? artist[params.year][params.album] : null;
    const track = album ? album[params.disk][params.track][params.title] : null;

    return (
      <MediaControl empty="Трек не найден">
        { track &&
          <div>
            <Audio src={track}/>
            <LyricsTabs {...params}/>
          </div>
        }
      </MediaControl>
    );
  }
});
