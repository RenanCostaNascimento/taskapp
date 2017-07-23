import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'flexboxgrid/css/flexboxgrid.min.css';
import '@blueprintjs/core/dist/blueprint.css';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker();
