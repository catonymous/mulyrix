import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTypes from '../custom-types';
import { connectAsPage } from '../Page';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from '../ListGroupItem';
import MediaControl from '../MediaControl';

export default connectAsPage((state, props) => ({
  header: props.match.params.artist,
  subheader: 'Альбомы артиста',
  library: state.media.library
}))(class extends Component {
  static propTypes = {
    match: CustomTypes.match.isRequired,
    library: PropTypes.object
  }
  render() {
    const { library, match } = this.props;
    const artist = library ? library[match.params.artist] : null;

    return (
      <MediaControl empty="Список пуст">
        { artist &&
          <ListGroup>
              {Object.keys(artist).map(year =>
                  Object.keys(artist[year]).map(album =>
                    <ListGroupItem root={match.url} components={[year, album]}>{year} - {album}</ListGroupItem>))}
          </ListGroup>
        }
      </MediaControl>);
  }
});
