import React, { useState } from 'react';
import { UserList } from './components/UserList';
import { UserProfile } from './components/UserProfile';
import { UserForm } from './components/UserForm';

export function App() {
  const [view, setView] = useState<'list' | 'profile' | 'form'>('list');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleSelectUser = (id: number) => {
    setSelectedUserId(id);
    setView('profile');
  };

  const handleEditUser = (id: number) => {
    setSelectedUserId(id);
    setView('form');
  };

  const handleCreateNew = () => {
    setSelectedUserId(null);
    setView('form');
  };

  const handleBack = () => {
    setSelectedUserId(null);
    setView('list');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Управління користувачами (DummyJSON)</h1>
      <hr style={{ marginBottom: '20px' }} />

      {view === 'list' && (
        <UserList
          onSelectUser={handleSelectUser}
          onEditUser={handleEditUser}
          onCreateNew={handleCreateNew}
        />
      )}

      {view === 'profile' && selectedUserId !== null && (
        <UserProfile userId={selectedUserId} onBack={handleBack} />
      )}

      {view === 'form' && (
        <UserForm userId={selectedUserId} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;