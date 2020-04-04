import React from 'react';
import { UserProfile , removeUserSession } from './Utils/Common';




function Dashboard(props) {
  const user = UserProfile.getName();
  

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      Welcome  {user}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
    
  );
}

export default Dashboard;
