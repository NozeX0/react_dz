import { useState, useEffect } from 'react';

export const StorageInput = () => {
  const [text, setText] = useState(() => {
    return localStorage.getItem('user_text') || '';
  });

  useEffect(() => {
    localStorage.setItem('user_text', text);
  }, [text]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>Збереження у LocalStorage</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введіть текст..."
        style={{ padding: '6px', width: '250px' }}
      />
      <p>Збережений текст: {text}</p>
    </div>
  );
};