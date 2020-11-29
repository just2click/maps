import React from 'react';
import { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './assets/styles/global.scss';
import { HomePage }  from './pages/HomePage';
import  { MapPage }  from './pages/MapPage';
import Header from './components/Header';

const history = createBrowserHistory();
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <Router history={history}>
            <Switch>
              <Route component={ HomePage } path='/' exact></Route>
              <Route component={ MapPage } path='/map'></Route>
            </Switch>
        </Router>
      </React.Fragment>
    );
  }
}