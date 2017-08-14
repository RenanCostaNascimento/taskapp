import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css/normalize.css';
import 'flexboxgrid/css/flexboxgrid.min.css';
import '@blueprintjs/core/dist/blueprint.css';
import './styles/index.css';

import { addLocaleData, IntlProvider } from 'react-intl'
import en from 'react-intl/locale-data/en';
import pt from 'react-intl/locale-data/pt';
import messages from './messages';
import { flattenMessages } from './utils';

addLocaleData([...en, ...pt]);
let supportedLocales = ['en-US', 'pt-BR'];
let userLocale =
  (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage;

userLocale = supportedLocales.find((locale) => {
  return userLocale === locale;
}) || 'en-US';

ReactDOM.render(
  <BrowserRouter>
    <IntlProvider locale={userLocale} messages={flattenMessages(messages[userLocale])}>
      <App />
    </IntlProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker();
