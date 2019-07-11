import React, {Component} from 'react';


class Group extends Component {

  render () {
    return (
      <div className="card bg-light mb-2" onClick={() => this.props.clickHandler(this.props.data.id)}>
        <div className="card-body">
          <h5 className="card-title">{this.props.data.name}</h5>
          <h6 className="card-subtitle text-muted">{this.props.data.total_members} members</h6>
        </div>
      </div>
    )
  }
}

export default Group
