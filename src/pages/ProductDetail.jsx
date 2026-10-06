import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    FiArrowLeft,
    FiChevronRight,
    FiMinus,
    FiPlus,
    FiShoppingBag,
} from "react-icons/fi";

import ProductCard from "../components/ProductCart/ProductCar";

import {
    getProductById,
    getProducts,
} from "../components/Services/productServices";

import { useCart } from "../context/CartContext";

import "./ProductDetail.css";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] =
        useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");
                setQuantity(1);
                setSelectedImageIndex(0);

                const currentProduct =
                    await getProductById(id);

                setProduct(currentProduct);

                if (!currentProduct) {
                    setRelatedProducts([]);
                    return;
                }

                const allProducts = await getProducts();

                const sameCategoryProducts =
                    allProducts.filter(
                        (item) =>
                            item.category ===
                                currentProduct.category &&
                            item.id !== currentProduct.id
                    );

                const otherProducts = allProducts.filter(
                    (item) =>
                        item.category !==
                            currentProduct.category &&
                        item.id !== currentProduct.id
                );

                setRelatedProducts(
                    [
                        ...sameCategoryProducts,
                        ...otherProducts,
                    ].slice(0, 3)
                );
            } catch (error) {
                console.error(error);

                setError(
                    "No fue posible cargar el producto."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProduct();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [id]);

    if (loading) {
        return (
            <main className="product-detail-page">
                <div className="product-detail-container">
                    <p className="product-detail-status">
                        Cargando producto...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="product-not-found">
                <span>Error</span>

                <h1>{error}</h1>

                <button
                    type="button"
                    onClick={() => window.location.reload()}
                >
                    Intentar de nuevo
                </button>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="product-not-found">
                <span>Producto no encontrado</span>

                <h1>
                    La pieza que buscas no está disponible.
                </h1>

                <Link to="/catalogo">
                    Volver al catálogo
                </Link>
            </main>
        );
    }

    const productImages =
        product.images?.length > 0
            ? product.images
            : [product.image];

    const selectedImage =
        productImages[selectedImageIndex] ??
        productImages[0];

    const formattedPrice =
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
        }).format(product.price);

    const formattedSubtotal =
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
        }).format(product.price * quantity);

    const decreaseQuantity = () => {
        setQuantity((currentQuantity) =>
            Math.max(1, currentQuantity - 1)
        );
    };

    const increaseQuantity = () => {
        setQuantity((currentQuantity) =>
            Math.min(
                product.stock,
                currentQuantity + 1
            )
        );
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <main className="product-detail-page">
            <div className="product-detail-container">
                <nav
                    className="product-detail-breadcrumb"
                    aria-label="Ruta de navegación"
                >
                    <Link to="/">Inicio</Link>

                    <FiChevronRight />

                    <Link to="/catalogo">
                        Catálogo
                    </Link>

                    <FiChevronRight />

                    <span>{product.name}</span>
                </nav>

                <button
                    type="button"
                    className="product-detail-back"
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft />
                    Volver
                </button>

                <section className="product-detail">
                    <div className="product-detail-gallery">
                        <div className="product-detail-image-wrapper">
                            <img
                                key={selectedImage}
                                className="product-detail-image"
                                src={selectedImage}
                                alt={`${product.name} - vista ${
                                    selectedImageIndex + 1
                                }`}
                            />

                            {product.badge && (
                                <span className="product-detail-badge">
                                    {product.badge}
                                </span>
                            )}

                            {productImages.length > 1 && (
                                <span className="product-detail-image-counter">
                                    {selectedImageIndex + 1}
                                    {" / "}
                                    {productImages.length}
                                </span>
                            )}
                        </div>

                        {productImages.length > 1 && (
                            <div className="product-detail-thumbnails">
                                {productImages.map(
                                    (image, index) => (
                                        <button
                                            key={`${product.id}-${index}`}
                                            type="button"
                                            className={
                                                selectedImageIndex ===
                                                index
                                                    ? "product-detail-thumbnail active"
                                                    : "product-detail-thumbnail"
                                            }
                                            onClick={() =>
                                                setSelectedImageIndex(
                                                    index
                                                )
                                            }
                                            aria-label={`Mostrar vista ${
                                                index + 1
                                            } de ${product.name}`}
                                        >
                                            <img
                                                src={image}
                                                alt=""
                                            />
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <div className="product-detail-content">
                        <span className="product-detail-category">
                            {product.category}
                        </span>

                        <h1>{product.name}</h1>

                        <p className="product-detail-price">
                            {formattedPrice}
                        </p>

                        <p className="product-detail-description">
                            {product.description}
                        </p>

                        <div className="product-detail-stock">
                            <span
                                className={
                                    product.stock > 0
                                        ? "stock-indicator available"
                                        : "stock-indicator unavailable"
                                }
                            />

                            <div>
                                <strong>
                                    {product.stock > 0
                                        ? "Disponible"
                                        : "Agotado"}
                                </strong>

                                <p>
                                    {product.stock > 0
                                        ? `${product.stock} piezas disponibles`
                                        : "Este producto no tiene existencias"}
                                </p>
                            </div>
                        </div>

                        {product.stock > 0 && (
                            <div className="product-detail-purchase">
                                <div className="product-detail-quantity-section">
                                    <span className="product-detail-quantity-label">
                                        Cantidad
                                    </span>

                                    <div className="product-detail-quantity">
                                        <button
                                            type="button"
                                            onClick={
                                                decreaseQuantity
                                            }
                                            disabled={
                                                quantity === 1
                                            }
                                            aria-label="Disminuir cantidad"
                                        >
                                            <FiMinus />
                                        </button>

                                        <span>
                                            {quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={
                                                increaseQuantity
                                            }
                                            disabled={
                                                quantity ===
                                                product.stock
                                            }
                                            aria-label="Aumentar cantidad"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                </div>

                                <div className="product-detail-subtotal">
                                    <span>Subtotal</span>

                                    <strong>
                                        {formattedSubtotal}
                                    </strong>
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            className="product-detail-button"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            <FiShoppingBag />

                            {product.stock > 0
                                ? `Agregar ${quantity} al carrito`
                                : "Producto agotado"}
                        </button>
                    </div>
                </section>

                {relatedProducts.length > 0 && (
                    <section className="related-products">
                        <div className="related-products-heading">
                            <span>Descubre más</span>

                            <h2>
                                También te puede interesar
                            </h2>

                            <p>
                                Piezas cuidadosamente
                                seleccionadas para complementar
                                este producto.
                            </p>
                        </div>

                        <div className="related-products-grid">
                            {relatedProducts.map(
                                (relatedProduct) => (
                                    <ProductCard
                                        key={
                                            relatedProduct.id
                                        }
                                        product={
                                            relatedProduct
                                        }
                                    />
                                )
                            )}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}

export default ProductDetail;