import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Planet Jersey. All kits ship worldwide.</p>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
