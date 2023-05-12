import React, { useState } from 'react';

const Filters = ({ onFilter, domainList }) => {
  const [domain, setDomain] = useState('');
  const [gender, setGender] = useState('');
  const [available, setAvailable] = useState('');

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
    onFilter({ domain: event.target.value, gender, available });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    onFilter({ domain, gender: event.target.value, available });
  };

  const handleAvailableChange = (event) => {
    setAvailable(event.target.value);
    onFilter({ domain, gender, available: event.target.value });
  };

  return (
    <div className="filters">
      <select value={domain} onChange={handleDomainChange}>
        <option value="">All domains</option>
        {domainList.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
      <select value={gender} onChange={handleGenderChange}>
        <option value="">All genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select value={available} onChange={handleAvailableChange}>
        <option value="">All availabilities</option>
        <option value="true">Available</option>
        <option value="false">Not available</option>
      </select>
    </div>
  );
};

export default Filters;