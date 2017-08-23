import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class extends Component {
    static propTypes = {
      root: PropTypes.string,
      components: PropTypes.arrayOf(PropTypes.string).isRequired, 
      children: PropTypes.node
    };
    render() {
      const { root = '', components, children } = this.props;

      return <Link className="list-group-item" to={`${root}/${components.map(encodeURIComponent).join('/')}`}>
        {children}
      </Link>;
    }
}