import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/configureStore';
import './index.css';
import App from './App';


const {store, history} = configureStore();

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));
