import React from 'react';

const UserCard = ({ user, isSelected, onSelect, onAddToTeam }) => {
  const handleCardClick = () => {
    onSelect(user);
  };

  const handleAddToTeam = () => {
    onAddToTeam(user);
  };

  return (
    <div className={`user-card ${isSelected ? 'selected' : ''}`} onClick={handleCardClick}>
      <div className="user-card__image">
        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      </div>
      <div className="user-card__details">
        <h3>{user.first_name} {user.last_name}</h3>
        <p>{user.email}</p>
        <p>{user.gender}</p>
        <p>{user.domain}</p>
        {user.available ? (
          <button className='addToteambtn' onClick={handleAddToTeam}>Add to Team</button>
        ) : (
          <p>Not Available</p>
        )}
      </div>
    </div>
  );
};

export default UserCard;