import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import Filters from './Filters';
import Pagination from './Pagination';
import usersData from '../data/heliverse_mock_data.json';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const domainList = [...new Set(users.map(user => user.domain))];

  useEffect(() => {
    setUsers(usersData);
  }, []);

  // Filter users
  const filteredUsers = users.filter(user => {
    let matchesSearch = true;

    if (searchQuery) {
      matchesSearch =
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    let matchesFilters = true;
    if (filters.domain) {
  matchesFilters = matchesFilters && user.domain === filters.domain;
}
    if (filters.gender) {
      matchesFilters = matchesFilters && user.gender === filters.gender;
    }

    if (filters.available !== '') {
      matchesFilters = matchesFilters && user.available === (filters.available === 'true');
    }

    return matchesSearch && matchesFilters;
  });

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleUserClick = user => {
    if (!user.available) {
      return;
    }

    if (selectedUsers.some(selectedUser => selectedUser.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.id !== user.id));
      setSelectedDomains(selectedDomains.filter(domain => domain !== user.domain));
    } else {
      setSelectedUsers([...selectedUsers, user]);
      setSelectedDomains([...new Set([...selectedDomains, user.domain])]);
    }
  };

  const handleAddToTeam = user => {
    if (!user.available) {
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
    setSelectedDomains([...new Set([...selectedDomains, user.domain])]);

    setTeamMembers(prevTeamMembers => {
      const newTeamMember = `${user.first_name} ${user.last_name}`;

      const updatedTeamIndex = prevTeamMembers.findIndex(team => team.name === 'My Team');
      if (updatedTeamIndex === -1) {
        return [...prevTeamMembers, { name: 'My Team', members: [newTeamMember] }];
      }

      const updatedTeamMembers = [...prevTeamMembers];
      updatedTeamMembers[updatedTeamIndex].members.push(newTeamMember);
      return updatedTeamMembers;
    });
  };

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <Filters onFilter={setFilters} domainList={domainList} />
      <div className="user-list">
        {currentUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            isSelected={selectedUsers.some(selectedUser => selectedUser.id === user.id)}
            onSelect={handleUserClick}
            onAddToTeam={handleAddToTeam}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={usersPerPage}
        totalItems={filteredUsers.length}
        currentPage={currentPage}
        onPageChange={paginate}
      />
      {selectedUsers.length > 0 && selectedDomains.length === selectedUsers.length && (
        <div className="team-details">
          <h2>Team Details</h2>
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
            <h3>My Team:</h3>
            <ul>
              {teamMembers.length > 0 ? (
                teamMembers.map(team => (
                  <li key={team.name}>
                    {team.name}: {team.members.join(', ')}
                  </li>
                ))
              ) : (
                <li>No team members selected yet.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
