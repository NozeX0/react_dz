import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [radius, setRadius] = useState<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = () => {
    setRadius((prev) => prev + 1);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setRadius(0);
    }, 3000);
  };

  return (
    <div className="container">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="Nature"
        onMouseMove={handleMouseMove}
        style={{ borderRadius: `${radius}px` }}
      />
    </div>
  );
}

export default App;