import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import './App.css'
import {createStore} from "./app/store/createStore";
import {Provider} from "react-redux";
import history from "./app/utils/history";
import {Router} from "react-router-dom";

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router history={history}>
         <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
         </React.StrictMode>
    </Router>
);
