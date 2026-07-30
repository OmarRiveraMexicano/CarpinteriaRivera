import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiArrowLeft,
    FiCheck,
    FiMessageCircle,
    FiMinus,
    FiPlus,
    FiTrash2,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";

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

    useEffect(() => {
        document.title = "Finalizar pedido | Carpintería";
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCustomer((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!customer.name.trim()) {
            newErrors.name = "Ingresa tu nombre.";
        }

        if (!customer.phone.trim()) {
            newErrors.phone = "Ingresa tu teléfono.";
        }

        if (
            customer.deliveryMethod === "Entrega a domicilio" &&
            !customer.address.trim()
        ) {
            newErrors.address = "Ingresa la dirección de entrega.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const productsText = cartItems
            .map((item) => {
                const subtotal = item.price * item.quantity;

                return [
                    `• ${item.name}`,
                    `  Cantidad: ${item.quantity}`,
                    `  Subtotal: ${formatPrice(subtotal)}`,
                ].join("\n");
            })
            .join("\n\n");

        const deliveryText =
            customer.deliveryMethod === "Entrega a domicilio"
                ? [
                      `Dirección: ${customer.address}`,
                      `Municipio: ${
                          customer.municipality || "No especificado"
                      }`,
                      `Referencias: ${
                          customer.references || "Sin referencias"
                      }`,
                  ].join("\n")
                : "La entrega se acordará directamente.";

        const message = `
Hola, quiero confirmar el siguiente pedido:

${productsText}

TOTAL: ${formatPrice(cartTotal)}

DATOS DEL CLIENTE
Nombre: ${customer.name}
Teléfono: ${customer.phone}
Correo: ${customer.email || "No especificado"}

ENTREGA
Modalidad: ${customer.deliveryMethod}
${deliveryText}

COMENTARIOS
${customer.notes || "Sin comentarios adicionales"}
        `.trim();

        const whatsappNumber = "521XXXXXXXXXX";

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
        )}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    if (cartItems.length === 0) {
        return (
            <main className="checkout-empty">
                <div className="checkout-empty-card">
                    <span className="checkout-empty-icon">
                        <FiCheck />
                    </span>

                    <h1>Tu carrito está vacío</h1>

                    <p>
                        Agrega algunos productos antes de continuar con
                        tu pedido.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/catalogo")}
                    >
                        Ver catálogo
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <section className="checkout-header">
                <div className="checkout-container">
                    <button
                        type="button"
                        className="checkout-back"
                        onClick={() => navigate(-1)}
                    >
                        <FiArrowLeft />
                        Volver
                    </button>

                    <span className="checkout-eyebrow">
                        Finalizar pedido
                    </span>

                    <h1>
                        Revisa tu compra y completa tus datos.
                    </h1>

                    <p>
                        El pedido se enviará por WhatsApp para confirmar
                        disponibilidad, entrega y forma de pago.
                    </p>
                </div>
            </section>

            <section className="checkout-content">
                <div className="checkout-container checkout-layout">
                    <form
                        className="checkout-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="checkout-form-section">
                            <div className="checkout-section-heading">
                                <span>01</span>

                                <div>
                                    <h2>Datos de contacto</h2>

                                    <p>
                                        Usaremos estos datos para confirmar
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
                                        value={customer.name}
                                        onChange={handleChange}
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
                                        value={customer.phone}
                                        onChange={handleChange}
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
                                        value={customer.email}
                                        onChange={handleChange}
                                        placeholder="correo@ejemplo.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="checkout-form-section">
                            <div className="checkout-section-heading">
                                <span>02</span>

                                <div>
                                    <h2>Forma de entrega</h2>

                                    <p>
                                        El costo final puede variar según
                                        la ubicación.
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
                                        onChange={handleChange}
                                    />

                                    <span>
                                        <strong>
                                            Entrega a domicilio
                                        </strong>

                                        <small>
                                            La tarifa se confirma según
                                            la ubicación.
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
                                        onChange={handleChange}
                                    />

                                    <span>
                                        <strong>
                                            Entrega por acordar
                                        </strong>

                                        <small>
                                            Definiremos el punto por
                                            WhatsApp.
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
                                            value={customer.address}
                                            onChange={handleChange}
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
                                            value={customer.municipality}
                                            onChange={handleChange}
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
                                            value={customer.references}
                                            onChange={handleChange}
                                            placeholder="Portón, negocio cercano..."
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="checkout-form-section">
                            <div className="checkout-section-heading">
                                <span>03</span>

                                <div>
                                    <h2>Comentarios</h2>

                                    <p>
                                        Puedes agregar indicaciones sobre
                                        acabado, entrega o disponibilidad.
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
                                    value={customer.notes}
                                    onChange={handleChange}
                                    rows="6"
                                    placeholder="Escribe aquí cualquier detalle importante."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="checkout-submit"
                        >
                            <FiMessageCircle />
                            Confirmar por WhatsApp
                        </button>

                        <p className="checkout-disclaimer">
                            No se realizará ningún cargo desde esta
                            página.
                        </p>
                    </form>

                    <aside className="checkout-summary">
                        <div className="checkout-summary-card">
                            <div className="checkout-summary-header">
                                <div>
                                    <span>Tu pedido</span>
                                    <h2>Resumen</h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={clearCart}
                                >
                                    Vaciar
                                </button>
                            </div>

                            <div className="checkout-products">
                                {cartItems.map((item) => (
                                    <article
                                        className="checkout-product"
                                        key={item.id}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                        <div className="checkout-product-info">
                                            <h3>{item.name}</h3>

                                            <span>
                                                {formatPrice(item.price)}
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
                                ))}
                            </div>

                            <div className="checkout-total">
                                <span>Total estimado</span>

                                <strong>
                                    {formatPrice(cartTotal)}
                                </strong>
                            </div>

                            <p className="checkout-total-note">
                                El costo de envío no está incluido.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

export default Checkout;