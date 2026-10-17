import { useEffect, useRef, useState } from "react";
import "./App.css";

function InputForm({
  inputRef,
  onFocus,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFocus: () => void;
}) {
  return (
    <div className="row">
      <input ref={inputRef} placeholder="Введи текст" />
      <button onClick={onFocus}>Фокус</button>
    </div>
  )
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [count, setCount] = useState(0);
  const previousRef = useRef<number | null>(null);

  const rendersRef = useRef(0);
  rendersRef.current++;

  const menuRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const codeRefs = useRef<HTMLInputElement[]>([]);

  const sizeRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const formRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const resultTextRef = useRef<HTMLElement>(null);

  useEffect(() => {
    previousRef.current = count;
  }, [count]);

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenu(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  useEffect(() => {
    if (sizeRef.current) {
      const rect = sizeRef.current.getBoundingClientRect();

      setSize({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  function startTimer() {
    if (timerRef.current) {
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function changeCode(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    if (codeRefs.current[index]) {
      codeRefs.current[index].value = digit;
    }

    if (digit && codeRefs.current[index + 1]) {
      codeRefs.current[index + 1].focus();
    }
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = formRef.current?.value || "";

    if (resultTextRef.current && resultRef.current) {
      resultTextRef.current.textContent = value;
      resultRef.current.style.display = value ? "block" : "none";
    }
  }

  return (
    <main>
      <header style={{ display: "none" }} />

      <section>
        <span className="number">01</span>
        <h2>Focus input</h2>

        <InputForm
          inputRef={inputRef}
          onFocus={() => inputRef.current?.focus()}
        />
      </section>

      <section>
        <span className="number">02</span>
        <h2>Секундомір</h2>

        <div className="timer">
          {seconds} секунд
        </div>

        <div className="buttons">
          <button onClick={startTimer}>Старт</button>
          <button onClick={stopTimer}>Стоп</button>
        </div>
      </section>

      <section>
        <span className="number">03</span>
        <h2>Попереднє значення</h2>

        <div className="values">
          <div>
            <span>Поточне</span>
            <strong>{count}</strong>
          </div>

          <div>
            <span>Попереднє</span>
            <strong>
              {previousRef.current === null
                ? "Немає"
                : previousRef.current}
            </strong>
          </div>
        </div>

        <button onClick={() => setCount((value) => value + 1)}>
          Збільшити
        </button>
      </section>

      <section>
        <span className="number">04</span>
        <h2>Кількість рендерів</h2>

        <div className="big-number">
          {rendersRef.current}
        </div>

        <button onClick={() => setCount((value) => value + 1)}>
          Оновити компонент
        </button>
      </section>

      <section ref={menuRef}>
        <span className="number">05</span>
        <h2>Dropdown</h2>

        <button onClick={() => setMenu(!menu)}>
          {menu ? "Закрити меню" : "Відкрити меню"}
        </button>

        {menu && (
          <div className="menu">
            <p>Профіль</p>
            <p>Налаштування</p>
            <p>Вихід</p>
          </div>
        )}
      </section>

      <section>
        <span className="number">06</span>
        <h2>Відео-плеєр</h2>

        <div className="youtube" style={{ background: "#000" }}>
          <video
            ref={videoRef}
            controls
            playsInline
            style={{ width: "100%", height: "100%", display: "block" }}
            src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.480p.vp9.webm"
          />
        </div>

        <div className="buttons">
          <button onClick={() => videoRef.current?.play()}>
            Відтворити
          </button>
          <button onClick={() => videoRef.current?.pause()}>
            Пауза
          </button>
        </div>
      </section>

      <section>
        <span className="number">07</span>
        <h2>Плавне прокручування</h2>

        <button
          onClick={() =>
            scrollRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Прокрутити до секції
        </button>
      </section>

      <section>
        <span className="number">08</span>
        <h2>Код підтвердження</h2>

        <div className="code-inputs">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              className="code"
              maxLength={1}
              inputMode="numeric"
              ref={(element) => {
                if (element) {
                  codeRefs.current[index] = element;
                }
              }}
              onChange={(event) =>
                changeCode(index, event.target.value)
              }
            />
          ))}
        </div>
      </section>

      <section>
        <span className="number">09</span>
        <h2>Розмір DOM-елемента</h2>

        <div ref={sizeRef} className="size-box">
          DOM елемент
        </div>

        <p>
          Ширина: <strong>{size.width}px</strong>
        </p>

        <p>
          Висота: <strong>{size.height}px</strong>
        </p>
      </section>

      <section ref={scrollRef}>
        <span className="number">10</span>
        <h2>Форма без стану</h2>

        <form onSubmit={submitForm}>
          <div className="row">
            <input
              ref={formRef}
              placeholder="Введи текст"
            />

            <button type="submit">
              Відправити
            </button>
          </div>
        </form>

        <div
          ref={resultRef}
          className="result"
          style={{ display: "none" }}
        >
          <span>Результат:</span>
          <strong ref={resultTextRef}></strong>
        </div>
      </section>
    </main>
  );
}

export default App;