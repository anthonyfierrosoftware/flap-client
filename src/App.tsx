import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useDispatch, useSelector } from 'react-redux';
import { apiInfoSelector } from './selectors/flap';
import { getFlapApiInfo } from './actions/apiInfo';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Schools from './pages/Schools';

import './App.sass';

const App = () => {
  const dispatch = useDispatch();
  const apiInfo = useSelector(apiInfoSelector);

  useEffect(() => {
    dispatch(getFlapApiInfo());
  }, []);

  return (
    <Router>
      <div className="app">
        <ul className="navigator">
          <li>
            <Link to="/">Home</Link>
          </li>
          {apiInfo &&
            !apiInfo.loading &&
            apiInfo.data &&
            Object.values(apiInfo.data).length && (
              <li>
                <Link to="/schools">Schools</Link>
              </li>
            )}
        </ul>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {apiInfo &&
            !apiInfo.loading &&
            apiInfo.data &&
            Object.values(apiInfo.data).length && (
              <Route path="/schools" element={<Schools />}></Route>
            )}
        </Routes>
      </div>
    </Router>
  );
};

export default hot(module)(App);
