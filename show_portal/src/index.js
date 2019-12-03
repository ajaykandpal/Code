import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';



ReactDOM.render(

<Router>
  <Route component={App} />
  </Router>,
  document.getElementById("root")
    
);

  




