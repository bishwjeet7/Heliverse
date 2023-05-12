import React, { useState } from 'react';

const TeamDetails = ({ selectedUsers, selectedDomains }) => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  const handleCreateTeam = () => {
    const newTeam = {
      name: teamName,
      members: selectedUsers.map(user => `${user.first_name} ${user.last_name}`)
    };

    setTeamMembers([...teamMembers, newTeam]);
    setTeamName('');
  };

  return (
    <div className="team-details">
      <h2>Team Details</h2>
      {selectedUsers.length > 0 && selectedDomains.length === selectedUsers.length ? (
        <>
          <div>
            <h3>Selected Users:</h3>
            <ul>
              {selectedUsers.map(user => (
                <li key={user.id}>{user.first_name} {user.last_name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Selected Domains:</h3>
            <ul>
              {selectedDomains.map(domain => (
                <li key={domain}>{domain}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Create Team:</h3>
            <div>
              <input type="text" placeholder="Enter team name" value={teamName} onChange={e => setTeamName(e.target.value)} />
              <button onClick={handleCreateTeam}>Create</button>
            </div>
          </div>
        </>
      ) : (
        <p>Please select users from unique domains to create a team.</p>
      )}
      {teamMembers.length > 0 && (
        <div>
          <h3>My Teams:</h3>
          <ul>
            {teamMembers.map((team, index) => (
              <li key={index}>
                <strong>{team.name}:</strong> {team.members.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;