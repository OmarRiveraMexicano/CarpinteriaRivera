import "./Hero.css";

import {
    FiArrowRight,
    FiMessageCircle,
    FiChevronDown,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    const heroImage = `${import.meta.env.BASE_URL}hero.jpg`;

    const goToContact = () => {
        document
            .getElementById("contacto")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    const goToProjects = () => {
        document
            .getElementById("proyectos")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    return (
        <section className="hero" id="inicio">
            <div className="hero-content">
                <div className="hero-text">
                    <span className="hero-tag">
                        Muebles personalizados
                    </span>

                    <h1>
                        Muebles hechos a mano
                        <span> para toda la vida.</span>
                    </h1>

                    <p>
                        Diseñamos y fabricamos muebles de madera con
                        atención al detalle, materiales de calidad y
                        acabados pensados para durar.
                    </p>

                    <div className="hero-buttons">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/catalogo")}
                        >
                            Ver proyectos
                            <FiArrowRight />
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={goToContact}
                        >
                            <FiMessageCircle />
                            Contactar
                        </button>
                    </div>

                    <div className="hero-details">
                        <div>
                            <strong>100%</strong>
                            <span>Hecho a mano</span>
                        </div>

                        <div>
                            <strong>A medida</strong>
                            <span>Diseños personalizados</span>
                        </div>

                        <div>
                            <strong>Calidad</strong>
                            <span>Materiales seleccionados</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-shape" />

                    <div className="hero-image">
                        <img
                            src={heroImage}
                            alt="Muebles de madera personalizados"
                        />

                        <div className="hero-image-label">
                            <span>Proyecto destacado</span>

                            <strong>
                                Diseño y fabricación en madera
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="scroll-indicator"
                onClick={goToProjects}
                aria-label="Ir a proyectos"
            >
                <FiChevronDown />
                <span>Descubrir</span>
            </button>
        </section>
    );
}

export default Hero;