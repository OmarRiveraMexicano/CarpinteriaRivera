import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCart/ProductCar";
import { getProducts } from "../components/Services/productServices";

import "./Catalog.css";

function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProducts();

                setProducts(data);
            } catch (error) {
                console.error(error);

                setError(
                    "No fue posible cargar los productos."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return (
        <main className="catalog-page">
            <header className="catalog-header">
                <span className="catalog-label">
                    Nuestra colección
                </span>

                <h1>Muebles hechos para durar</h1>

                <p>
                    Explora piezas de madera diseñadas para espacios
                    funcionales, cálidos y personales.
                </p>
            </header>

            <section className="catalog-content">
                {loading && (
                    <p className="catalog-status">
                        Cargando productos...
                    </p>
                )}

                {error && (
                    <p className="catalog-status catalog-status--error">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <>
                        <div className="catalog-results">
                            <p>
                                {products.length} productos
                            </p>
                        </div>

                        <div className="catalog-grid">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}

export default Catalog;