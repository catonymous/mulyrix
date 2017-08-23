import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };
  resize() {
    // TODO: too large for some pages, make exact
    this.iframe.style.height = `${this.iframe.contentWindow.document.body.scrollHeight}px`;
  }
  render() {
    return <iframe ref={iframe => this.iframe = iframe}
        src={this.props.src} title={this.props.title} width="100%"
        onLoad={() => this.resize()}/>;
  }
}
