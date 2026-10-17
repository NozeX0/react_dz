import { LoginForm } from './components/LoginForm';
import { DeveloperForm } from './components/DeveloperForm';
import { ReviewForm } from './components/ReviewForm';

export function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      <LoginForm />
      <DeveloperForm />
      <ReviewForm />
    </div>
  );
}

export default App;