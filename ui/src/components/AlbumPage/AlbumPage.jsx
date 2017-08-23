import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTypes from '../custom-types';
import { connectAsPage } from '../Page';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from '../ListGroupItem';
import MediaControl from '../MediaControl';

export default connectAsPage((state, props) => ({
  header: `${props.match.params.year} - ${props.match.params.album}`,
  subheader: 'Треки альбома',
  library: state.media.library
}))(class extends Component {
  static propTypes = {
    match: CustomTypes.match.isRequired,
    library: PropTypes.object
  }
  render() {
    const { library, match } = this.props;
    const params = match.params;
    const artist = library ? library[params.artist] : null;
    const album = artist ? artist[params.year][params.album] : null;

    return (
      <MediaControl empty="Список пуст">
        { album &&
          <ListGroup>
            {Object.keys(album).map(disk =>
              Object.keys(album[disk]).map(track =>
                Object.keys(album[disk][track]).map(title =>
                  <ListGroupItem root={match.url} components={[disk, track, title]}>{track}. {title}</ListGroupItem>)))}
          </ListGroup>
        }
      </MediaControl>);
  }
});
