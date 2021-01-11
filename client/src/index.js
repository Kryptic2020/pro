import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './store/reducers';
//dev only, axios helpers!
import axios from 'axios'; //dev test
//import './fonts/DancingScript-Regular.ttf';
window.axios = axios; //dev test


const composeEnhancers =
  process.env.NODE_ENV === 'development'
  	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  	: null || compose;


const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));


ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
//console.log('STRIPE KEYS IS', process.env.REACT_APP_STRIPE_KEY);
//console.log('Environment is', process.env.NODE_ENV);