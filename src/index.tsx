import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App'; //todo: notice how we can change the location of our root component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

