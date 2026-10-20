import { useState, useRef } from 'react';
import { useWindowSize } from './hooks/useWindowSize';
import { useFetch } from './hooks/useFetch';
import { useToggle } from './hooks/useToggle';
import { usePrevious } from './hooks/usePrevious';
import { useClickOutside } from './hooks/useClickOutside';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useInterval } from './hooks/useInterval';
import { useForm } from './hooks/useForm';

export function App() {
  const { width, height } = useWindowSize();

  const { data: userData, loading, error } = useFetch<any>('https://dummyjson.com/users/1');

  const [isDarkMode, toggleDarkMode] = useToggle(false);

  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => setIsOpen(false));

  const isOnline = useOnlineStatus();

  const [seconds, setSeconds] = useState(0);
  const [isPaused, togglePause] = useToggle(false);
  useInterval(() => {
    setSeconds((s) => s + 1);
  }, isPaused ? null : 1000);

  const { values, handleChange, resetForm } = useForm({ email: '', message: '' });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000', minHeight: '100vh' }}>
      <h1>Демонстрація кастомних хуків</h1>
      <button onClick={toggleDarkMode} style={{ marginBottom: '20px', padding: '8px 16px' }}>
        Змінити тему ({isDarkMode ? 'Темна' : 'Світла'})
      </button>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>1. useWindowSize</h3>
        <p>Ширина: {width}px | Висота: {height}px</p>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>2. useFetch</h3>
        {loading && <p>Завантаження...</p>}
        {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}
        {userData && <p>Користувач: {userData.firstName} {userData.lastName} ({userData.email})</p>}
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>3. useToggle & 4. usePrevious</h3>
        <p>Поточний лічильник: {count} (Попередній: {prevCount})</p>
        <button onClick={() => setCount(count + 1)} style={{ marginRight: '10px' }}>Збільшити</button>
        <button onClick={toggleDarkMode}>Toggle стан</button>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>5. useClickOutside</h3>
        <button onClick={() => setIsOpen(true)}>Відкрити вікно (Статус: {isOpen ? 'Відкрито' : 'Закрито'})</button>
        {isOpen && (
          <div ref={modalRef} style={{ background: '#ffcccb', padding: '20px', marginTop: '10px', color: '#000', borderRadius: '5px' }}>
            <p>Клікніть за межами цього блоку, щоб закрити його.</p>
          </div>
        )}
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>6. useOnlineStatus</h3>
        <p>Статус мережі: <span style={{ color: isOnline ? 'green' : 'red' }}>{isOnline ? 'Online 🟢' : 'Offline 🔴'}</span></p>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>7. useInterval</h3>
        <p>Секунди: {seconds}</p>
        <button onClick={togglePause}>{isPaused ? 'Відновити' : 'Пауза'}</button>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>8. useForm</h3>
        <form onSubmit={(e) => { e.preventDefault(); alert(JSON.stringify(values)); }}>
          <div style={{ marginBottom: '10px' }}>
            <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} style={{ padding: '6px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="text" name="message" placeholder="Повідомлення" value={values.message} onChange={handleChange} style={{ padding: '6px' }} />
          </div>
          <button type="submit" style={{ marginRight: '10px' }}>Відправити</button>
          <button type="button" onClick={resetForm}>Скинути</button>
        </form>
      </section>
    </div>
  );
}

export default App;