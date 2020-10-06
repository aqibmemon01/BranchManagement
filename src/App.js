import React, { Component } from 'react';
import Routers from './Route';
import {Provider} from 'react-redux'
import store from './ReduxStore'
import fire from '../src/Config/fire'


class App extends Component {
  constructor(){
  super();
  // window.addEventListener("beforeunload", (ev) => 
  // {  
  //   fire.auth().signOut().then(function() {
  //     // Sign-out successful.
  //     // alert("LogOut SuccessFull")
  //   }).catch(function(error) {
  //     // An error happened.
  //   });
  //   //   ev.preventDefault();
  //   //  alert("CLOSEEE")
  //   //   return ev.returnValue = 'Are you sure you want to close?';
  // });


  }
  
  render() {
    return (
    <Provider store={store} >
      <Routers />
    </Provider>  
    );
  }
}

export default App;
