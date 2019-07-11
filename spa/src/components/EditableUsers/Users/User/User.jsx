import React, {Component} from 'react';


class User extends Component {

  render () {
    return (
      <div className="card bg-light mb-2" onClick={() => this.props.clickHandler(this.props.data.id)}>
        <div className="card-body">
          <h5 className="card-title">{this.props.data.first_name} {this.props.data.last_name}</h5>
          <h6 className="card-subtitle text-muted">{this.props.data.email}</h6>
          <p className="p-0 m-0"><small className="card-text">{this.props.data.created}</small></p>
          {
            this.props.data.state === 'inactive' &&
            <p className="p-0 m-0 text-danger"><small>{this.props.data.state}</small></p>
          }
        </div>

        <ul className="list-group list-group-flush">
          {this.props.data.groups.map((group) => (
             <li className="list-group-item" key={group.id}>{group.name} </li>
          ))}
        </ul>
      </div>
    )
  }
}


export default User
