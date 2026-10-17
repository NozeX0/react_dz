import { useRef, useEffect } from 'react';

export const FocusInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>Автоматичний фокус</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="Цей інпут у фокусі одразу"
        style={{ padding: '6px', width: '250px' }}
      />
    </div>
  );
};