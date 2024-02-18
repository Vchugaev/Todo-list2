import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom';
import '@radix-ui/themes/styles.css';
// import './assets/style/global.css'
import './output.css'
import { Theme } from '@radix-ui/themes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Theme>
    <Router>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </Router>
  </Theme>
);

reportWebVitals();
