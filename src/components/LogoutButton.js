import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import './btnstyle.css';
class LogoutButton extends React.Component {
  render() {
    const { isAuthenticated, logout } = this.props.auth0;
    return (isAuthenticated && 
      <button className="custom-btn btn-5" onClick={() => {
        logout({ returnTo: window.location.origin });
   }}>Log Out</button>)
    ;
  }
}
export default withAuth0(LogoutButton);