import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store/store';
import { addItem, removeItem, clearCart } from './store/cartSlice';

export function App() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
    };

    dispatch(addItem(newProduct));
    setName('');
    setPrice('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Кошик товарів (Redux Toolkit)</h1>

      <form onSubmit={handleAdd} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Назва товару"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <input
          type="number"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: '8px', width: '100px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Додати
        </button>
      </form>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Загальна сума: {cart.totalAmount} грн</h3>
        {cart.items.length > 0 && (
          <button onClick={() => dispatch(clearCart())} style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Очистити кошик
          </button>
        )}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.items.map((item) => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <span>{item.name} — {item.price} грн</span>
            <button
              onClick={() => dispatch(removeItem(item.id))}
              style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;