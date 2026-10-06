import {
    FiBox,
    FiPackage,
    FiUsers,
    FiTrendingUp,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDashboardData } from "../../Services/dashboardService.js";

import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalSales: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data = await getDashboardData();

                setDashboardData(data);
            } catch (error) {
                console.error(
                    "Error cargando dashboard:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <main className="admin-dashboard">
            <div className="admin-container">

                <section className="admin-heading">
                    <span>Panel administrativo</span>

                    <h1>Resumen del negocio</h1>

                    <p>
                        Administra productos, pedidos y usuarios desde
                        un solo lugar.
                    </p>
                </section>

                <section className="admin-stats">

                    <article className="admin-stat-card">
                        <div className="admin-stat-icon">
                            <FiBox />
                        </div>

                        <div>
                            <span>Productos</span>
                            <strong>
                                {loading
                                    ? "..."
                                    : dashboardData.totalProducts}
                            </strong>
                        </div>
                    </article>

                    <article className="admin-stat-card">
                        <div className="admin-stat-icon">
                            <FiPackage />
                        </div>

                        <div>
                            <span>Pedidos</span>
                            <strong>
                                {loading
                                    ? "..."
                                    : dashboardData.totalOrders}
                            </strong>
                        </div>
                    </article>

                    <article className="admin-stat-card">
                        <div className="admin-stat-icon">
                            <FiUsers />
                        </div>

                        <div>
                            <span>Usuarios</span>
                            <strong>
                                {loading
                                    ? "..."
                                    : dashboardData.totalUsers}
                            </strong>
                        </div>
                    </article>

                    <article className="admin-stat-card">
                        <div className="admin-stat-icon">
                            <FiTrendingUp />
                        </div>

                        <div>
                            <span>Ventas</span>
                            <strong>
                                {loading
                                    ? "..."
                                    : formatCurrency(
                                        dashboardData.totalSales
                                    )}
                            </strong>
                        </div>
                    </article>

                </section>

                <section className="admin-sections">

                    <article className="admin-module">
                        <span>01</span>

                        <h2>Productos</h2>

                        <p>
                            Crea, edita, elimina y controla el stock
                            disponible.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/productos")
                            }
                        >
                            Administrar productos
                        </button>
                    </article>

                    <article className="admin-module">
                        <span>02</span>

                        <h2>Pedidos</h2>

                        <p>
                            Consulta pedidos y actualiza su estado
                            durante el proceso de entrega.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/pedidos")
                            }
                        >
                            Ver pedidos
                        </button>
                    </article>

                    <article className="admin-module">
                        <span>03</span>

                        <h2>Usuarios</h2>

                        <p>
                            Consulta las cuentas registradas y sus
                            permisos dentro de la plataforma.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/usuarios")
                            }
                        >
                            Ver usuarios
                        </button>
                    </article>

                </section>

            </div>
        </main>
    );
}

export default AdminDashboard;