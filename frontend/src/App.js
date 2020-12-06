import React from 'react';
import { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore } from "redux";
import { Provider } from 'react-redux'
import rootReducer from "./reducers";

import './assets/styles/global.scss';
import { HomePage }  from './pages/HomePage';
import  { MapPage }  from './pages/MapPage';
import Header from './components/Header';

const history = createBrowserHistory();
const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <Provider store={store}>
          <Router history={history}>
              <Switch>
                <Route component={ HomePage } path='/' exact></Route>
                <Route component={ MapPage } path='/map'></Route>
              </Switch>
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}