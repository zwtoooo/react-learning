import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import './index.css';
import ROUTES from './AppRoutes';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './eleRedux';

ReactDOM.render((<Provider store={store}><BrowserRouter>
  {/* kick it all off with the root route */}
  {renderRoutes(ROUTES)}
</BrowserRouter></Provider>), document.getElementById('root'));
registerServiceWorker();
