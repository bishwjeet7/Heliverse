import React, { useState } from 'react';
import UserCard from './UserCard';
import usersData from '../data/heliverse_mock_data.json';

const Team = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserClick = user => {
    if (!user.available || selectedUsers.some(selectedUser => selectedUser.domain !== user.domain)) {
      return;
    }

    if (selectedUsers.some(selectedUser => selectedUser.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const domains = [...new Set(usersData.map(user => user.domain))];
  const availableUsers = usersData.filter(user => user.available);

  return (
    <div className="team">
      <h2>Select team members by domain</h2>
      <div className="domain-list">
        {domains.map(domain => (
          <button key={domain} onClick={() => setSelectedUsers(availableUsers.filter(user => user.domain === domain))}>
            {domain}
          </button>
        ))}
      </div>
      <div className="user-list">
        {availableUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            isSelected={selectedUsers.some(selectedUser => selectedUser.id === user.id)}
            onClick={() => handleUserClick(user)}
          />
        ))}
      </div>
      <div className="team-members">
        <h3>Team members:</h3>
        <ul>
          {selectedUsers.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Team;