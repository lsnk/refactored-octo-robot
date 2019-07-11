import React, {Component} from 'react';
import EditableUsers from './components/EditableUsers';
import EditableGroups from './components/EditableGroups';


class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-1"/>
          <div className="col-lg-4">
            <center><h2>Users</h2></center>
            <EditableUsers/>
          </div>
          <div className="col-lg-2"/>
          <div className="col-lg-4">
            <center><h2>Groups</h2></center>
            <EditableGroups/>
          </div>
          <div className="col-lg-1"/>
        </div>
      </div>
    )
  }
}

export default App;
