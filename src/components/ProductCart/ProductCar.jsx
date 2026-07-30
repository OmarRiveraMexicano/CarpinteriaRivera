import "./ProductCar.css";

import { Link } from "react-router-dom";
import { FiShoppingBag, FiEye } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <article className="product-card">
            <div className="product-card-image-wrapper">
                <Link
                    to={`/producto/${product.id}`}
                    className="product-card-image-link"
                    aria-label={`Ver detalles de ${product.name}`}
                >
                    <img
                        className="product-card-image"
                        src={product.image}
                        alt={product.name}
                    />
                </Link>

                {product.badge && (
                    <span className="product-card-badge">
                        {product.badge}
                    </span>
                )}

                <Link
                    to={`/producto/${product.id}`}
                    className="product-card-view"
                    aria-label={`Ver detalles de ${product.name}`}
                >
                    <FiEye />
                </Link>
            </div>

            <div className="product-card-content">
                <div className="product-card-info">
                    <span className="product-card-category">
                        {product.category}
                    </span>

                    <h3>
                        <Link
                            to={`/producto/${product.id}`}
                            className="product-card-title-link"
                        >
                            {product.name}
                        </Link>
                    </h3>

                    <p>{product.description}</p>
                </div>

                <div className="product-card-footer">
                    <span className="product-card-price">
                        {new Intl.NumberFormat("es-MX", {
                            style: "currency",
                            currency: "MXN",
                            maximumFractionDigits: 0,
                        }).format(product.price)}
                    </span>

                    <button
                        type="button"
                        className="product-card-button"
                        onClick={handleAddToCart}
                    >
                        <FiShoppingBag />
                        Agregar
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;