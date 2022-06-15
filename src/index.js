import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss'
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
            <App />
      </Provider>
  </React.StrictMode>
);

console.log('     _     _    _              _      _     \n' +
    '  _ | |___| |__| |___  __ __ _| |  __| |___ \n' +
    ' | || / _ \\ \'_ \\ / _ \\/ _/ _` | |_/ _` / -_)\n' +
    '  \\__/\\___/_.__/_\\___/\\__\\__,_|_(_)__,_\\___|\n' +
    '                                            ')

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
