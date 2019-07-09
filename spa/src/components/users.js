import React, { Component } from 'react';


class User extends Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state.data = props.data
  }

  render () {
    return (
      <div>
        <div className="card bg-light">
          <div className="card-body">
            <h5 className="card-title">{this.state.data.first_name} {this.state.data.last_name}</h5>
            <h6 className="card-subtitle text-muted">{this.state.data.email}</h6>
            <p className="p-0 m-0"><small className="card-text">{this.state.data.created}</small></p>
            {
              this.state.data.state === 'inactive' &&
              <p className="p-0 m-0 text-danger"><small>{this.state.data.state}</small></p>
            }
          </div>

          <ul className="list-group list-group-flush">
            {this.state.data.groups.map((group) => (
               <li className="list-group-item">{group}</li>
            ))}
          </ul>

          </div>

        <div className="mt-3"/>
      </div>
    )
  }

}


class Users extends Component {

    state = {
      users: []
    };

    componentDidMount() {
      fetch('http://localhost:8787/api/v1/users/?format=json')
      .then(res => res.json())
      .then((data) => {
        this.setState({ users: data })
      })
      .catch(console.log);
    }

    render () {
      return (
        <div>
          {this.state.users.map((user_data) => (
            <User key={user_data.id} data={user_data}/>
          ))}
        </div>
      );
  }
}


export default Users
