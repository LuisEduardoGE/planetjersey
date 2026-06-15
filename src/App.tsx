import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Header } from "./components/Header";
import { TrustBar } from "./components/TrustBar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on route change — expected behaviour for a storefront.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <AnnouncementBar />
      <Header onOpenCart={() => setCartOpen(true)} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      <TrustBar />
      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
