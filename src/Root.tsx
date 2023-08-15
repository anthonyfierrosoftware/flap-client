import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import App from './App';

interface Props {
  store: Store;
}

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
