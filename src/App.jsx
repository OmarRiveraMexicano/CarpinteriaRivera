import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CartDrawer from "./components/CartDrawer/CartDrawer";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import AboutPage from "./pages/About";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollTopButton from "./components/ScrollTopBotton/ScrollTopBotton";
import Quote from "./pages/Quote";
import Checkout from "./pages/Checkout";

function App() {
    return (
        <>

            <ScrollToTop />
            <ScrollTopButton />
            <Navbar />


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/cotizacion" element={<Quote />} />
                <Route
                    path="/producto/:id"
                    element={<ProductDetail />}
                />
                <Route path="/about" element={<AboutPage />} />
            </Routes>

            <CartDrawer />
        </>
    );
}

export default App;
