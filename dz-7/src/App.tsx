import { Counter } from './components/Counter';
import { Timer } from './components/Timer';
import { StorageInput } from './components/StorageInput';
import { FocusInput } from './components/FocusInput';
import { Slider } from './components/Slider';

export function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      <Counter />
      <Timer />
      <StorageInput />
      <FocusInput />
      <Slider />
    </div>
  );
}

export default App;