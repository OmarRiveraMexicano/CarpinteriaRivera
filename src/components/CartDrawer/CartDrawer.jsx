import "./CartDrawer.css";

import {
    FiX,
    FiTrash2,
    FiMinus,
    FiPlus,
    FiShoppingBag,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";

import { useNavigate } from "react-router-dom";

function CartDrawer() {
    const {
        cartItems,
        cartTotal,
        isCartOpen,
        closeCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
    } = useCart();

    const navigate = useNavigate();

    const formatPrice = (price) =>
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
        }).format(price);

    return (
        <>
            <div
                className={`cart-overlay ${
                    isCartOpen ? "cart-overlay--visible" : ""
                }`}
                onClick={closeCart}
                aria-hidden="true"
            />

            <aside
                className={`cart-drawer ${
                    isCartOpen ? "cart-drawer--open" : ""
                }`}
                aria-hidden={!isCartOpen}
                aria-label="Carrito de compras"
            >
                <div className="cart-drawer-header">
                    <div>
                        <span>Tu selección</span>
                        <h2>Carrito</h2>
                    </div>

                    <button
                        type="button"
                        className="cart-drawer-close"
                        onClick={closeCart}
                        aria-label="Cerrar carrito"
                    >
                        <FiX />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <div className="cart-empty-icon">
                            <FiShoppingBag />
                        </div>

                        <h3>Tu carrito está vacío</h3>

                        <p>
                            Agrega una pieza y aparecerá aquí.
                        </p>

                        <button
                            type="button"
                            onClick={closeCart}
                            className="cart-empty-button"
                        >
                            Seguir explorando
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <article
                                    className="cart-item"
                                    key={item.id}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />

                                    <div className="cart-item-content">
                                        <div className="cart-item-top">
                                            <div>
                                                <span className="cart-item-category">
                                                    {item.category}
                                                </span>

                                                <h3>{item.name}</h3>
                                            </div>

                                            <button
                                                type="button"
                                                className="cart-item-remove"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                aria-label={`Eliminar ${item.name}`}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>

                                        <div className="cart-item-bottom">
                                            <div className="cart-quantity">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item.id
                                                        )
                                                    }
                                                    aria-label={`Disminuir cantidad de ${item.name}`}
                                                >
                                                    <FiMinus />
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.id
                                                        )
                                                    }
                                                    aria-label={`Aumentar cantidad de ${item.name}`}
                                                >
                                                    <FiPlus />
                                                </button>
                                            </div>

                                            <strong>
                                                {formatPrice(
                                                    item.price *
                                                        item.quantity
                                                )}
                                            </strong>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="cart-drawer-footer">
                            <button
                                type="button"
                                className="cart-clear"
                                onClick={clearCart}
                            >
                                Vaciar carrito
                            </button>

                            <div className="cart-total-row">
                                <span>Total</span>
                                <strong>
                                    {formatPrice(cartTotal)}
                                </strong>
                            </div>

                            <p className="cart-note">
                                El envío y los detalles finales se
                                calcularán después.
                            </p>

                            <button
                                type="button"
                                className="cart-checkout"
                                onClick={() => {
                                    closeCart();
                                    navigate("/checkout");
                                }}
                            >
                                Continuar con la compra
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}

export default CartDrawer;