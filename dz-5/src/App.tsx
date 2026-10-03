import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Дюна",
    year: 2021,
    genre: "Фантастика",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Паразиты",
    year: 2019,
    genre: "Драма, триллер",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Начало",
    year: 2010,
    genre: "Фантастика, триллер",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Интерстеллар",
    year: 2014,
    genre: "Фантастика, драма",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
  },
];

function Header() {
  return <header className="header"></header>;
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/" end>
          Главная
        </NavLink>

        <NavLink to="/catalog">
          Каталог
        </NavLink>

        <NavLink to="/about">
          О проекте
        </NavLink>
      </nav>
    </aside>
  );
}

function Footer() {
  return <footer className="footer">© 2026</footer>;
}

function Home() {
  return (
    <section className="page">
      <h2>Фильмы, которые стоит посмотреть</h2>

      <p>
        Здесь собраны интересные фильмы разных жанров и годов выпуска.
        Откройте каталог и выберите подходящий фильм.
      </p>

      <NavLink to="/catalog" className="button">
        Открыть каталог
      </NavLink>
    </section>
  );
}

function Catalog() {
  return (
    <section className="page">
      <h2>Каталог фильмов</h2>

      <div className="movie-list">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            <img src={movie.image} alt={movie.title} />

            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <span>{movie.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page">
      <h2>О проекте</h2>

      <p>
        Каталог фильмов, без комментов.
      </p>

      <p>
        Сайт создан на блаблаблаблала рандом инфа блаблабла.
      </p>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page not-found">
      <h2>404</h2>

      <p>Страница не найдена.</p>

      <NavLink to="/" className="button">
        Вернуться на главную
      </NavLink>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <div className="main">
          <Sidebar />

          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;