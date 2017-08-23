import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { grabLyrics } from '../../redux/actions/lyrics';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';
import Image from 'react-bootstrap/lib/Image';
import { connect } from 'react-redux';
import Frame from './Frame';
import Alert from 'react-bootstrap/lib/Alert';
import CustomTypes from '../custom-types';

export default connect(state => state.lyrics)(class extends Component {
  static propTypes = {
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    grab: CustomTypes.apiCall.isRequired,
    links: PropTypes.object
  };
  componentDidMount() {
    this.props.dispatch(grabLyrics(this.props.artist, this.props.title));
  }
  render() {
    const { grab, links } = this.props;

    return (
      <div>
        {grab.error && <Alert bsStyle="danger">{grab.error.message}</Alert>}
        {!(grab.pending || grab.done) && <Alert bsStyle="info">Инициализация</Alert>}
        {grab.pending && <Alert bsStyle="info">Загрузка данных о текстах...</Alert>}
        {grab.done && links && (Object.keys(links).length ?
          <Tabs id="lyrics-tabs">
            {Object.keys(links).map(href => (
              <Tab key={href} eventKey={href}
                title={<span><Image src={links[href].favicon}/> {links[href].artist} - {links[href].title}</span>}>
                <Panel>
                  <Label>Источник</Label>
                  <Button bsStyle="link" href={href} target="_blank">{href}</Button>
                  <Frame src={links[href].proxy} title={`${links[href].artist} - ${links[href].title}`}/>
                </Panel>
              </Tab>
            ))}
          </Tabs>
        : <Alert bsStyle="warning">Тексты не найдены</Alert>)}
      </div>
    );
  }
});
