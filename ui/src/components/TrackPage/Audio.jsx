import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Audio.css';

export default class extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  };
  render() {
    return <audio controls src={this.props.src} className="mulyrix"/>;
  }
}
