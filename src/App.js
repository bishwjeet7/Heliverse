import React, { useState } from 'react';
import UserList from './components/UserList';
import SelectTeam from './components/SelectTeam';
import './App.css';


const App = () => {
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleDomainSelect = domain => {
    setSelectedDomain(domain);
  };

  return (
    <div className="App">
      <h1>Heliverse User Directory</h1>
      {/* <SelectTeam onSelect={handleDomainSelect} /> */}
      <UserList selectedDomain={selectedDomain} />
    </div>
  );
};

export default App;