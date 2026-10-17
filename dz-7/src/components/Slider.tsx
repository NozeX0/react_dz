import { useState, useEffect } from 'react';

const slides = [
  "Слайд номер 1",
  "Слайд номер 2",
  "Слайд номер 3"
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px', width: '280px' }}>
      <h3>Автоматичний слайдер</h3>
      <div style={{ padding: '15px 0', fontWeight: 'bold' }}>
        {slides[currentIndex]}
      </div>
      <small>Слайд {currentIndex + 1} з {slides.length}</small>
    </div>
  );
};