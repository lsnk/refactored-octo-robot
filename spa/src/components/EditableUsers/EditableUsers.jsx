import React, {Component} from 'react';
import Users from "./Users";
import UserEditor from "./UserEditor";
import UserFilter from "./UserFilter";


class EditableUsers extends Component {

  render () {
    return (
      <div>
        <UserFilter onlyActive={this.props.onlyActive} handler={this.props.filterChange}/>
        <Users
          usersData={this.props.usersData}
          clickHandler={this.props.editorOpen}
        />
        <UserEditor
          show={this.props.showEditor}
          userID={this.props.editedUserID}
          closeHandler={(withUpdates) => {
            this.props.editorClose(withUpdates);
          }}
        />
      </div>
    );
  }
}


export default EditableUsers
