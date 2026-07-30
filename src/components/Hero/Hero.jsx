import "./Hero.css";
import { FiArrowRight, FiMessageCircle, FiChevronDown } from "react-icons/fi";
import {useNavigate} from "react-router-dom";



function Hero() {
    const navigate = useNavigate();
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
                        Diseñamos y fabricamos muebles de madera con atención
                        al detalle, materiales de calidad y acabados pensados
                        para durar.
                    </p>

                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => navigate("/catalogo")}>
                            Ver proyectos
                            <FiArrowRight />
                        </button>

                        <a href="#contacto" className="btn btn-secondary">
                            <FiMessageCircle />
                            Contactar
                        </a>
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
                    <div className="hero-shape"></div>

                    <div className="hero-image">
                        <img
                            src="/hero.jpg"
                            alt="Muebles de madera personalizados"
                        />

                        <div className="hero-image-label">
                            <span>Proyecto destacado</span>
                            <strong>Diseño y fabricación en madera</strong>
                        </div>
                    </div>
                </div>

            </div>

            <a href="#proyectos" className="scroll-indicator">
                <FiChevronDown />
                <span>Descubrir</span>
            </a>
        </section>
    );
}

export default Hero;