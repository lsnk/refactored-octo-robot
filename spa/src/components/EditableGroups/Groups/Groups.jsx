import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Group from './Group'


class Groups extends Component {

  render () {
    return (
      <div>
        <div>
          {this.props.groupsData.map((groupData) => (
            <Group key={groupData.id} data={groupData} clickHandler={this.props.clickHandler}/>
          ))}
        </div>
        <Button variant="primary" onClick={() => this.props.clickHandler(null)}>
          New Group
        </Button>
      </div>
    );
  }
}


export default Groups
