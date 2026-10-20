import React, { useEffect, useState } from 'react';
import { UserService } from '../services/userService';

interface UserProfileProps {
  userId: number;
  onBack: () => void;
}

export function UserProfile({ userId, onBack }: UserProfileProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getUserById(userId)
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Завантаження профілю...</p>;
  if (!user) return <p>Користувача не знайдено</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <button onClick={onBack} style={{ marginBottom: '15px', padding: '5px 10px', cursor: 'pointer' }}>← Назад до списку</button>
      <div style={{ textAlign: 'center' }}>
        <img src={user.image} alt={user.firstName} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <h2>{user.firstName} {user.lastName}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Телефон:</strong> {user.phone}</p>
        <p><strong>Вік:</strong> {user.age}</p>
        <p><strong>Компанія:</strong> {user.company?.name}</p>
      </div>
    </div>
  );
}