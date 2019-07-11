import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ApiErrorAlert from '../../Common/ApiErrorAlert'
import {handleApiResponse, apiURL} from '../../../utils/api'


class UserEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.loadGroups = this.loadGroups.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.ShowError = this.ShowError.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.handleGroupToggle = this.handleGroupToggle.bind(this);

    this.getTitle = this.getTitle.bind(this);

    this.state = {
      groups: [],

      first_name: '',
      last_name: '',
      email: '',
      isActive: true,
      memberOf: {},

      showError: false,
      errorHeading: '',
      errorMessage: ',',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show === false && this.props.show === true) {
      this.loadUserData(this.props.userID);
      this.loadGroups();
    }
  }

  loadGroups() {
    fetch(new URL('groups/', apiURL))
    .then(res => res.json())
    .then((data) => {
      this.setState({ groups: data })
    })
    .catch(console.log);
  }

  loadUserData(userID) {
    if (userID) {
      fetch(new URL(`users/${userID}/`, apiURL))
        .then(res => res.json())
        .then((data) => {
          this.setState({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            isActive: data.state === 'active',
            memberOf: Object.fromEntries(data.groups_list.map(group => [group.id, group])),
          });
        })
        .catch(console.log);
    }
    else {
      this.setState({
        first_name: '',
        last_name: '',
        email: '',
        isActive: true,
        memberOf: {},
      });
    }
  }

  handleClose(withUpdates) {
    this.setState({showError: false});
    this.props.closeHandler(withUpdates);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  toggleActive(event) {
    this.setState({isActive: event.target.checked});
  }

  handleGroupToggle(group) {
    const copyMemberOf= {...this.state.memberOf};

    if (group.id in copyMemberOf) {
      delete copyMemberOf[group.id];
    }
    else {
      copyMemberOf[group.id] = group;
    }

    this.setState({memberOf: copyMemberOf});
  }

  ShowError(heading, message) {
    this.setState({
      showError: true,
      errorHeading: heading,
      errorMessage: message,
    });
  }

  handleSave() {

    let params = {
      'first_name': this.state.first_name,
      'last_name': this.state.last_name,
      'email': this.state.email,
      'state': this.state.isActive? 'active': 'inactive',
      'groups': Object.keys(this.state.memberOf),
    };

    let method, url;
    if (this.props.userID) {
      method = 'PUT';
      url = new URL(`users/${this.props.userID}/`, apiURL);
    } else {
      method = 'POST';
      url = new URL(`users/`, apiURL);
    }

    fetch(url, {
        method: method,
        body: JSON.stringify(params),
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      return handleApiResponse(
        response,
        () => this.handleClose(true),
        (json)=> {
          this.ShowError('Users API error', JSON.stringify(json));
        });
    })
    .catch(console.log);
  }

  handleDelete() {
      fetch(new URL(`users/${this.props.userID}/`, apiURL),
        {method: 'DELETE'}
      )
    .then(() => this.handleClose(true));
  }

  getTitle() {
    if (this.props.userID) {
      return 'User details (#' + this.props.userID + ')';
    }
    else {
      return 'New user details';
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.handleClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{this.getTitle()}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="firstNameInput">First name</label>
              <input type="text" className="form-control" id="firstNameInput" name="first_name"
                     value={this.state.first_name} onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastNameInput">Last Name</label>
              <input type="text" className="form-control" id="lastNameInput" name="last_name"
                     value={this.state.last_name} onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Email</label>
              <input type="email" className="form-control" id="emailInput" name="email"
                     value={this.state.email} onChange={this.handleChange}
              />
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="stateInput" name="state"
                     checked={this.state.isActive} onChange={this.toggleActive}
              />
              <label className="form-check-label" htmlFor="stateInput">Active</label>
            </div>

            <div className="form-group">
              <label htmlFor="Groups">Groups</label>
              <ul className="list-group" id="Groups">
                {this.state.groups.map((group) => (
                  <button
                    type="button"
                    className={
                    'list-group-item list-group-item-action' + (group.id in this.state.memberOf?' active':'')
                    }
                    onClick={() => this.handleGroupToggle(group)}
                    key={group.id}
                  >
                    {group.name}
                  </button>
                ))}
              </ul>
            </div>

            <ApiErrorAlert
              show={this.state.showError}
              heading={this.state.errorHeading}
              message={this.state.errorMessage}
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          {}
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          { this.props.userID &&
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


export default UserEditor
