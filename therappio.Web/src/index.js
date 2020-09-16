import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './_reducers';
import 'antd/dist/antd.css';
import App from './components/App';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
