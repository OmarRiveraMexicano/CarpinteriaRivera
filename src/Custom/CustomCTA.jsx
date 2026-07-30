import "./CustomCTA.css";

import { useNavigate } from "react-router-dom";

import {
    FiArrowUpRight,
    FiCheck,
} from "react-icons/fi";

import workshopImage from "/omar.jpg";

function CustomCTA() {
    const navigate = useNavigate();

    return (
        <section
            className="custom-cta"
            id="servicios"
        >
            <div className="custom-cta-container">
                <div className="custom-cta-content">
                    <span className="custom-cta-label">
                        Diseño personalizado
                    </span>

                    <h2>
                        Una pieza pensada especialmente para ti.
                    </h2>

                    <p>
                        Cuéntanos qué necesitas y diseñamos una
                        propuesta adaptada a tu espacio, estilo y
                        presupuesto.
                    </p>

                    <div className="custom-cta-features">
                        <span>
                            <FiCheck />
                            Medidas personalizadas
                        </span>

                        <span>
                            <FiCheck />
                            Selección de materiales
                        </span>

                        <span>
                            <FiCheck />
                            Diseño funcional
                        </span>
                    </div>

                    <button
                        type="button"
                        className="custom-cta-button"
                        onClick={() => navigate("/cotizacion")}
                    >
                        Solicitar cotización
                        <FiArrowUpRight />
                    </button>
                </div>

                <div className="custom-cta-visual">
                    <div
                        className="custom-cta-image"
                        style={{
                            backgroundImage: `
                                linear-gradient(
                                    to top,
                                    rgba(37, 22, 16, 0.18),
                                    rgba(37, 22, 16, 0.02)
                                ),
                                url(${workshopImage})
                            `,
                        }}
                    >
                        <span className="custom-cta-image-label">
                            Hecho a tu medida
                        </span>
                    </div>

                    <div className="custom-cta-note">
                        <span>01</span>

                        <p>
                            De una idea inicial a una pieza construida
                            especialmente para tu espacio.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomCTA;