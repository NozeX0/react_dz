import React, { useEffect, useState } from 'react';
import { UserService } from '../services/userService';

interface UserFormProps {
  userId?: number | null;
  onBack: () => void;
}

export function UserForm({ userId, onBack }: UserFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (userId) {
      UserService.getUserById(userId).then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      });
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (userId) {
        await UserService.updateUser(userId, { firstName, lastName, email });
        alert('Користувача успішно оновлено!');
      } else {
        await UserService.createUser({ firstName, lastName, email });
        alert('Користувача успішно створено!');
      }
      onBack();
    } catch (error) {
      console.error(error);
      alert('Помилка збереження');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <button onClick={onBack} style={{ marginBottom: '15px', padding: '5px 10px', cursor: 'pointer' }}>← Назад</button>
      <h2>{userId ? 'Редагувати користувача' : 'Створити нового користувача'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Ім'я:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Прізвище:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" disabled={submitting} style={{ padding: '10px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {submitting ? 'Збереження...' : userId ? 'Зберегти зміни' : 'Створити'}
        </button>
      </form>
    </div>
  );
}