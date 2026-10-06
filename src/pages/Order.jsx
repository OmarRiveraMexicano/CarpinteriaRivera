import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiArrowLeft,
    FiBox,
    FiCheckCircle,
    FiClock,
    FiMapPin,
    FiPackage,
    FiShoppingBag,
    FiTruck,
    FiXCircle,
} from "react-icons/fi";

import { getUserOrders } from "../components/Services/orderService.js";

import "./Orders.css";

const statusConfig = {
    PENDING: {
        label: "Pendiente",
        icon: FiClock,
    },

    PROCESSING: {
        label: "En preparación",
        icon: FiPackage,
    },

    SHIPPED: {
        label: "En camino",
        icon: FiTruck,
    },

    DELIVERED: {
        label: "Entregado",
        icon: FiCheckCircle,
    },

    CANCELED: {
        label: "Cancelado",
        icon: FiXCircle,
    },
};

function OrdersPage() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title =
            "Mis pedidos | Omar Carpintería";

        const loadOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const data =
                    await getUserOrders();

                setOrders(data);
            } catch (error) {
                console.error(
                    "Error cargando pedidos:",
                    error
                );

                setError(
                    "No fue posible cargar tus pedidos."
                );
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat(
            "es-MX",
            {
                style: "currency",
                currency: "MXN",
            }
        ).format(price);
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat(
            "es-MX",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        ).format(new Date(date));
    };

    const getTotalItems = (orderItems) => {
        return orderItems.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );
    };

    return (
        <main className="orders-page">

            {/* HERO */}

            <section className="orders-hero">
                <div className="orders-container">

                    <button
                        type="button"
                        className="orders-back"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        <FiArrowLeft />

                        Volver
                    </button>

                    <div className="orders-heading">
                        <span className="orders-eyebrow">
                            Área de clientes
                        </span>

                        <h1>
                            Mis
                            <br />
                            pedidos.
                        </h1>

                        <p>
                            Consulta tus compras,
                            productos y el estado
                            actual de cada pedido.
                        </p>
                    </div>

                </div>
            </section>

            {/* CONTENT */}

            <section className="orders-content">
                <div className="orders-container">

                    {error && (
                        <div className="orders-error">
                            <FiXCircle />

                            <span>
                                {error}
                            </span>
                        </div>
                    )}

                    {loading && (
                        <div className="orders-loading">
                            <div className="orders-loader" />

                            <span>
                                Cargando tus pedidos...
                            </span>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        orders.length === 0 && (
                            <div className="orders-empty">

                                <div className="orders-empty-icon">
                                    <FiShoppingBag />
                                </div>

                                <span>
                                    Tu historial está vacío
                                </span>

                                <h2>
                                    Aún no tienes
                                    <br />
                                    pedidos.
                                </h2>

                                <p>
                                    Cuando realices tu
                                    primera compra podrás
                                    consultar aquí todos
                                    los detalles.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/catalogo"
                                        )
                                    }
                                >
                                    Explorar catálogo
                                </button>

                            </div>
                        )}

                    {!loading &&
                        !error &&
                        orders.length > 0 && (
                            <div className="orders-list">

                                {orders.map(
                                    (order) => {
                                        const status =
                                            statusConfig[
                                                order
                                                    .status
                                            ] ??
                                            statusConfig.PENDING;

                                        const StatusIcon =
                                            status.icon;

                                        const totalItems =
                                            getTotalItems(
                                                order.orderItems
                                            );

                                        return (
                                            <article
                                                className="order-card"
                                                key={
                                                    order.id
                                                }
                                            >

                                                {/* HEADER */}

                                                <header className="order-card-header">

                                                    <div className="order-card-title">

                                                        <span>
                                                            Pedido
                                                        </span>

                                                        <h2>
                                                            #
                                                            {
                                                                order.id
                                                            }
                                                        </h2>

                                                    </div>

                                                    <div
                                                        className={`order-status order-status--${order.status.toLowerCase()}`}
                                                    >
                                                        <StatusIcon />

                                                        {
                                                            status.label
                                                        }
                                                    </div>

                                                </header>

                                                {/* INFO */}

                                                <div className="order-meta">

                                                    <div className="order-meta-item">
                                                        <span>
                                                            Fecha
                                                        </span>

                                                        <strong>
                                                            {formatDate(
                                                                order.orderDate
                                                            )}
                                                        </strong>
                                                    </div>

                                                    <div className="order-meta-item">
                                                        <span>
                                                            Productos
                                                        </span>

                                                        <strong>
                                                            {
                                                                totalItems
                                                            }{" "}
                                                            {totalItems ===
                                                            1
                                                                ? "pieza"
                                                                : "piezas"}
                                                        </strong>
                                                    </div>

                                                    <div className="order-meta-item">
                                                        <span>
                                                            Total
                                                        </span>

                                                        <strong>
                                                            {formatPrice(
                                                                order.totalAmount
                                                            )}
                                                        </strong>
                                                    </div>

                                                </div>

                                                {/* ADDRESS */}

                                                <div className="order-address">

                                                    <div className="order-address-icon">
                                                        <FiMapPin />
                                                    </div>

                                                    <div>
                                                        <span>
                                                            Dirección
                                                            de entrega
                                                        </span>

                                                        <p>
                                                            {
                                                                order.address
                                                            }
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* PRODUCTS */}

                                                <div className="order-products">

                                                    <div className="order-products-heading">
                                                        <span>
                                                            Productos
                                                            del pedido
                                                        </span>
                                                    </div>

                                                    <div className="order-items">

                                                        {order.orderItems.map(
                                                            (
                                                                item,
                                                                index
                                                            ) => {
                                                                const subtotal =
                                                                    item.quantity *
                                                                    item.unitPrice;

                                                                return (
                                                                    <div
                                                                        className="order-item"
                                                                        key={`${order.id}-${index}`}
                                                                    >

                                                                        <div className="order-item-icon">
                                                                            <FiPackage />
                                                                        </div>

                                                                        <div className="order-item-info">

                                                                            <strong>
                                                                                {
                                                                                    item.productName
                                                                                }
                                                                            </strong>

                                                                            <span>
                                                                                {
                                                                                    item.quantity
                                                                                }{" "}
                                                                                ×{" "}
                                                                                {formatPrice(
                                                                                    item.unitPrice
                                                                                )}
                                                                            </span>

                                                                        </div>

                                                                        <strong className="order-item-subtotal">
                                                                            {formatPrice(
                                                                                subtotal
                                                                            )}
                                                                        </strong>

                                                                    </div>
                                                                );
                                                            }
                                                        )}

                                                    </div>

                                                </div>

                                                {/* FOOTER */}

                                                <footer className="order-card-footer">

                                                    <div>
                                                        <span>
                                                            Total
                                                            del pedido
                                                        </span>

                                                        <strong>
                                                            {formatPrice(
                                                                order.totalAmount
                                                            )}
                                                        </strong>
                                                    </div>

                                                </footer>

                                            </article>
                                        );
                                    }
                                )}

                            </div>
                        )}

                </div>
            </section>

        </main>
    );
}

export default OrdersPage;