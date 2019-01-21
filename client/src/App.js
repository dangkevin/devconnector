import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import { setCurrentUser } from './actions/authActions';
import { logoutUser } from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import './App.css';
import './components/layout/Navbar'; 


//Check for token
if(localStorage.jwtToken){
  //Set Auth Token Header
  setAuthToken(localStorage.jwtToken);
  //Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user 
  store.dispatch(setCurrentUser(decoded));  


  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser());
    //TODO: Clear current profile
    // Redirect to login
    window.location.href = '/login'; 
  }
}
class App extends Component {
  render() {
    return (
    /*Provider "provides" the store with the state"*/
    <Provider store = { store }>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path = "/" component = {Landing} />
          <div className = "container">
            <Route exact path = "/Login" component = {Login} />
            <Route exact path = "/Register" component = {Register} />
          </div>
          <Footer/>     
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
