// src/pages/Admin/AdminOrders.jsx

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FiClock,
    FiEye,
    FiPackage,
    FiRefreshCw,
    FiTruck,
    FiCheckCircle,
    FiXCircle,
} from "react-icons/fi";

import {
    getAdminOrders,
    getUserOrders,
    updateAdminOrderStatus,
} from "../../components/Services/orderService.js";

import { useAuth } from "../../context/AuthContext";

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

function AdminOrders() {
    const {
        user,
        loading: authLoading,
    } = useAuth();

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [
        updatingOrderId,
        setUpdatingOrderId,
    ] = useState(null);

    const isAdmin =
        user?.role === "ADMIN";

    /*
     * =====================================
     * CARGAR PEDIDOS
     * =====================================
     *
     * ADMIN:
     * GET /api/admin/orders/all
     *
     * USER:
     * GET /auth/api/orders/user
     */
    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");

            let data;

            if (isAdmin) {
                console.log(
                    "Cargando pedidos como ADMIN"
                );

                data =
                    await getAdminOrders();
            } else {
                console.log(
                    "Cargando pedidos como USER"
                );

                data =
                    await getUserOrders();
            }

            setOrders(data);

        } catch (error) {
            console.error(
                "Error cargando pedidos:",
                error
            );

            setError(
                "No fue posible cargar las órdenes."
            );

        } finally {
            setLoading(false);
        }
    };

    /*
     * Esperamos a que AuthContext
     * termine de recuperar el usuario.
     */
    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (!user) {
            setLoading(false);
            return;
        }

        loadOrders();

    }, [
        user,
        authLoading,
        isAdmin,
    ]);

    /*
     * =====================================
     * FILTRO
     * =====================================
     *
     * Solo realmente lo usa ADMIN,
     * pero se deja igual para no cambiar
     * demasiado la estructura.
     */
    const filteredOrders =
        useMemo(() => {
            if (
                !isAdmin ||
                statusFilter === "ALL"
            ) {
                return orders;
            }

            return orders.filter(
                (order) =>
                    order.status ===
                    statusFilter
            );

        }, [
            orders,
            statusFilter,
            isAdmin,
        ]);

    /*
     * =====================================
     * FORMATO PRECIO
     * =====================================
     */
    const formatPrice = (value) => {
        return new Intl.NumberFormat(
            "es-MX",
            {
                style: "currency",
                currency: "MXN",
            }
        ).format(value);
    };

    /*
     * =====================================
     * FORMATO FECHA
     * =====================================
     */
    const formatDate = (date) => {
        return new Intl.DateTimeFormat(
            "es-MX",
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        ).format(
            new Date(date)
        );
    };

    /*
     * =====================================
     * CAMBIAR ESTADO
     * =====================================
     *
     * Solo ADMIN puede ejecutar esto.
     */
    const handleStatusChange = async (
        orderId,
        status
    ) => {
        if (!isAdmin) {
            return;
        }

        try {
            setUpdatingOrderId(
                orderId
            );

            setError("");

            const updatedOrder =
                await updateAdminOrderStatus(
                    orderId,
                    status
                );

            setOrders(
                (currentOrders) =>
                    currentOrders.map(
                        (order) =>
                            order.id ===
                            orderId
                                ? updatedOrder
                                : order
                    )
            );

        } catch (error) {
            console.error(
                "Error actualizando pedido:",
                error
            );

            setError(
                "No se pudo actualizar el estado de la orden."
            );

        } finally {
            setUpdatingOrderId(
                null
            );
        }
    };

    /*
     * =====================================
     * LOADING AUTH
     * =====================================
     */
    if (authLoading) {
        return (
            <main className="admin-orders-page">
                <div className="admin-orders-container">

                    <div className="admin-orders-loading">
                        Verificando sesión...
                    </div>

                </div>
            </main>
        );
    }

    /*
     * =====================================
     * SIN SESIÓN
     * =====================================
     *
     * La ruta debería estar protegida,
     * pero evitamos hacer requests.
     */
    if (!user) {
        return (
            <main className="admin-orders-page">
                <div className="admin-orders-container">

                    <div className="admin-orders-error">
                        Necesitas iniciar sesión
                        para consultar tus pedidos.
                    </div>

                </div>
            </main>
        );
    }

    return (
        <main className="admin-orders-page">

            <div className="admin-orders-container">

                {/* =========================
                    HEADER
                ========================== */}

                <header className="admin-orders-header">

                    <div>

                        <span className="admin-orders-eyebrow">
                            {isAdmin
                                ? "Administración"
                                : "Mi cuenta"}
                        </span>

                        <h1>
                            {isAdmin
                                ? "Pedidos"
                                : "Mis pedidos"}
                        </h1>

                        <p>
                            {isAdmin
                                ? "Consulta todas las órdenes y actualiza su estado."
                                : "Consulta tus pedidos y revisa su estado."}
                        </p>

                    </div>

                    {/* =====================
                        ACCIONES ADMIN
                    ====================== */}

                    {isAdmin && (
                        <div className="admin-orders-actions">

                            <select
                                value={
                                    statusFilter
                                }
                                onChange={(
                                    event
                                ) =>
                                    setStatusFilter(
                                        event
                                            .target
                                            .value
                                    )
                                }
                            >
                                <option value="ALL">
                                    Todos
                                </option>

                                <option value="PENDING">
                                    Pendientes
                                </option>

                                <option value="PROCESSING">
                                    En preparación
                                </option>

                                <option value="SHIPPED">
                                    En camino
                                </option>

                                <option value="DELIVERED">
                                    Entregados
                                </option>

                                <option value="CANCELED">
                                    Cancelados
                                </option>
                            </select>

                            <button
                                type="button"
                                onClick={
                                    loadOrders
                                }
                                disabled={
                                    loading
                                }
                            >
                                <FiRefreshCw />

                                Actualizar
                            </button>

                        </div>
                    )}

                </header>

                {/* =========================
                    ERROR
                ========================== */}

                {error && (
                    <div className="admin-orders-error">
                        {error}
                    </div>
                )}

                {/* =========================
                    CONTENIDO
                ========================== */}

                {loading ? (
                    <div className="admin-orders-loading">
                        Cargando pedidos...
                    </div>

                ) : filteredOrders.length === 0 ? (
                    <div className="admin-orders-empty">

                        <FiPackage />

                        <h2>
                            No hay pedidos para mostrar
                        </h2>

                        <p>
                            {isAdmin
                                ? "Todavía no existen órdenes registradas."
                                : "Aún no has realizado ningún pedido."}
                        </p>

                    </div>

                ) : (
                    <div className="admin-orders-list">

                        {filteredOrders.map(
                            (order) => {

                                const status =
                                    statusConfig[
                                        order.status
                                    ] ??
                                    statusConfig.PENDING;

                                const StatusIcon =
                                    status.icon;

                                const totalItems =
                                    order.orderItems.reduce(
                                        (
                                            total,
                                            item
                                        ) =>
                                            total +
                                            item.quantity,
                                        0
                                    );

                                return (
                                    <article
                                        className="admin-order-card"
                                        key={
                                            order.id
                                        }
                                    >

                                        {/* =================
                                            CARD HEADER
                                        ================== */}

                                        <div className="admin-order-card-header">

                                            <div>

                                                <span>
                                                    Pedido
                                                </span>

                                                <h2>
                                                    #
                                                    {
                                                        order.id
                                                    }
                                                </h2>

                                                <p>
                                                    {formatDate(
                                                        order.orderDate
                                                    )}
                                                </p>

                                            </div>

                                            <div
                                                className={`admin-order-status admin-order-status--${order.status.toLowerCase()}`}
                                            >
                                                <StatusIcon />

                                                {
                                                    status.label
                                                }
                                            </div>

                                        </div>

                                        {/* =================
                                            RESUMEN
                                        ================== */}

                                        <div className="admin-order-summary">

                                            <div>

                                                <span>
                                                    Dirección
                                                </span>

                                                <strong>
                                                    {
                                                        order.address
                                                    }
                                                </strong>

                                            </div>

                                            <div>

                                                <span>
                                                    Productos
                                                </span>

                                                <strong>
                                                    {
                                                        totalItems
                                                    }
                                                </strong>

                                            </div>

                                            <div>

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

                                        {/* =================
                                            PRODUCTOS
                                        ================== */}

                                        <div className="admin-order-items">

                                            {order.orderItems.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <div
                                                        className="admin-order-item"
                                                        key={`${order.id}-${index}`}
                                                    >

                                                        <div>

                                                            <strong>
                                                                {
                                                                    item.productName
                                                                }
                                                            </strong>

                                                            <span>
                                                                {
                                                                    item.quantity
                                                                }
                                                                {" × "}
                                                                {formatPrice(
                                                                    item.unitPrice
                                                                )}
                                                            </span>

                                                        </div>

                                                        <strong>
                                                            {formatPrice(
                                                                item.quantity *
                                                                    item.unitPrice
                                                            )}
                                                        </strong>

                                                    </div>
                                                )
                                            )}

                                        </div>

                                        {/* =================
                                            CONTROLES ADMIN
                                        ================== */}

                                        {isAdmin && (
                                            <div className="admin-order-card-footer">

                                                <div className="admin-order-status-control">

                                                    <label
                                                        htmlFor={`status-${order.id}`}
                                                    >
                                                        Estado
                                                    </label>

                                                    <select
                                                        id={`status-${order.id}`}
                                                        value={
                                                            order.status
                                                        }
                                                        disabled={
                                                            updatingOrderId ===
                                                            order.id
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleStatusChange(
                                                                order.id,
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                    >

                                                        <option value="PENDING">
                                                            Pendiente
                                                        </option>

                                                        <option value="PROCESSING">
                                                            En preparación
                                                        </option>

                                                        <option value="SHIPPED">
                                                            En camino
                                                        </option>

                                                        <option value="DELIVERED">
                                                            Entregado
                                                        </option>

                                                        <option value="CANCELED">
                                                            Cancelado
                                                        </option>

                                                    </select>

                                                </div>

                                                <button
                                                    type="button"
                                                    className="admin-order-view"
                                                >
                                                    <FiEye />

                                                    Ver detalle
                                                </button>

                                            </div>
                                        )}

                                    </article>
                                );
                            }
                        )}

                    </div>
                )}

            </div>

        </main>
    );
}

export default AdminOrders;