import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiArrowLeft,
    FiCheck,
    FiCheckCircle,
    FiMessageCircle,
    FiMinus,
    FiPlus,
    FiTrash2,
    FiPackage,
    FiLock,
    FiUser,
    FiX,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import {
    createOrder,
} from "../../components/Services/orderService.js";

import "./Checkout.css";

function Checkout() {
    const navigate = useNavigate();

    const {
        cartItems,
        cartTotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const {
        user,
        loading: authLoading,
    } = useAuth();

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        email: "",
        deliveryMethod: "Entrega a domicilio",
        address: "",
        municipality: "",
        references: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});

    const [submitting, setSubmitting] =
        useState(false);

    const [submitError, setSubmitError] =
        useState("");

    const [createdOrder, setCreatedOrder] =
        useState(null);

    const [whatsappUrl, setWhatsappUrl] =
        useState("");

    /*
     * Modal para solicitar inicio de sesión.
     */
    const [showLoginRequired, setShowLoginRequired] =
        useState(false);

    useEffect(() => {
        document.title =
            "Finalizar pedido | Carpintería";
    }, []);

    /*
     * Cierra el modal con ESC.
     */
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                event.key === "Escape" &&
                showLoginRequired
            ) {
                setShowLoginRequired(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [showLoginRequired]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setCustomer((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));

        setSubmitError("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!customer.name.trim()) {
            newErrors.name =
                "Ingresa tu nombre.";
        }

        if (!customer.phone.trim()) {
            newErrors.phone =
                "Ingresa tu teléfono.";
        }

        if (
            customer.deliveryMethod ===
                "Entrega a domicilio" &&
            !customer.address.trim()
        ) {
            newErrors.address =
                "Ingresa la dirección de entrega.";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );
    };

    /*
     * Construye la dirección que se
     * enviará al backend.
     */
    const getOrderAddress = () => {
        if (
            customer.deliveryMethod ===
            "Entrega por acordar"
        ) {
            return "Entrega por acordar vía WhatsApp";
        }

        return [
            customer.address.trim(),
            customer.municipality.trim(),
            customer.references.trim(),
        ]
            .filter(Boolean)
            .join(", ");
    };

    /*
     * Construye el mensaje de WhatsApp
     * usando la respuesta del backend.
     */
    const buildWhatsappMessage = (order) => {
        const productsText =
            order.orderItems
                .map((item) => {
                    const subtotal =
                        Number(item.unitPrice) *
                        item.quantity;

                    return [
                        `• ${item.productName}`,
                        `  Cantidad: ${item.quantity}`,
                        `  Subtotal: ${formatPrice(
                            subtotal
                        )}`,
                    ].join("\n");
                })
                .join("\n\n");

        const deliveryText =
            customer.deliveryMethod ===
            "Entrega a domicilio"
                ? [
                      `Dirección: ${customer.address}`,
                      `Municipio: ${
                          customer.municipality ||
                          "No especificado"
                      }`,
                      `Referencias: ${
                          customer.references ||
                          "Sin referencias"
                      }`,
                  ].join("\n")
                : "La entrega se acordará directamente por WhatsApp.";

        return `
Hola, quiero confirmar el siguiente pedido:

PEDIDO #${order.id}

${productsText}

TOTAL: ${formatPrice(order.totalAmount)}

DATOS DEL CLIENTE
Nombre: ${customer.name}
Teléfono: ${customer.phone}
Correo: ${
            customer.email ||
            "No especificado"
        }

ENTREGA
Modalidad: ${customer.deliveryMethod}
${deliveryText}

COMENTARIOS
${
    customer.notes ||
    "Sin comentarios adicionales"
}

Estado del pedido: ${order.status}
        `.trim();
    };

    /*
     * =====================================
     * CONFIRMAR PEDIDO
     * =====================================
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        /*
         * Esperamos a AuthContext.
         */
        if (authLoading) {
            return;
        }

        /*
         * SIN SESIÓN:
         * no validamos ni mandamos nada
         * al backend. Mostramos el modal.
         */
        if (!user) {
            setShowLoginRequired(true);
            return;
        }

        /*
         * Ya tiene sesión.
         */
        if (!validateForm()) {
            return;
        }

        if (submitting) {
            return;
        }

        setSubmitting(true);
        setSubmitError("");

        /*
         * Abrimos previamente una pestaña
         * para evitar bloqueo de popup
         * después del await.
         */
        const whatsappWindow =
            window.open(
                "",
                "_blank"
            );

        try {
            const orderData = {
                address:
                    getOrderAddress(),

                items: cartItems.map(
                    (item) => ({
                        productId:
                            item.id,
                        quantity:
                            item.quantity,
                    })
                ),
            };

            console.log(
                "Pedido enviado:",
                orderData
            );

            /*
             * Registramos en Spring Boot.
             */
            const order =
                await createOrder(
                    orderData
                );

            console.log(
                "Pedido registrado:",
                order
            );

            /*
             * Generamos WhatsApp utilizando
             * el pedido ya registrado.
             */
            const message =
                buildWhatsappMessage(
                    order
                );

            /*
             * CAMBIA ESTE NÚMERO.
             */
            const whatsappNumber =
                "521XXXXXXXXXX";

            const url =
                `https://wa.me/${whatsappNumber}` +
                `?text=${encodeURIComponent(
                    message
                )}`;

            setCreatedOrder(order);
            setWhatsappUrl(url);

            /*
             * El pedido ya existe en BDD,
             * ahora sí vaciamos carrito.
             */
            clearCart();

            /*
             * Mostramos primero la
             * confirmación y después WhatsApp.
             */
            setTimeout(() => {
                if (
                    whatsappWindow &&
                    !whatsappWindow.closed
                ) {
                    whatsappWindow.location.href =
                        url;
                } else {
                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );
                }
            }, 1500);

        } catch (error) {
            console.error(
                "Error al registrar pedido:",
                error
            );

            if (
                whatsappWindow &&
                !whatsappWindow.closed
            ) {
                whatsappWindow.close();
            }

            setSubmitError(
                error.message ||
                    "No pudimos registrar tu pedido. Inténtalo nuevamente."
            );

        } finally {
            setSubmitting(false);
        }
    };

    /*
     * =====================================
     * PEDIDO REGISTRADO
     * =====================================
     */
    if (createdOrder) {
        return (
            <main className="checkout-success-page">

                <section className="checkout-success-card">

                    <div className="checkout-success-icon">
                        <FiCheckCircle />
                    </div>

                    <span className="checkout-success-eyebrow">
                        Pedido registrado
                    </span>

                    <h1>
                        ¡Tu pedido fue recibido!
                    </h1>

                    <p className="checkout-success-description">
                        Guardamos correctamente tu
                        pedido en nuestro sistema.
                        En unos segundos se abrirá
                        WhatsApp para continuar con
                        la confirmación.
                    </p>

                    <div className="checkout-success-order">

                        <span>
                            Número de pedido
                        </span>

                        <strong>
                            #{createdOrder.id}
                        </strong>

                    </div>

                    <div className="checkout-success-info">

                        <div>
                            <span>
                                Estado
                            </span>

                            <strong>
                                Pendiente
                            </strong>
                        </div>

                        <div>
                            <span>
                                Total
                            </span>

                            <strong>
                                {formatPrice(
                                    createdOrder.totalAmount
                                )}
                            </strong>
                        </div>

                    </div>

                    <div className="checkout-success-whatsapp">

                        <FiMessageCircle />

                        <div>
                            <strong>
                                Abriendo WhatsApp...
                            </strong>

                            <span>
                                Ahí podrás confirmar
                                disponibilidad, entrega
                                y forma de pago.
                            </span>
                        </div>

                    </div>

                    <div className="checkout-success-actions">

                        <button
                            type="button"
                            className="checkout-success-primary"
                            onClick={() =>
                                window.open(
                                    whatsappUrl,
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                        >
                            <FiMessageCircle />
                            Abrir WhatsApp
                        </button>

                        <button
                            type="button"
                            className="checkout-success-secondary"
                            onClick={() =>
                                navigate(
                                    "/pedidos"
                                )
                            }
                        >
                            <FiPackage />
                            Ver mis pedidos
                        </button>

                    </div>

                    <button
                        type="button"
                        className="checkout-success-home"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Volver al inicio
                    </button>

                </section>

            </main>
        );
    }

    /*
     * =====================================
     * CARRITO VACÍO
     * =====================================
     */
    if (cartItems.length === 0) {
        return (
            <main className="checkout-empty">

                <div className="checkout-empty-card">

                    <span className="checkout-empty-icon">
                        <FiCheck />
                    </span>

                    <h1>
                        Tu carrito está vacío
                    </h1>

                    <p>
                        Agrega algunos productos
                        antes de continuar con tu
                        pedido.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/catalogo"
                            )
                        }
                    >
                        Ver catálogo
                    </button>

                </div>

            </main>
        );
    }

    return (
        <main className="checkout-page">

            {/* =================================
                MODAL LOGIN
            ================================== */}

            {showLoginRequired && (
                <div
                    className="checkout-auth-overlay"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setShowLoginRequired(
                                false
                            );
                        }
                    }}
                >
                    <div
                        className="checkout-auth-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="checkout-auth-title"
                    >

                        <button
                            type="button"
                            className="checkout-auth-close"
                            onClick={() =>
                                setShowLoginRequired(
                                    false
                                )
                            }
                            aria-label="Cerrar"
                        >
                            <FiX />
                        </button>

                        <div className="checkout-auth-icon">
                            <FiLock />
                        </div>

                        <span className="checkout-auth-eyebrow">
                            Un último paso
                        </span>

                        <h2 id="checkout-auth-title">
                            Inicia sesión para completar
                            tu pedido
                        </h2>

                        <p>
                            Necesitamos asociar el pedido
                            con tu cuenta para que puedas
                            consultar su estado y darle
                            seguimiento después.
                        </p>

                        <div className="checkout-auth-benefit">
                            <FiPackage />

                            <div>
                                <strong>
                                    Tu carrito está seguro
                                </strong>

                                <span>
                                    No perderás los productos
                                    que ya agregaste.
                                </span>
                            </div>
                        </div>

                        <div className="checkout-auth-actions">

                            <button
                                type="button"
                                className="checkout-auth-login"
                                onClick={() =>
                                    navigate(
                                        "/login",
                                        {
                                            state: {
                                                from:
                                                    "/checkout",
                                            },
                                        }
                                    )
                                }
                            >
                                <FiUser />
                                Iniciar sesión
                            </button>

                            <button
                                type="button"
                                className="checkout-auth-register"
                                onClick={() =>
                                    navigate(
                                        "/register",
                                        {
                                            state: {
                                                from:
                                                    "/checkout",
                                            },
                                        }
                                    )
                                }
                            >
                                Crear una cuenta
                            </button>

                        </div>

                        <button
                            type="button"
                            className="checkout-auth-continue"
                            onClick={() =>
                                setShowLoginRequired(
                                    false
                                )
                            }
                        >
                            Seguir revisando mi pedido
                        </button>

                    </div>
                </div>
            )}

            {/* =================================
                HEADER
            ================================== */}

            <section className="checkout-header">

                <div className="checkout-container">

                    <button
                        type="button"
                        className="checkout-back"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        <FiArrowLeft />
                        Volver
                    </button>

                    <span className="checkout-eyebrow">
                        Finalizar pedido
                    </span>

                    <h1>
                        Revisa tu compra y completa
                        tus datos.
                    </h1>

                    <p>
                        El pedido se registrará y
                        después se abrirá WhatsApp
                        para confirmar disponibilidad,
                        entrega y forma de pago.
                    </p>

                </div>

            </section>

            {/* =================================
                CONTENIDO
            ================================== */}

            <section className="checkout-content">

                <div className="checkout-container checkout-layout">

                    <form
                        className="checkout-form"
                        onSubmit={handleSubmit}
                    >

                        {/* =========================
                            DATOS DE CONTACTO
                        ========================== */}

                        <div className="checkout-form-section">

                            <div className="checkout-section-heading">

                                <span>
                                    01
                                </span>

                                <div>
                                    <h2>
                                        Datos de contacto
                                    </h2>

                                    <p>
                                        Usaremos estos
                                        datos para confirmar
                                        tu pedido.
                                    </p>
                                </div>

                            </div>

                            <div className="checkout-form-grid">

                                <div className="checkout-field">

                                    <label htmlFor="name">
                                        Nombre completo
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={
                                            customer.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Tu nombre"
                                    />

                                    {errors.name && (
                                        <span className="checkout-error">
                                            {errors.name}
                                        </span>
                                    )}

                                </div>

                                <div className="checkout-field">

                                    <label htmlFor="phone">
                                        Teléfono
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={
                                            customer.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="55 1234 5678"
                                    />

                                    {errors.phone && (
                                        <span className="checkout-error">
                                            {errors.phone}
                                        </span>
                                    )}

                                </div>

                                <div className="checkout-field checkout-field--full">

                                    <label htmlFor="email">
                                        Correo electrónico
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={
                                            customer.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="correo@ejemplo.com"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* =========================
                            FORMA DE ENTREGA
                        ========================== */}

                        <div className="checkout-form-section">

                            <div className="checkout-section-heading">

                                <span>
                                    02
                                </span>

                                <div>
                                    <h2>
                                        Forma de entrega
                                    </h2>

                                    <p>
                                        El costo final puede
                                        variar según la
                                        ubicación.
                                    </p>
                                </div>

                            </div>

                            <div className="checkout-delivery-options">

                                <label
                                    className={`checkout-delivery-card ${
                                        customer.deliveryMethod ===
                                        "Entrega a domicilio"
                                            ? "checkout-delivery-card--active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        type="radio"
                                        name="deliveryMethod"
                                        value="Entrega a domicilio"
                                        checked={
                                            customer.deliveryMethod ===
                                            "Entrega a domicilio"
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <span>
                                        <strong>
                                            Entrega a domicilio
                                        </strong>

                                        <small>
                                            La tarifa se confirma
                                            según la ubicación.
                                        </small>
                                    </span>

                                </label>

                                <label
                                    className={`checkout-delivery-card ${
                                        customer.deliveryMethod ===
                                        "Entrega por acordar"
                                            ? "checkout-delivery-card--active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        type="radio"
                                        name="deliveryMethod"
                                        value="Entrega por acordar"
                                        checked={
                                            customer.deliveryMethod ===
                                            "Entrega por acordar"
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <span>
                                        <strong>
                                            Entrega por acordar
                                        </strong>

                                        <small>
                                            Definiremos el punto
                                            por WhatsApp.
                                        </small>
                                    </span>

                                </label>

                            </div>

                            {customer.deliveryMethod ===
                                "Entrega a domicilio" && (

                                <div className="checkout-form-grid">

                                    <div className="checkout-field checkout-field--full">

                                        <label htmlFor="address">
                                            Dirección
                                        </label>

                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            value={
                                                customer.address
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Calle, número y colonia"
                                        />

                                        {errors.address && (
                                            <span className="checkout-error">
                                                {errors.address}
                                            </span>
                                        )}

                                    </div>

                                    <div className="checkout-field">

                                        <label htmlFor="municipality">
                                            Municipio o alcaldía
                                        </label>

                                        <input
                                            id="municipality"
                                            name="municipality"
                                            type="text"
                                            value={
                                                customer.municipality
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Ej. Nezahualcóyotl"
                                        />

                                    </div>

                                    <div className="checkout-field">

                                        <label htmlFor="references">
                                            Referencias
                                        </label>

                                        <input
                                            id="references"
                                            name="references"
                                            type="text"
                                            value={
                                                customer.references
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Portón, negocio cercano..."
                                        />

                                    </div>

                                </div>
                            )}

                        </div>

                        {/* =========================
                            COMENTARIOS
                        ========================== */}

                        <div className="checkout-form-section">

                            <div className="checkout-section-heading">

                                <span>
                                    03
                                </span>

                                <div>
                                    <h2>
                                        Comentarios
                                    </h2>

                                    <p>
                                        Puedes agregar
                                        indicaciones sobre
                                        acabado, entrega o
                                        disponibilidad.
                                    </p>
                                </div>

                            </div>

                            <div className="checkout-field">

                                <label htmlFor="notes">
                                    Notas adicionales
                                </label>

                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={
                                        customer.notes
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="6"
                                    placeholder="Escribe aquí cualquier detalle importante."
                                />

                            </div>

                        </div>

                        {/* =========================
                            ERROR BACKEND
                        ========================== */}

                        {submitError && (
                            <div className="checkout-submit-error">
                                {submitError}
                            </div>
                        )}

                        {/* =========================
                            CONFIRMAR
                        ========================== */}

                        <button
                            type="submit"
                            className="checkout-submit"
                            disabled={
                                submitting ||
                                authLoading
                            }
                        >
                            {submitting ? (
                                <>
                                    <span className="checkout-spinner" />
                                    Registrando pedido...
                                </>
                            ) : authLoading ? (
                                <>
                                    Verificando sesión...
                                </>
                            ) : (
                                <>
                                    <FiMessageCircle />

                                    {user
                                        ? "Confirmar por WhatsApp"
                                        : "Continuar con mi pedido"}
                                </>
                            )}
                        </button>

                        <p className="checkout-disclaimer">
                            Al confirmar, tu pedido
                            quedará registrado. No se
                            realizará ningún cargo
                            desde esta página.
                        </p>

                    </form>

                    {/* =========================
                        RESUMEN
                    ========================== */}

                    <aside className="checkout-summary">

                        <div className="checkout-summary-card">

                            <div className="checkout-summary-header">

                                <div>
                                    <span>
                                        Tu pedido
                                    </span>

                                    <h2>
                                        Resumen
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        clearCart
                                    }
                                >
                                    Vaciar
                                </button>

                            </div>

                            <div className="checkout-products">

                                {cartItems.map(
                                    (item) => (

                                        <article
                                            className="checkout-product"
                                            key={
                                                item.id
                                            }
                                        >

                                            <img
                                                src={
                                                    item.image
                                                }
                                                alt={
                                                    item.name
                                                }
                                            />

                                            <div className="checkout-product-info">

                                                <h3>
                                                    {item.name}
                                                </h3>

                                                <span>
                                                    {formatPrice(
                                                        item.price
                                                    )}
                                                </span>

                                                <div className="checkout-product-actions">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                item.id
                                                            )
                                                        }
                                                        aria-label="Disminuir cantidad"
                                                    >
                                                        <FiMinus />
                                                    </button>

                                                    <strong>
                                                        {item.quantity}
                                                    </strong>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                item.id
                                                            )
                                                        }
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        <FiPlus />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="checkout-product-remove"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        }
                                                        aria-label="Eliminar producto"
                                                    >
                                                        <FiTrash2 />
                                                    </button>

                                                </div>

                                            </div>

                                        </article>
                                    )
                                )}

                            </div>

                            <div className="checkout-total">

                                <span>
                                    Total estimado
                                </span>

                                <strong>
                                    {formatPrice(
                                        cartTotal
                                    )}
                                </strong>

                            </div>

                            <p className="checkout-total-note">
                                El costo de envío no está
                                incluido.
                            </p>

                        </div>

                    </aside>

                </div>

            </section>

        </main>
    );
}

export default Checkout;