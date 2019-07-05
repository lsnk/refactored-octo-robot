import React, { Component } from 'react';
import Users from './components/users';
import Groups from "./components/groups";

class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">

          <div className="col-lg-1"/>

          <div className="col-lg-4">
            <center><h2>Users</h2></center>
            <Users/>
          </div>

          <div className="col-lg-2"/>

          <div className="col-lg-4">
            <center><h2>Groups</h2></center>
            <Groups/>
          </div>

          <div className="col-lg-1"/>
        </div>
      </div>
    )
  }
}

export default App;
