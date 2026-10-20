import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductFormData } from './schemas/productSchema';
import { profileSchema, type ProfileFormData } from './schemas/profileSchema';

export function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Помилка авторизації');
      }

      setAuthToken(data.token);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    reset: resetProductForm,
    formState: { errors: productErrors, isSubmitting: isProductSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onAddProduct = async (data: ProductFormData) => {
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Товар успішно додано!');
        resetProductForm();
      } else {
        alert('Помилка при додаванні товару');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfileForm,
    watch,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>();

  const [initialProfile, setInitialProfile] = useState<ProfileFormData | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setProfileLoading(true);
    fetch('https://dummyjson.com/users/1')
      .then((res) => res.json())
      .then((data) => {
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        };
        setInitialProfile(userData);
        resetProfileForm(userData);
      })
      .catch((err) => console.error(err))
      .finally(() => setProfileLoading(false));
  }, [resetProfileForm]);

  const watchedFirstName = watch('firstName');
  const watchedLastName = watch('lastName');
  const watchedEmail = watch('email');

  const hasChanges =
    initialProfile !== null &&
    (watchedFirstName !== initialProfile.firstName ||
      watchedLastName !== initialProfile.lastName ||
      watchedEmail !== initialProfile.email);

  const onUpdateProfile = async (data: ProfileFormData) => {
    setIsUpdating(true);
    try {
      const response = await fetch('https://dummyjson.com/users/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Профіль успішно оновлено!');
        setInitialProfile(data);
      } else {
        alert('Помилка оновлення профілю');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>1. Авторизація (DummyJSON)</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Юзернейм (напр., emilys)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              placeholder="Пароль (напр., emilyspass)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" disabled={authLoading} style={{ padding: '8px 16px' }}>
            {authLoading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>
        {authToken && <p style={{ color: 'green', wordBreak: 'break-all' }}>Токен: {authToken}</p>}
        {authError && <p style={{ color: 'red' }}>{authError}</p>}
      </section>

      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>2. Додавання товару (Zod Валідація)</h2>
        <form onSubmit={handleProductSubmit(onAddProduct)}>
          <div style={{ marginBottom: '10px' }}>
            <input type="text" placeholder="Назва товару" {...registerProduct('title')} style={{ width: '100%', padding: '8px' }} />
            {productErrors.title && <span style={{ color: 'red', fontSize: '12px' }}>{productErrors.title.message}</span>}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="number" step="any" placeholder="Ціна" {...registerProduct('price', { valueAsNumber: true })} style={{ width: '100%', padding: '8px' }} />
            {productErrors.price && <span style={{ color: 'red', fontSize: '12px' }}>{productErrors.price.message}</span>}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="text" placeholder="Категорія" {...registerProduct('category')} style={{ width: '100%', padding: '8px' }} />
            {productErrors.category && <span style={{ color: 'red', fontSize: '12px' }}>{productErrors.category.message}</span>}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <textarea placeholder="Опис товару" {...registerProduct('description')} style={{ width: '100%', padding: '8px' }} />
            {productErrors.description && <span style={{ color: 'red', fontSize: '12px' }}>{productErrors.description.message}</span>}
          </div>
          <button type="submit" disabled={isProductSubmitting} style={{ padding: '8px 16px' }}>
            {isProductSubmitting ? 'Збереження...' : 'Додати товар'}
          </button>
        </form>
      </section>

      <section style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>3. Редагування профілю</h2>
        {profileLoading ? (
          <p>Завантаження даних профілю...</p>
        ) : (
          <form onSubmit={handleProfileSubmit(onUpdateProfile)}>
            <div style={{ marginBottom: '10px' }}>
              <label>Ім'я:</label>
              <input type="text" {...registerProfile('firstName')} style={{ width: '100%', padding: '8px' }} />
              {profileErrors.firstName && <span style={{ color: 'red', fontSize: '12px' }}>{profileErrors.firstName.message}</span>}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Прізвище:</label>
              <input type="text" {...registerProfile('lastName')} style={{ width: '100%', padding: '8px' }} />
              {profileErrors.lastName && <span style={{ color: 'red', fontSize: '12px' }}>{profileErrors.lastName.message}</span>}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Email:</label>
              <input type="email" {...registerProfile('email')} style={{ width: '100%', padding: '8px' }} />
              {profileErrors.email && <span style={{ color: 'red', fontSize: '12px' }}>{profileErrors.email.message}</span>}
            </div>
            <button type="submit" disabled={!hasChanges || isUpdating} style={{ padding: '8px 16px' }}>
              {isUpdating ? 'Збереження...' : 'Зберегти зміни'}
            </button>
            {!hasChanges && <p style={{ fontSize: '12px', color: '#666' }}>Немає змін для збереження</p>}
          </form>
        )}
      </section>

    </div>
  );
}

export default App;