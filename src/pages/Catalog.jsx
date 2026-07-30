import products from "../data/products";
import ProductCard from "../components/ProductCart/ProductCar";
import "./Catalog.css";

function Catalog() {
    return (
        <main className="catalog-page">
            <header className="catalog-header">
                <span className="catalog-label">
                    Nuestra colección
                </span>

                <h1>
                    Muebles hechos para durar
                </h1>

                <p>
                    Explora piezas de madera diseñadas para espacios
                    funcionales, cálidos y personales.
                </p>
            </header>

            <section className="catalog-content">
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
            </section>
        </main>
    );
}

export default Catalog;