import React from 'react';
import ReactDOM from 'react-dom';
import App from './core';
//import * as ServiceWorker from './serviceWorker';
import 'data-modules';
import 'import-modules';
import 'export-modules';

ReactDOM.render(<App />, document.getElementById('root'));
//ServiceWorker.register();
