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
import { useEffect } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  category: "Телефони" | "Ноутбуки";
  price: number;
  description: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    category: "Телефони",
    price: 799,
    description: "блаблаблабла",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Телефони",
    price: 899,
    description: "блаблаблабла",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Google Pixel 9",
    category: "Телефони",
    price: 799,
    description: "блаблаблабла",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "MacBook Air M3",
    category: "Ноутбуки",
    price: 1099,
    description: "блаблаблабла",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "ASUS Vivobook",
    category: "Ноутбуки",
    price: 699,
    description: "блаблаблабла",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Lenovo IdeaPad",
    category: "Ноутбуки",
    price: 599,
    description: "блаблаблабла",
    image:
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=800&q=80",
  },
];

function MainLayout() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <nav className="navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Головна
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Каталог
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026</p>
        <span>Магазин техніки</span>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <section className="home">
      <div className="hero">
        <h1>
          Технології, які
          <br />
          <span>працюють для тебе</span>
        </h1>

        <p>
          Обирай смартфони та ноутбуки для навчання,
          роботи та повсякденного життя. БЛАБЛАБЛА
        </p>

        <Link to="/products" className="hero-button">
          Переглянути каталог →
        </Link>
      </div>

      <div className="home-info">
        <div>
          <strong>06</strong>
          <span>товарів</span>
        </div>

        <div>
          <strong>02</strong>
          <span>категорії</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>онлайн</span>
        </div>
      </div>
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

  function changeCategory(value: string) {
    if (value === "Усі") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  }

  return (
    <section className="catalog">
      <div className="catalog-heading">
        <div>
          <span className="section-label">КАТАЛОГ</span>
          <h1>Наші товари</h1>
        </div>

        <p>
          Обери категорію та переглянь
          <br />
          доступні товари.
        </p>
      </div>

      <div className="filters">
        <button
          className={category === "Усі" ? "filter active" : "filter"}
          onClick={() => changeCategory("Усі")}
        >
          Усі
        </button>

        <button
          className={
            category === "Телефони" ? "filter active" : "filter"
          }
          onClick={() => changeCategory("Телефони")}
        >
          Телефони
        </button>

        <button
          className={
            category === "Ноутбуки" ? "filter active" : "filter"
          }
          onClick={() => changeCategory("Ноутбуки")}
        >
          Ноутбуки
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-number">
              0{product.id}
            </div>

            <div className="product-content">
              <span className="product-category">
                {product.category}
              </span>

              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <div className="product-bottom">
                <strong>${product.price}</strong>

                <Link
                  to={`/products/${product.id}`}
                  className="details-link"
                >
                  Детальніше →
                </Link>
              </div>
            </div>
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

  useEffect(() => {
    console.log(`Відкрито товар з id: ${id}`);

    return () => {
      console.log(`Сторінка товару ${id} закривається`);
    };
  }, [id]);

  if (!product) {
    return (
      <section className="not-found">
        <span className="section-label">ПОМИЛКА</span>

        <h1>Товар не знайдено</h1>

        <p>Можливо, такого товару не існує.</p>

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>
      </section>
    );
  }

  return (
    <section className="details">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <div className="details-card">
        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />

        <div className="details-info">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-price">
            <span>Ціна</span>
            <strong>${product.price}</strong>
          </div>

          <div className="details-extra">
            <div>
              <span>ID товару</span>
              <strong>#{product.id}</strong>
            </div>

            <div>
              <span>Категорія</span>
              <strong>{product.category}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="not-found">
      <span className="section-label">404</span>

      <h1>Сторінку не знайдено</h1>

      <p>Такої сторінки не існує.</p>

      <Link to="/" className="hero-button">
        На головну →
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
          <Route
            path="products/:id"
            element={<ProductDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;