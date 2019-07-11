import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ApiErrorAlert from '../../Common/ApiErrorAlert'
import {apiURL} from "../../../utils/api";


class GroupEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.loadUsers = this.loadUsers.bind(this);
    this.loadGroupData = this.loadGroupData.bind(this);
    this.ShowError = this.ShowError.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUserToggle = this.handleUserToggle.bind(this);

    this.getTitle = this.getTitle.bind(this);

    this.state = {
      users: [],

      name: '',
      members: {},

      showError: false,
      errorHeading: '',
      errorMessage: ',',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show === false && this.props.show === true) {
      this.loadGroupData(this.props.groupID);
      this.loadUsers();
    }
  }

  loadUsers() {
    fetch(new URL('users/', apiURL))
    .then(res => res.json())
    .then((data) => {
      this.setState({ users: data })
    })
    .catch(console.log);
  }

  loadGroupData(groupID) {
    if (groupID) {
      fetch(new URL(`groups/${groupID}/`, apiURL))
      .then(res => res.json())
      .then((data) => {
        this.setState({
          name: data.name,
          members: Object.fromEntries(data.members_list.map(member => [member.id, member])),
        });
      })
      .catch(console.log);
    }
    else {
      this.setState({name: '', members: {}});
    }
  }

  handleClose(withUpdates) {
    this.setState({showError: false});
    this.props.closeHandler(withUpdates);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  ShowError(heading, message) {
    this.setState({
      showError: true,
      errorHeading: heading,
      errorMessage: message,
    });
  }

  handleUserToggle(user) {

    const copyMembers= {...this.state.members};

    if (user.id in copyMembers) {
      delete copyMembers[user.id];
    }
    else {
      copyMembers[user.id] = user;
    }

    this.setState({members: copyMembers});
  }

  handleSave() {
    let method, url;
    if (this.props.groupID) {
      method = 'PUT';
      url = new URL(`groups/${this.props.groupID}/`, apiURL);
    } else {
      method = 'POST';
      url = new URL('groups/', apiURL);
    }

    fetch(url, {
      method: method,
      body: JSON.stringify({
        'name': this.state.name,
        'members': Object.keys(this.state.members),
      }),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if (response.ok) {
        return response.json().then(() => {
          this.handleClose(true);
        });
      }
      else {
        return response.json().then(
          json => {
            this.ShowError(
              'Groups API error',
              JSON.stringify(json),
            );
          }
        )
      }
    })
    .catch(console.log);
  }

  handleDelete() {
    fetch(new URL(`groups/${this.props.groupID}/`, apiURL), {
      method: 'DELETE',
    })
    .then(() => this.handleClose(true));
  }

  getTitle() {
    if (this.props.groupID) {
      return 'Group details (#' + this.props.groupID + ')'
    }
    else {
      return 'New group details'
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.handleClose(false)}>
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
                type="button"
                className={
                'list-group-item list-group-item-action' + (user.id in this.state.members?' active':'')
                }
                onClick={() => this.handleUserToggle(user)}
                key={user.id}
              >
                {user.first_name} {user.last_name}
              </button>
            ))}
          </ul>
          <div className="mt-3"/>

          <ApiErrorAlert
            show={this.state.showError}
            heading={this.state.errorHeading}
            message={this.state.errorMessage}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          {
            this.props.groupID &&
            <Button variant="danger" onClick={this.handleDelete}>
              Delete
            </Button>
          }
          <Button variant="secondary" onClick={() => this.handleClose(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default GroupEditor
