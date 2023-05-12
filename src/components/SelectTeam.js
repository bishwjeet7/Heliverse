import React from 'react';

const SelectTeam = ({ onSelect }) => {
  const teams = [
    'Sales',
    'Finance',
    'Marketing',
    'IT',
    'Management',
    'UI Designing',
    'Business Development'
  ];

  return (
    <div className="team">
      <h2>Select team members by domain</h2>
      <div className="domain-list">
        {teams.map(team => (
          <button key={team} onClick={() => onSelect(team)}>
            {team}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectTeam;