import React from "react";
import Login from '../components/Login';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";

export const HomePage = () => {
  let history = useHistory();

  return (
    <React.Fragment>
        <Login history={history}/>
      </React.Fragment>
    );
  };

