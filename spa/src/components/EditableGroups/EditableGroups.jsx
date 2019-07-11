import React, {Component} from 'react';
import Groups from "./Groups";
import GroupEditor from "./GroupEditor";


class EditableGroups extends Component {

  render () {
    return (
      <div>
        <Groups
          groupsData={this.props.groupsData}
          clickHandler={this.props.editorOpen}
        />
        <GroupEditor
          show={this.props.showEditor}
          groupID={this.props.editedGroupID}
          closeHandler={(withUpdates) => {
            this.props.editorClose(withUpdates);
          }}
        />
      </div>
    );
  }
}


export default EditableGroups
