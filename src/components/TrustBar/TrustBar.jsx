import "./TrustBar.css";

import {
    FiAward,
    FiTool,
    FiEdit3,
} from "react-icons/fi";

const benefits = [
    {
        id: 1,
        icon: <FiAward />,
        title: "Materiales de calidad",
        description:
            "Seleccionamos cuidadosamente cada material para ofrecer muebles resistentes, funcionales y con un excelente acabado.",
    },
    {
        id: 2,
        icon: <FiTool />,
        title: "Fabricación artesanal",
        description:
            "Cada pieza se elabora a mano, prestando atención a cada detalle durante todo el proceso de fabricación.",
    },
    {
        id: 3,
        icon: <FiEdit3 />,
        title: "Diseño personalizado",
        description:
            "Creamos muebles adaptados a tus espacios, necesidades y estilo, buscando siempre un resultado único.",
    },
];

function TrustBar() {
    return (
        <section
            className="trust-section"
            aria-labelledby="trust-title"
        >
            <div className="trust-container">
                {benefits.map((benefit) => (
                    <article
                        className="trust-card"
                        key={benefit.id}
                    >
                        <div className="trust-icon">
                            {benefit.icon}
                        </div>

                        <div className="trust-card-content">
                            <h3>{benefit.title}</h3>

                            <p>{benefit.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default TrustBar;