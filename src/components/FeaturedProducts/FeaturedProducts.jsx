import "./FeaturedProducts.css";

import { FiArrowRight } from "react-icons/fi";

import ProductCard from "../ProductCart/ProductCar";

const featuredProducts = [
    {
        id: 1,
        name: "Repisa flotante",
        category: "Repisas",
        description: "Ideal para decorar cualquier espacio.",
        price: 850,
        image: "repisa.jpg",
        badge: "Nuevo",
    },
    {
        id: 2,
        name: "Mesa auxiliar",
        category: "Mesas",
        description: "Diseño minimalista en madera de pino.",
        price: 1900,
        image: "mesa.jpg",
        badge: "Popular",
    },
    {
        id: 3,
        name: "Casa para perro",
        category: "Mascotas",
        description:
            "Fabricada en madera resistente para exteriores.",
        price: 2300,
        image: "casa.jpg",
    },
    {
        id: 4,
        name: "Organizador de relojes",
        category: "Organizadores",
        description:
            "Perfecto para mantener tus relojes protegidos.",
        price: 650,
        image: "reloj.jpg",
    },
];

function FeaturedProducts() {
    return (
        <section
            className="featured-products"
            id="tienda"
        >
            <div className="featured-products-container">
                <div className="featured-products-header">
                    <div className="featured-products-heading">
                        <span className="featured-products-label">
                            Colección
                        </span>

                        <h2>
                            Productos
                            <br />
                            destacados
                        </h2>

                        <p>
                            Madera natural.
                            <br />
                            Diseño funcional.
                            <br />
                            Hecho a mano.
                        </p>
                    </div>

                    <a
                        href="#catalogo"
                        className="featured-products-link"
                    >
                        Ver catálogo
                        <FiArrowRight />
                    </a>
                </div>

                <div className="featured-products-grid">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedProducts;