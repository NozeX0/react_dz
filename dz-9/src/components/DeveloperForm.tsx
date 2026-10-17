import { useState } from 'react';
import { z } from 'zod';

const developerSchema = z.object({
  name: z.string().min(2, "Ім'я занадто коротке"),
  age: z.coerce
    .number()
    .min(18, 'Мінімальний вік — 18 років')
    .max(65, 'Максимальний вік — 65 років'),
  programmingLanguage: z.enum(['JavaScript', 'TypeScript', 'Python', 'C#'], {
    message: 'Оберіть мову програмування зі списку',
  }),
});

export const DeveloperForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = developerSchema.safeParse({ name, age, programmingLanguage: language });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err: any) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      alert('Профіль розробника успішно збережено!');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>2. Профіль розробника</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Ім'я"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
            }}
            style={{ padding: '6px', width: '250px' }}
          />
          {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
        </div>
        <div style={{ marginTop: '10px' }}>
          <input
            type="number"
            placeholder="Вік (18-65)"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              if (errors.age) setErrors(prev => ({ ...prev, age: '' }));
            }}
            style={{ padding: '6px', width: '250px' }}
          />
          {errors.age && <p style={{ color: 'red', fontSize: '12px' }}>{errors.age}</p>}
        </div>
        <div style={{ marginTop: '10px' }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: '6px', width: '264px' }}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="C#">C#</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '6px 12px' }}>Зберегти</button>
      </form>
    </div>
  );
};