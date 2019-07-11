import React, {Component} from 'react';
import Users from "./Users";
import UserEditor from "./UserEditor";
import UserFilter from "./UserFilter";
import {apiURL} from "../../utils/api";


class EditableUsers extends Component {

  constructor(props) {
    super(props);

    this.filterChangeHandler = this.filterChangeHandler.bind(this);

    this.state = {
      usersData: [],

      editedUserID: null,
      showEditor: false,

      onlyActive: false,
    }
  }

  loadUsersData() {
    let url = new URL('users/', apiURL);
    let params = this.state.onlyActive ? {state: 'active'}:{};
    url.search = new URLSearchParams(params);

    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ usersData: data })
    })
    .catch(console.log);
  }

  componentDidMount() {
    this.loadUsersData();
  }

  filterChangeHandler(filterParams) {
    this.setState(filterParams, this.loadUsersData);
  }

  render () {
    return (
      <div>
        <UserFilter onlyActive={this.state.onlyActive} handler={this.filterChangeHandler}/>
        <Users
          usersData={this.state.usersData}
          clickHandler={(userID) => this.setState({editedUserID: userID, showEditor: true})}
        />
        <UserEditor
          show={this.state.showEditor}
          userID={this.state.editedUserID}
          closeHandler={(withUpdates) => {
            this.setState({showEditor: false});
            if (withUpdates) {
              this.loadUsersData();
            }
          }}
        />
      </div>
    );
  }
}


export default EditableUsers
