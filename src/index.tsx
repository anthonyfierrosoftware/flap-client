import React from 'react';
import ReactDOM from 'react-dom/client';
import { setConfig } from 'react-hot-loader';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Root from './Root';
import rootReducer from './reducers/rootReducer';

const enhancements = [applyMiddleware(thunk)];

const storeEnhancer = composeWithDevTools(...enhancements);
const store = createStore(rootReducer, storeEnhancer);

const appElement = document.getElementById('app');

const root = ReactDOM.createRoot(appElement);

root.render(<Root store={store} />);

setConfig({
  ignoreSFC: true,
  pureRender: true,
});
