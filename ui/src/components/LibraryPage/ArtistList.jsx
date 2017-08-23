import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from '../ListGroupItem';
import MediaControl from '../MediaControl';

export default connect(state => {
  const { library } = state.media;

  return { library };
})(class extends Component {
    static propTypes = {
      library: PropTypes.object
    };
    render() {
      const { library } = this.props;

      return (
        <MediaControl empty="Список пуст">
          { library &&
            <ListGroup>
                {Object.keys(library).map(artist =>
                  <ListGroupItem key={artist} components={[artist]}>{artist}</ListGroupItem>)}
            </ListGroup>
          }
        </MediaControl>
      );
    }
});