import React, {Component} from 'react';
import Groups from "./Groups";
import GroupEditor from "./GroupEditor";
import {apiURL} from "../../utils/api";


class EditableGroups extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groupsData: [],

      editedGroupID: null,
      showEditor: false,
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

  componentDidMount() {
    this.loadGroupsData();
  }

  render () {
    return (
      <div>
        <Groups
          groupsData={this.state.groupsData}
          clickHandler={(groupID) => this.setState({editedGroupID: groupID, showEditor: true})}
        />
        <GroupEditor
          show={this.state.showEditor}
          groupID={this.state.editedGroupID}
          closeHandler={(withUpdates) => {
            this.setState({showEditor: false});
            if (withUpdates) {
              this.loadGroupsData();
            }
          }}
        />
      </div>
    );
  }
}


export default EditableGroups
