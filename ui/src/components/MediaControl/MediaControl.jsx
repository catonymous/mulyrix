import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';
import CustomTypes from '../custom-types';
import { checkMedia } from '../../redux/actions/library';
import { connect } from 'react-redux';

export default connect(state => {
  const { check, library } = state.media;

  return { check, library };
})(class extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    check: CustomTypes.apiCall.isRequired,
    empty: PropTypes.string.isRequired,
    children: PropTypes.node
  };
  componentDidMount() {
    if(!this.props.library) {
      this.props.dispatch(checkMedia());
    }
  }
  render() {
    const { check, library, empty } = this.props;

    return (
      <div>
        {check.error && <Alert bsStyle="danger">{check.error.message}></Alert>}
        {!(check.pending || check.done || library) && <Alert bsStyle="info">Инициализация...</Alert>}
        {check.pending && <Alert bsStyle="info">Загрузка данных медиатеки...</Alert>}
        {library && (Object.keys(library).length ? this.props.children : <Alert bsStyle="warning">{empty}</Alert>)}
      </div>
    );
  }
});
