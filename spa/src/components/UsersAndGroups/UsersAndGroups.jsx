import React, {Component} from 'react';
import EditableUsers from '../EditableUsers';
import EditableGroups from '../EditableGroups';
import {apiURL} from "../../utils/api";


class UsersAndGroups extends Component {

  constructor(props) {
    super(props);

    this.loadGroupsData = this.loadGroupsData.bind(this);
    this.loadUsersData = this.loadUsersData.bind(this);

    this.groupEditorOpen = this.groupEditorOpen.bind(this);
    this.groupEditorClose = this.groupEditorClose.bind(this);

    this.userEditorOpen = this.userEditorOpen.bind(this);
    this.userEditorClose = this.userEditorClose.bind(this);
    this.usersFilterChange = this.usersFilterChange.bind(this);

    this.state = {
      groupsData: [],
      editedGroupID: null,
      showGroupEditor: false,

      usersData: [],
      editedUserID: null,
      showUserEditor: false,

      onlyActiveUsers: false,
    }
  }

  loadGroupsData() {
    fetch(new URL('groups/', apiURL))
    .then(res => res.json())
    .then((data) => {
      this.setState({ groupsData: data });
    })
    .catch(console.log);
  }

  loadUsersData() {
    let url = new URL('users/', apiURL);
    let params = this.state.onlyActiveUsers ? {state: 'active'}:{};
    url.search = new URLSearchParams(params);

    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ usersData: data })
    })
    .catch(console.log);
  }

  componentDidMount() {
    this.loadGroupsData();
    this.loadUsersData();
  }

  groupEditorOpen(groupID) {
    this.setState({
      editedGroupID: groupID,
      showGroupEditor: true,
    })
  }

  groupEditorClose(withUpdates) {
    this.setState({showGroupEditor: false}, () => {
      if (withUpdates) {
        this.loadGroupsData();
        this.loadUsersData();
      }
    });
  }

  userEditorOpen(userID) {
    this.setState({
      editedUserID: userID,
      showUserEditor: true,
    })
  }

  userEditorClose(withUpdates) {
    this.setState({showUserEditor: false}, () => {
      if (withUpdates) {
        this.loadGroupsData();
        this.loadUsersData();
      }
    });
  }

  usersFilterChange(filterParams) {
    this.setState(filterParams, this.loadUsersData);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-1"/>
          <div className="col-lg-4">
            <center><h2>Users</h2></center>
            <EditableUsers
              usersData={this.state.usersData}
              editorOpen={this.userEditorOpen}
              editorClose={this.userEditorClose}
              showEditor={this.state.showUserEditor}
              editedUserID={this.state.editedUserID}
              onlyActive={this.state.onlyActiveUsers}
              filterChange={this.usersFilterChange}
            />
          </div>
          <div className="col-lg-2"/>
          <div className="col-lg-4">
            <center><h2>Groups</h2></center>
            <EditableGroups
              groupsData={this.state.groupsData}
              editorOpen={this.groupEditorOpen}
              editorClose={this.groupEditorClose}
              editedGroupID={this.state.editedGroupID}
              showEditor={this.state.showGroupEditor}
            />
          </div>
          <div className="col-lg-1"/>
        </div>
      </div>
    )
  }
}


export default UsersAndGroups
