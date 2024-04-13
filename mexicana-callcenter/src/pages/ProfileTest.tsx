import React from 'react';
import { useAuth } from '../components/authContext';
import authProvider from '../authProvider';

const ProfileComponent = () => {
  const { jobLevel } = useAuth();

  const handleLogout = () => {
    authProvider.logOut();
  };

  return (
    <div>
      {jobLevel === 'Supervisor' ? (
        <div>Supervisor Content</div>
      ) : (
        <><div>Agent Content</div><button onClick={handleLogout}> LOG OUT</button></> // to test logout functionality
      )}
    </div>
  );
};

export default ProfileComponent;
