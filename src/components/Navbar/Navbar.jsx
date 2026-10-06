import "./Navbar.css";

import { useEffect, useState } from "react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    FiMenu,
    FiX,
    FiShoppingBag,
    FiLogIn,
    FiUser,
    FiPackage,
    FiLogOut,
    FiChevronDown,
    FiBox,
    FiUsers,
    FiGrid,
} from "react-icons/fi";

import { GiWoodBeam } from "react-icons/gi";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const [scrolled, setScrolled] =
        useState(false);

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [accountOpen, setAccountOpen] =
        useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const {
        cartItemsCount,
        toggleCart,
    } = useCart();

    const {
        user,
        loading: authLoading,
        logout,
    } = useAuth();

    /*
     * Comprueba si el usuario actual
     * tiene rol de administrador.
     */
    const isAdmin =
        user?.role === "ADMIN";

    /*
     * DEBUG TEMPORAL
     *
     * USER:
     * role: USER
     * isAdmin: false
     *
     * ADMIN:
     * role: ADMIN
     * isAdmin: true
     */
    useEffect(() => {
        console.log(
            "=== AUTH DEBUG NAVBAR ==="
        );

        console.log(
            "user:",
            user
        );

        console.log(
            "role:",
            user?.role
        );

        console.log(
            "isAdmin:",
            isAdmin
        );

        console.log(
            "========================="
        );
    }, [
        user,
        isAdmin,
    ]);

    /*
     * Cambia el estilo del navbar
     * después de hacer scroll.
     */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(
                window.scrollY > 40
            );
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    /*
     * Cierra menús cuando cambia
     * la ruta.
     */
    useEffect(() => {
        setMenuOpen(false);
        setAccountOpen(false);
    }, [location.pathname]);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    /*
     * Navegación normal.
     */
    const goToPage = (path) => {
        navigate(path);

        closeMenu();
        setAccountOpen(false);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /*
     * Navegación hacia una sección
     * de la página principal.
     */
    const goToSection = (
        sectionId
    ) => {
        closeMenu();

        if (
            location.pathname === "/"
        ) {
            const section =
                document.getElementById(
                    sectionId
                );

            section?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            return;
        }

        navigate("/");

        setTimeout(() => {
            const section =
                document.getElementById(
                    sectionId
                );

            section?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    /*
     * Navegación a pedidos
     * según el rol.
     */
    const goToOrders = () => {
        const ordersRoute =
            isAdmin
                ? "/admin/pedidos"
                : "/pedidos";

        console.log(
            "Navegando a pedidos"
        );

        console.log(
            "Usuario:",
            user
        );

        console.log(
            "Rol:",
            user?.role
        );

        console.log(
            "isAdmin:",
            isAdmin
        );

        console.log(
            "Ruta elegida:",
            ordersRoute
        );

        goToPage(
            ordersRoute
        );
    };

    /*
     * Cierra sesión.
     */
    const handleLogout =
        async () => {
            setAccountOpen(false);
            setMenuOpen(false);

            await logout();

            navigate("/");
        };

    return (
        <header
            className={`navbar ${
                scrolled
                    ? "navbar--scrolled"
                    : ""
            }`}
        >
            <div className="navbar-container">

                {/* =========================
                    LOGO
                ========================== */}

                <button
                    type="button"
                    className="navbar-logo"
                    onClick={() =>
                        goToPage(
                            isAdmin
                                ? "/admin"
                                : "/"
                        )
                    }
                    aria-label={
                        isAdmin
                            ? "Ir al panel administrativo"
                            : "Ir al inicio"
                    }
                >
                    <GiWoodBeam
                        className="navbar-logo-icon"
                    />

                    <div className="navbar-logo-text">

                        <strong>
                            Omar Carpintería
                        </strong>

                        <span>
                            {isAdmin
                                ? "Administración"
                                : "Hecho a mano"}
                        </span>

                    </div>

                </button>

                {/* =========================
                    MENÚ PRINCIPAL
                ========================== */}

                <nav
                    className={`navbar-menu ${
                        menuOpen
                            ? "navbar-menu--open"
                            : ""
                    }`}
                    aria-label="Navegación principal"
                >
                    <ul className="navbar-links">

                        {isAdmin ? (
                            /*
                             * =====================
                             * ADMIN
                             * =====================
                             */
                            <>
                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                "/admin"
                                            )
                                        }
                                    >
                                        Dashboard
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                "/admin/productos"
                                            )
                                        }
                                    >
                                        Productos
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={
                                            goToOrders
                                        }
                                    >
                                        Pedidos
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                "/admin/usuarios"
                                            )
                                        }
                                    >
                                        Usuarios
                                    </button>
                                </li>
                            </>
                        ) : (
                            /*
                             * =====================
                             * CLIENTE / VISITANTE
                             * =====================
                             */
                            <>
                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                "/"
                                            )
                                        }
                                    >
                                        Inicio
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                "/catalogo"
                                            )
                                        }
                                    >
                                        Tienda
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToSection(
                                                "servicios"
                                            )
                                        }
                                    >
                                        Servicios
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                "/about"
                                            )
                                        }
                                    >
                                        Sobre mí
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToSection(
                                                "contacto"
                                            )
                                        }
                                    >
                                        Contacto
                                    </button>
                                </li>
                            </>
                        )}

                    </ul>
                </nav>

                {/* =========================
                    ACCIONES
                ========================== */}

                <div className="navbar-actions">

                    {!authLoading && (
                        <>
                            {!user ? (
                                /*
                                 * =====================
                                 * SIN SESIÓN
                                 * =====================
                                 */
                                <div className="navbar-auth-actions">

                                    <button
                                        type="button"
                                        className="navbar-register"
                                        onClick={() =>
                                            goToPage(
                                                "/register"
                                            )
                                        }
                                    >
                                        Regístrate
                                    </button>

                                    <button
                                        type="button"
                                        className="navbar-login"
                                        onClick={() =>
                                            goToPage(
                                                "/login"
                                            )
                                        }
                                    >
                                        <FiLogIn />

                                        Iniciar sesión
                                    </button>

                                </div>
                            ) : (
                                /*
                                 * =====================
                                 * USUARIO AUTENTICADO
                                 * =====================
                                 */
                                <div className="navbar-account">

                                    <button
                                        type="button"
                                        className="navbar-account-button"
                                        onClick={() =>
                                            setAccountOpen(
                                                (
                                                    current
                                                ) =>
                                                    !current
                                            )
                                        }
                                        aria-expanded={
                                            accountOpen
                                        }
                                    >
                                        <span className="navbar-account-avatar">
                                            {user.username
                                                ?.charAt(
                                                    0
                                                )
                                                .toUpperCase()}
                                        </span>

                                        <span className="navbar-account-name">
                                            {
                                                user.username
                                            }
                                        </span>

                                        <FiChevronDown
                                            className={
                                                accountOpen
                                                    ? "navbar-account-chevron navbar-account-chevron--open"
                                                    : "navbar-account-chevron"
                                            }
                                        />
                                    </button>

                                    {/* =================
                                        DROPDOWN
                                    ================== */}

                                    {accountOpen && (
                                        <div className="navbar-account-menu">

                                            <div className="navbar-account-header">

                                                <strong>
                                                    {
                                                        user.username
                                                    }
                                                </strong>

                                                <span>
                                                    {
                                                        user.email
                                                    }
                                                </span>

                                                {isAdmin && (
                                                    <small>
                                                        Administrador
                                                    </small>
                                                )}

                                            </div>

                                            <div className="navbar-account-divider" />

                                            {isAdmin ? (
                                                /*
                                                 * ==============
                                                 * DROPDOWN ADMIN
                                                 * ==============
                                                 */
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            goToPage(
                                                                "/admin"
                                                            )
                                                        }
                                                    >
                                                        <FiGrid />

                                                        Panel administrativo
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            goToPage(
                                                                "/admin/productos"
                                                            )
                                                        }
                                                    >
                                                        <FiBox />

                                                        Productos
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={
                                                            goToOrders
                                                        }
                                                    >
                                                        <FiPackage />

                                                        Gestionar pedidos
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            goToPage(
                                                                "/admin/usuarios"
                                                            )
                                                        }
                                                    >
                                                        <FiUsers />

                                                        Usuarios
                                                    </button>
                                                </>
                                            ) : (
                                                /*
                                                 * ==============
                                                 * DROPDOWN USER
                                                 * ==============
                                                 */
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            goToOrders
                                                        }
                                                    >
                                                        <FiPackage />

                                                        Mis pedidos
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            goToPage(
                                                                "/cuenta"
                                                            )
                                                        }
                                                    >
                                                        <FiUser />

                                                        Mi cuenta
                                                    </button>
                                                </>
                                            )}

                                            <div className="navbar-account-divider" />

                                            <button
                                                type="button"
                                                className="navbar-account-logout"
                                                onClick={
                                                    handleLogout
                                                }
                                            >
                                                <FiLogOut />

                                                Cerrar sesión
                                            </button>

                                        </div>
                                    )}

                                </div>
                            )}
                        </>
                    )}

                    {/* =========================
                        CARRITO
                        Solo clientes/visitantes
                    ========================== */}

                    {!isAdmin && (
                        <button
                            type="button"
                            className="cart-button"
                            onClick={
                                toggleCart
                            }
                            aria-label={`Carrito con ${cartItemsCount} productos`}
                        >
                            <FiShoppingBag />

                            {cartItemsCount >
                                0 && (
                                <span className="cart-count">
                                    {
                                        cartItemsCount
                                    }
                                </span>
                            )}
                        </button>
                    )}

                    {/* =========================
                        MENÚ MÓVIL
                    ========================== */}

                    <button
                        type="button"
                        className="menu-button"
                        onClick={() =>
                            setMenuOpen(
                                (
                                    current
                                ) =>
                                    !current
                            )
                        }
                        aria-label={
                            menuOpen
                                ? "Cerrar menú"
                                : "Abrir menú"
                        }
                        aria-expanded={
                            menuOpen
                        }
                    >
                        {menuOpen
                            ? <FiX />
                            : <FiMenu />}
                    </button>

                </div>

            </div>
        </header>
    );
}

export default Navbar;