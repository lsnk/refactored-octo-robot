import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class GroupEditor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUserToggle = this.handleUserToggle.bind(this);

    this.loadData = this.loadData.bind(this);
    this.getTitle = this.getTitle.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      show: false,
      name: '',
      members: {},
      users: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8787/api/v1/users/?format=json')
    .then(res => res.json())
    .then((data) => {
      this.setState({ users: data })
    })
    .catch(console.log);
  }

  loadData() {
    fetch(`http://localhost:8787/api/v1/groups/${this.props.group_id}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ name: data.name });
      this.setState({ members: Object.fromEntries( data.members_list.map( member => [member.id, member] )) })
    })
    .catch(console.log);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    if (this.props.group_id) {
      this.loadData();
    }
    this.setState({ show: true });
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleUserToggle(user) {
    if (user.id in this.state.members) {
      delete  this.state.members[user.id];
    }
    else {
      this.state.members[user.id] = user;
    }

    this.forceUpdate()
  }

  handleSave() {
    let method, url;
    if (this.props.group_id) {
      method = 'PUT';
      url = `http://localhost:8787/api/v1/groups/${this.props.group_id}`;
    } else {
      method = 'POST';
      url = 'http://localhost:8787/api/v1/groups/';
    }

    fetch(url, {
        method: method,
        body: JSON.stringify({
          'name': this.state.name,
          'members': Object.keys(this.state.members),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {this.props.reloadAction(); this.handleClose()});
  }

  handleDelete() {
        fetch(`http://localhost:8787/api/v1/groups/${this.props.group_id}`, {
        method: 'DELETE',
    })
    .then(response => {this.props.reloadAction(); this.handleClose()});
  }

  getTitle() {
    if (this.props.group_id) {
      return 'Group details (#' + this.props.group_id + ')'
    }
    else {
      return 'New group details'
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.getTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="NameInput">Name</label>
          <input type="text" className="form-control" id="NameInput" value={this.state.name} onChange={this.handleNameChange}/>
          <div className="mt-3"/>
          <label htmlFor="Members">Members</label>
          <ul className="list-group" id="Members">
            {this.state.users.map((user) => (
              <button
                className={
                'list-group-item list-group-item-action' + (user.id in this.state.members?' active':'')
                }
                onClick={() => this.handleUserToggle(user)}
              >
                {user.first_name} {user.last_name}
              </button>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          {}
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          { this.props.group_id &&
            <Button variant="danger" onClick={this.handleDelete}>
              Delete
            </Button>
          }
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


class Group extends Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.state.data = props.data;
  }

  componentWillReceiveProps(props) {
    this.setState({data: props.data})
  }


  render () {
    return (
      <div>
        <div>
          <div className="card bg-light" onClick={() => this.editor.current.handleShow()}>
            <div className="card-body">
              <h5 className="card-title">{this.state.data.name}</h5>
              <h6 className="card-subtitle text-muted">{this.state.data.total_members} members</h6>
            </div>
          </div>
          <div className="mt-3"/>
        </div>
        <GroupEditor ref={this.editor} group_id={this.state.data.id} key={this.state.data.id} reloadAction={this.props.reloadAction} />
      </div>
    )
  }

}


class Groups extends Component {

    state = {
      groups: []
    };

    constructor(props) {
      super(props);

      this.newGroupEditor = React.createRef();

      this.loadData = this.loadData.bind(this);
      this.reloadAction = this.reloadAction.bind(this);
    }

    reloadAction() {
      this.loadData();
    }

    loadData() {
      console.log(this.state.groups);
      fetch('http://localhost:8787/api/v1/groups/')
      .then(res => res.json())
      .then((data) => {
        this.setState({ groups: data });
      })
      .catch(console.log);
    }

    componentDidMount() {
      this.loadData();
    }

    render () {
      return (
        <div>
          <div>
            {this.state.groups.map((group_data) => (
              <Group key={group_data.id} data={group_data} reloadAction={this.reloadAction}/>
            ))}
          </div>
          <GroupEditor ref={this.newGroupEditor} reloadAction={this.reloadAction}/>
          <Button variant="primary" onClick={() => this.newGroupEditor.current.handleShow()}>
              New Group
          </Button>
        </div>
      );
  }
}


export default Groups
