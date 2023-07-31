import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {store} from './redux/store';
import { Provider } from 'react-redux';

import './index.css';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // basename="/mern-app"
    <Provider store={store}>
        <BrowserRouter >
            <App />
            <ToastContainer autoClose={1000} />
        </BrowserRouter>
    </Provider>
    );

