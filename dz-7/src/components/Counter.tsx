import { useState, useEffect } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Лічильник: ${count}`;
  }, [count]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>Лічильник</h3>
      <p>Значення: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Збільшити</button>
    </div>
  );
};