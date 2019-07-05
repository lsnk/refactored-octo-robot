import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class GroupEditor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.loadData = this.loadData.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      show: false,
      group_id: props.group_id,
      name: null,
      members: []
    };
  }

  loadData() {
    fetch(`http://localhost:8787/api/v1/groups/${this.state.group_id}?format=json`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ name: data.name });
      this.setState({ members: data.members_list })
    })
    .catch(console.log);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.loadData();
    this.setState({ show: true });
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Group details (#{this.state.group_id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="NameInput">Name</label>
          <input type="text" className="form-control" id="NameInput" value={this.state.name} onChange={this.handleNameChange}/>
          <div className="mt-3"/>
          <label htmlFor="Members">Members</label>
          <ul className="list-group" id="Members">
            {this.state.members.map((member) => (
              <li className="list-group-item">
                {member.first_name} {member.last_name}
                <button type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose}>
            Save
          </Button>
          <Button variant="danger" onClick={this.handleClose}>
            Delete
          </Button>
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
        <GroupEditor ref={this.editor} group_id={this.state.data.id} />
      </div>
    )
  }

}


class Groups extends Component {

    state = {
      groups: []
    };

    componentDidMount() {
      fetch('http://localhost:8787/api/v1/groups/?format=json')
      .then(res => res.json())
      .then((data) => {
        this.setState({ groups: data })
      })
      .catch(console.log);
    }

    render () {
      return (
        <div>
          {this.state.groups.map((group_data) => (
            <Group data={group_data}/>
          ))}
        </div>
      );
  }
}


export default Groups
