import { useState } from 'react';
import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  comment: z.string()
    .min(5, 'Коментар має містити мінімум 5 символів')
    .optional()
    .or(z.literal('')),
});

export const ReviewForm = () => {
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = reviewSchema.safeParse({ rating, comment });

    if (!result.success) {
      const commentErr = result.error.issues.find((err: any) => err.path[0] === 'comment');
      setError(commentErr ? commentErr.message : '');
    } else {
      setError('');
      alert('Відгук успішно надіслано!');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>3. Форма оцінювання</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Оцінка (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{ padding: '6px', width: '100px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <textarea
            placeholder="Коментар (необов'язково, мін. 5 символів)..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (error) setError('');
            }}
            style={{ padding: '6px', width: '250px', height: '60px' }}
          />
          {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '6px 12px' }}>Надіслати</button>
      </form>
    </div>
  );
};