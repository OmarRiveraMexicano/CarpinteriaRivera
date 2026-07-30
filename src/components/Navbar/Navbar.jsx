import "./Navbar.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    FiMenu,
    FiX,
    FiShoppingBag,
} from "react-icons/fi";

import { GiWoodBeam } from "react-icons/gi";

import { useCart } from "../../context/CartContext";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const {
        cartItemsCount,
        toggleCart,
    } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const goToPage = (path) => {
        navigate(path);
        closeMenu();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const goToSection = (sectionId) => {
        closeMenu();

        /*
         * Si ya estamos en la página principal,
         * solamente hacemos scroll.
         */
        if (location.pathname === "/") {
            const section = document.getElementById(sectionId);

            section?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            return;
        }

        /*
         * Si estamos en otra página, regresamos al inicio
         * y después buscamos la sección.
         */
        navigate(`/#${sectionId}`);

        setTimeout(() => {
            const section = document.getElementById(sectionId);

            section?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    return (
        <header
            className={`navbar ${
                scrolled ? "navbar--scrolled" : ""
            }`}
        >
            <div className="navbar-container">
                <button
                    type="button"
                    className="navbar-logo"
                    onClick={() => goToPage("/")}
                    aria-label="Ir al inicio"
                >
                    <GiWoodBeam className="navbar-logo-icon" />

                    <div className="navbar-logo-text">
                        <strong>Omar Carpintería</strong>
                        <span>Hecho a mano</span>
                    </div>
                </button>

                <nav
                    className={`navbar-menu ${
                        menuOpen ? "navbar-menu--open" : ""
                    }`}
                    aria-label="Navegación principal"
                >
                    <ul className="navbar-links">
                        <li>
                            <button
                                type="button"
                                onClick={() => goToPage("/")}
                            >
                                Inicio
                            </button>
                        </li>

                        <li>
                            <button
                                type="button"
                                onClick={() => goToPage("/catalogo")}
                            >
                                Tienda
                            </button>
                        </li>


                        <li>
                            <button
                                type="button"
                                onClick={() =>
                                    goToSection("servicios")
                                }
                            >
                                Servicios
                            </button>
                        </li>

                        <li>
                            <button
                                type="button"
                                onClick={() => goToPage("/about")}
                            >
                                Sobre mí
                            </button>
                        </li>

                        <li>
                            <button
                                type="button"
                                onClick={() =>
                                    goToSection("contacto")
                                }
                            >
                                Contacto
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="navbar-actions">
                    <button
                        type="button"
                        className="cart-button"
                        onClick={toggleCart}
                        aria-label={`Carrito con ${cartItemsCount} productos`}
                    >
                        <FiShoppingBag />

                        {cartItemsCount > 0 && (
                            <span className="cart-count">
                                {cartItemsCount}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        className="menu-button"
                        onClick={() =>
                            setMenuOpen((current) => !current)
                        }
                        aria-label={
                            menuOpen
                                ? "Cerrar menú"
                                : "Abrir menú"
                        }
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;