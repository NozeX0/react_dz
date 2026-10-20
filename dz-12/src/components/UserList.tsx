import React, { useEffect, useState } from 'react';
import { UserService } from '../services/userService';

interface UserListProps {
  onSelectUser: (id: number) => void;
  onEditUser: (id: number) => void;
  onCreateNew: () => void;
}

export function UserList({ onSelectUser, onEditUser, onCreateNew }: UserListProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await UserService.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      alert('Користувача успішно видалено (симуляція)');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Завантаження списку користувачів...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Список користувачів</h2>
        <button onClick={onCreateNew} style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Створити користувача
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', cursor: 'pointer', background: '#fff' }}
          >
            <img src={user.image} alt={user.firstName} style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '10px' }} />
            <h3>{user.firstName} {user.lastName}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{user.email}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                onClick={(e) => { e.stopPropagation(); onEditUser(user.id); }}
                style={{ padding: '5px 10px', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Редагувати
              </button>
              <button
                onClick={(e) => handleDelete(user.id, e)}
                style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}