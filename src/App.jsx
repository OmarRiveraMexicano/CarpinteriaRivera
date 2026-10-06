import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CartDrawer from "./components/CartDrawer/CartDrawer";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import AboutPage from "./pages/About";
import Quote from "./pages/Quote";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";


import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollTopButton from "./components/ScrollTopBotton/ScrollTopBotton";

import AdminRoute from "./components/Admin/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import OrdersPage from "./pages/Orders";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";

function App() {
    return (
        <>
            <ScrollToTop />
            <ScrollTopButton />

            <Navbar />



            <Routes>

                <Route
                    path="/admin/pedidos"
                    element={
                        <AdminRoute>
                            <OrdersPage />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/productos"
                    element={
                        <AdminRoute>
                            <AdminProducts />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/usuarios"
                    element={
                        <AdminRoute>
                            <AdminUsers />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/catalogo"
                    element={<Catalog />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/cotizacion"
                    element={<Quote />}
                />

                <Route
                    path="/producto/:id"
                    element={<ProductDetail />}
                />

                <Route
                    path="/pedidos"
                    element={<OrdersPage />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />
            </Routes>

            <CartDrawer />
        </>
    );
}

export default App;