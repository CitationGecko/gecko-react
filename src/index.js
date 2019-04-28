import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App/index';
import registerServiceWorker from './registerServiceWorker';
import { store } from './state/store';
import './data-modules';
import './import-modules';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
