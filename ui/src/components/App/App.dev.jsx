import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppProd from './App.prod';
import DevTools from '../DevTools';

export default class extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    return (
      <AppProd>
        {this.props.children}
        <DevTools/>
      </AppProd>
    );
  }
}
