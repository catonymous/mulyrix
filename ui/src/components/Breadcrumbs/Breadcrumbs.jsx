import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTypes from '../custom-types';
import { artistPath, albumPath, trackPath } from '../route-paths';
import { withRouter, Route, Link } from 'react-router-dom';
import Breadcrumb/*, {Item}*/ from 'react-bootstrap/lib/Breadcrumb';

// reverse-engineered Breadcrumb.Item, integrated with react-router's Link
const Item = ({match, children}) => (
  <li className={match.isExact ? 'active' : ''}>
    {match.isExact ?
      <span>{children}</span> :
      <Link to={match.url} role="button">{children}</Link>}
  </li>
);

const RoutedItem = ({path, label}) => (
  <Route path={path} render={({match}) =>
    <Item match={match}>{label(match.params)}</Item>
  } />
);

export default withRouter(class extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired,
    match: CustomTypes.match.isRequired
  };

  render() {
    return (
      <Breadcrumb>
        <Item match={this.props.match}>{this.props.root}</Item>
        <RoutedItem path={artistPath} label={params => params.artist} />
        <RoutedItem path={albumPath} label={params => `${params.year} - ${params.album}`} />
        <RoutedItem path={trackPath} label={params => `${params.track}. ${params.title}`} />
      </Breadcrumb>
    );
  }
});
