import React, { Component } from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function connectAsPage(mapStateToProps) {
  const connector = connect(mapStateToProps);

  return Page => connector(class extends Component {
    static propTypes = {
      header: PropTypes.string.isRequired,
      subheader: PropTypes.string,
    };
    render() {
      return (
        <div>
          <PageHeader>{this.props.header} <small>{this.props.subheader}</small></PageHeader>
          <Page {...this.props} />
        </div>
      );
    }
  });
}
