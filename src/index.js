import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'flexboxgrid/css/flexboxgrid.min.css';
import '@blueprintjs/core/dist/blueprint.css';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { addLocaleData, IntlProvider } from 'react-intl'

import en from 'react-intl/locale-data/en';
import pt from 'react-intl/locale-data/pt';

import messages from './messages';

import { flattenMessages } from './utils';

addLocaleData([...en, ...pt]);

let locale =
  (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage
  || 'en-US';

ReactDOM.render(
  <BrowserRouter>
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
      <App />
    </IntlProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker();
