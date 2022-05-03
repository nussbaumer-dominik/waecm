import 'react-toastify/dist/ReactToastify.css';
import 'react-app-polyfill/ie11';
import 'core-js';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

registerServiceWorker();
