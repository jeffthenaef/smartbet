import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

// refactor modern business for components
import './assets/styles/normalize.css';
import './assets/styles/common.module.sass';
import './assets/styles/modern-business.css';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import store from './store';

// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     collapseGroups: true,
//     include: [/.*/],
//     exclude: [/^Link/, /^Route/, /^BrowserRouter/, /^SafeAnchor/],
//   });
// }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
