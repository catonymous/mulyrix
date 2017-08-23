import React, { Component } from 'react';
import ScanPanel from './ScanPanel';
import ArtistList from './ArtistList';
import { connectAsPage } from '../Page';

export default connectAsPage(() => ({
  header: 'Медиатека',
  subheader: 'Сканирование, артисты'
}))(class extends Component {
  render() {
    return (
      <div>
        <ScanPanel/>
        <ArtistList/>
      </div>
    );
  }
});
