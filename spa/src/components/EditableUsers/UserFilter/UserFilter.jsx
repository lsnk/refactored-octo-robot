import React, {Component} from 'react';


class UserFilter extends Component {

  constructor(props) {
    super(props);

    this.onlyActiveChange = this.onlyActiveChange.bind(this);
  }

  onlyActiveChange() {
    this.props.handler({onlyActiveUsers: !this.props.onlyActive})
  }

  render() {
    return (
      <div className="card input-group bg-info mb-2">
        <center><h5 className="card-title">Filters</h5></center>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="activeFilter" name="active"
                 checked={this.props.onlyActive} onChange={this.onlyActiveChange}
          />
          <label className="form-check-label" htmlFor="activeFilter">Only active users</label>
        </div>
      </div>
    )
  }
}


export default UserFilter
