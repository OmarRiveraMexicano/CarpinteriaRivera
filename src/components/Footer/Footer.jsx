import "./Footer.css";

import {
    FiArrowUpRight,
    FiInstagram,
    FiMail,
    FiMapPin,
    FiPhone,
} from "react-icons/fi";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="footer"
            id="contacto"
        >
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <a
                            href="#inicio"
                            className="footer-logo"
                        >
                            Carpintería
                        </a>

                        <p>
                            Diseñamos y fabricamos piezas funcionales,
                            cálidas y pensadas para acompañar tus espacios.
                        </p>

                        <a
                            href="#servicios"
                            className="footer-quote-link"
                        >
                            Solicitar un diseño
                            <FiArrowUpRight />
                        </a>
                    </div>

                    <div className="footer-column">
                        <span className="footer-column-title">
                            Navegación
                        </span>

                        <nav className="footer-links">
                            <a href="#inicio">
                                Inicio
                            </a>

                            <a href="#productos">
                                Productos
                            </a>

                            <a href="#servicios">
                                Personalizados
                            </a>

                            <a href="#contacto">
                                Contacto
                            </a>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <span className="footer-column-title">
                            Contacto
                        </span>

                        <div className="footer-contact-list">
                            <a
                                href="mailto:contacto@carpinteria.com"
                                className="footer-contact-item"
                            >
                                <FiMail />

                                <span>
                                    contacto@carpinteria.com
                                </span>
                            </a>

                            <a
                                href="tel:+52552296179633"
                                className="footer-contact-item"
                            >
                                <FiPhone />

                                <span>
                                    +52 2296179633
                                </span>
                            </a>

                            <div className="footer-contact-item">
                                <FiMapPin />

                                <span>
                                    Estado de México
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-column">
                        <span className="footer-column-title">
                            Síguenos
                        </span>

                        <div className="footer-socials">
                            <a
                                href="https://instagram.com/omsrrivera/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                            >
                                <FiInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {currentYear} Carpintería. Todos los derechos reservados.
                    </p>

                    <p>
                        Diseñado y desarrollado por Omar Rivera.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;