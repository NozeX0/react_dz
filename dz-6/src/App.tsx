import {
  BrowserRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./App.css";

const products = [
  {
    id: 1,
    name: "iPhone 15",
    category: "Телефони",
    price: 39999,
    description:
      "Сучасний смартфон Apple з якісною камерою, потужним процесором та яскравим дисплеєм.",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Телефони",
    price: 34999,
    description:
      "Флагманський смартфон Samsung з якісною камерою та продуктивним процесором.",
  },
  {
    id: 3,
    name: "Google Pixel 9",
    category: "Телефони",
    price: 32999,
    description:
      "Смартфон Google з якісною камерою, сучасним дизайном та чистою версією Android.",
  },
  {
    id: 4,
    name: "MacBook Air M3",
    category: "Ноутбуки",
    price: 54999,
    description:
      "Легкий та продуктивний ноутбук Apple для навчання, роботи та повсякденного використання.",
  },
  {
    id: 5,
    name: "ASUS Vivobook",
    category: "Ноутбуки",
    price: 29999,
    description:
      "Практичний ноутбук для навчання, роботи, перегляду відео та роботи з документами.",
  },
  {
    id: 6,
    name: "Lenovo IdeaPad",
    category: "Ноутбуки",
    price: 25999,
    description:
      "Зручний ноутбук для повсякденних завдань, навчання та роботи.",
  },
];

function MainLayout() {
  return (
    <div className="app">
      <header className="header">
        <nav className="navigation">
          <NavLink to="/" end>
            Головна
          </NavLink>

          <NavLink to="/products">
            Каталог
          </NavLink>
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Каталог товарів</p>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <section className="page">
      <h1>Головна</h1>

      <p>
        Ласкаво просимо до каталогу товарів. Тут ви можете переглянути
        телефони та ноутбуки, а також детальну інформацію про кожен товар.
      </p>

      <Link to="/products" className="button">
        Перейти до каталогу
      </Link>
    </section>
  );
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "Усі";

  const filteredProducts =
    category === "Усі"
      ? products
      : products.filter((product) => product.category === category);

  const changeCategory = (newCategory: string) => {
    if (newCategory === "Усі") {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCategory });
    }
  };

  return (
    <section className="page">
      <h1>Каталог товарів</h1>

      <div className="filters">
        <button
          className={category === "Усі" ? "selected" : ""}
          onClick={() => changeCategory("Усі")}
        >
          Усі
        </button>

        <button
          className={category === "Телефони" ? "selected" : ""}
          onClick={() => changeCategory("Телефони")}
        >
          Телефони
        </button>

        <button
          className={category === "Ноутбуки" ? "selected" : ""}
          onClick={() => changeCategory("Ноутбуки")}
        >
          Ноутбуки
        </button>
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <h2>{product.name}</h2>

            <p className="category">{product.category}</p>

            <p className="price">{product.price} грн</p>

            <Link
              to={`/products/${product.id}`}
              className="button"
            >
              Детальніше
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <section className="page">
        <h1>Товар не знайдено</h1>

        <p>
          Товар з таким ідентифікатором не існує.
        </p>

        <button
          className="button"
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
      </section>
    );
  }

  return (
    <section className="page product-details">
      <h1>{product.name}</h1>

      <p>
        <strong>ID:</strong> {product.id}
      </p>

      <p>
        <strong>Назва:</strong> {product.name}
      </p>

      <p>
        <strong>Категорія:</strong> {product.category}
      </p>

      <p>
        <strong>Ціна:</strong> {product.price} грн
      </p>

      <p>
        <strong>Опис:</strong> {product.description}
      </p>

      <button
        className="button"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page not-found">
      <h1>404</h1>

      <p>Сторінку не знайдено.</p>

      <Link to="/" className="button">
        На головну
      </Link>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;