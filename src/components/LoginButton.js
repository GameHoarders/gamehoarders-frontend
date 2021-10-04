import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import './btnstyle.css';
class LoginButton extends React.Component {
  render() {
    const { isAuthenticated, loginWithRedirect } = this.props.auth0;
    return (!isAuthenticated && 
      <button className="custom-btn btn-5" onClick={loginWithRedirect}>Log In</button>
    );
  }
}
export default withAuth0(LoginButton);