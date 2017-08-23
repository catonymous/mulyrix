import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTypes from '../custom-types';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import { scanMedia } from '../../redux/actions/library';

export default connect(state => {
  const { scan } = state.media;
  return { scan };
})(class extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    scan: CustomTypes.apiCall.isRequired
  };
  render() {
    const { dispatch, scan } = this.props;

    return (
      <Panel>
        {scan.pending && <Alert bsStyle="info">Сканирование данных медиатеки...</Alert>}
        {scan.error && <Alert bsStyle="danger">{scan.error.message}</Alert>}
        {scan.done && !(scan.error || scan.pending)
          && <Alert bsStyle="success">Сканирование завершено</Alert>}
        {!scan.pending && <Button onClick={() => dispatch(scanMedia())}>Запустить сканирование</Button>}
      </Panel>
    );
  }
});
