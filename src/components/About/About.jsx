import { Link } from "react-router-dom";
import {
    FiArrowUpRight,
    FiBookOpen,
    FiCode,
    FiTool,
} from "react-icons/fi";

import "./About.css";

function About() {
    const baseUrl = import.meta.env.BASE_URL;

    return (
        <main className="about-page">
            <section className="about-hero">
                <div className="about-container">
                    <div className="about-heading">
                        <span className="about-label">
                            Detrás del taller
                        </span>

                        <h1>
                            Madera, diseño
                            <br />
                            y muchas ganas
                            <br />
                            de crear.
                        </h1>
                    </div>

                    <div className="about-introduction">
                        <p>
                            Soy estudiante de Ingeniería en Computación,
                            aficionado a la carpintería y creador de este
                            proyecto.
                        </p>

                        <span>
                            Estado de México · 21 años
                        </span>
                    </div>
                </div>
            </section>

            <section className="about-story">
                <div className="about-container about-story-grid">
                    <div className="about-gallery">
                        <figure className="about-image about-image-main">
                            <img
                                src={`${baseUrl}trabajo.jpg`}
                                alt="Creador del taller trabajando en uno de sus proyectos"
                                loading="lazy"
                            />
                        </figure>

                        <figure className="about-image about-image-small">
                            <img
                                src={`${baseUrl}guapo.jpg`}
                                alt="Retrato del creador del proyecto"
                                loading="lazy"
                            />
                        </figure>

                        <figure className="about-image about-image-detail">
                            <img
                                src={`${baseUrl}taladro.jpg`}
                                alt="Trabajo con un taladro sobre una pieza de madera"
                                loading="lazy"
                            />
                        </figure>
                    </div>

                    <div className="about-copy">
                        <span className="about-section-number">
                            01 — Mi historia
                        </span>

                        <h2>
                            Entre código,
                            <br />
                            serrín y proyectos.
                        </h2>

                        <p>
                            Tengo 21 años y estudio Ingeniería en Computación
                            en la FES Aragón de la UNAM. Gran parte de mi tiempo
                            lo paso aprendiendo sobre tecnología, desarrollando
                            software y buscando nuevas formas de convertir una
                            idea en algo funcional.
                        </p>

                        <p>
                            La carpintería comenzó como una afición: medir,
                            cortar, lijar y resolver cómo construir algo con mis
                            propias manos. Poco a poco se convirtió en una forma
                            de expresarme y en un espacio donde puedo combinar
                            paciencia, creatividad y atención a los detalles.
                        </p>

                        <p>
                            Este proyecto nace de esa mezcla. Por un lado, mi
                            formación como ingeniero; por otro, el gusto por la
                            madera y los objetos hechos para durar. Cada pieza
                            representa aprendizaje, trabajo y el deseo de hacer
                            las cosas cada vez mejor.
                        </p>

                        <blockquote>
                            “No busco fabricar cosas en serie. Busco crear
                            piezas honestas, útiles y con personalidad.”
                        </blockquote>
                    </div>
                </div>
            </section>

            <section className="about-values">
                <div className="about-container">
                    <div className="about-values-heading">
                        <span>Lo que me define</span>

                        <h2>
                            Dos mundos, una misma forma de trabajar.
                        </h2>
                    </div>

                    <div className="about-values-grid">
                        <article className="about-value-card">
                            <FiCode />
                            <span>01</span>
                            <h3>Tecnología</h3>

                            <p>
                                Estudiar ingeniería me enseñó a analizar
                                problemas, construir soluciones y mejorar cada
                                proceso paso a paso.
                            </p>
                        </article>

                        <article className="about-value-card">
                            <FiTool />
                            <span>02</span>
                            <h3>Carpintería</h3>

                            <p>
                                Trabajar con madera me ha enseñado paciencia,
                                precisión y respeto por los materiales.
                            </p>
                        </article>

                        <article className="about-value-card">
                            <FiBookOpen />
                            <span>03</span>
                            <h3>Aprendizaje</h3>

                            <p>
                                Todavía estoy construyendo mi camino. Cada
                                proyecto es una oportunidad para aprender algo
                                y hacerlo mejor que la vez anterior.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <div className="about-container about-cta-content">
                    <div>
                        <span>Hagamos algo especial</span>

                        <h2>
                            ¿Tienes una idea
                            <br />
                            para tu espacio?
                        </h2>
                    </div>

                    <Link
                        to="/catalogo"
                        className="about-cta-link"
                    >
                        Explorar piezas
                        <FiArrowUpRight />
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default About;
