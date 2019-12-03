import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import './App.css';
import Login from "./Components/Login";
import PolicyList from "./Components/PolicyList";


class App extends Component {
	
  render() {
  	
    return (
<span> 
<Route path="/login" component={Login} />
<Route path="/PolicyList" component={PolicyList}/>
<Route path="/PolicyList/docs" component={PolicyList}/>

</span> 
  ); 
  }
}

export default App;
