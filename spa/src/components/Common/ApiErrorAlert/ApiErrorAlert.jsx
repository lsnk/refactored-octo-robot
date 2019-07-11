import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';


class ApiErrorAlert extends Component {
  render() {
    return (
      <Alert show={this.props.show} variant="danger">
        <Alert.Heading>{this.props.heading}</Alert.Heading>
        <p>{this.props.message}</p>
      </Alert>
    );
  }
}


export default ApiErrorAlert
