import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './components/App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import './monkey-patches';

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter basename="ui">
     <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
