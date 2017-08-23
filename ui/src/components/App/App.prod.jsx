import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid  from 'react-bootstrap/lib/Grid';
import { Route } from 'react-router-dom';
import { artistPath, albumPath, trackPath } from '../route-paths';
import Breadcrumbs from '../Breadcrumbs';
import LibraryPage from '../LibraryPage';
import ArtistPage from '../ArtistPage';
import AlbumPage from '../AlbumPage';
import TrackPage from '../TrackPage';

export default class extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    return (
      <Grid fluid>
        <Breadcrumbs root="MuLyriX"/>
        <Route exact path="/" component={LibraryPage}/>
        <Route exact path={artistPath} component={ArtistPage}/>
        <Route exact path={albumPath} component={AlbumPage}/>
        <Route exact path={trackPath} component={TrackPage}/>
        {this.props.children}
      </Grid>
    );
  }
};
