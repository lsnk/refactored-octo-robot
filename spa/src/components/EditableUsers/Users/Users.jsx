import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import User from './User'


class Users extends Component {

  render () {
    return (
      <div>
        <div>
          {this.props.usersData.map((userData) => (
            <User key={userData.id} data={userData} clickHandler={this.props.clickHandler}/>
          ))}
        </div>
        <Button variant="primary" onClick={() => this.props.clickHandler(null)}>
            New User
        </Button>
      </div>
    );
  }
}


export default Users
