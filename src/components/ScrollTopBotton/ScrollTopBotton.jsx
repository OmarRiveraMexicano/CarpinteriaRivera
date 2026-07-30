import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

import "./ScrollTopBotton.css";

function ScrollTopButton() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);

    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            className={`scroll-top ${
                visible ? "scroll-top--visible" : ""
            }`}
            onClick={scrollToTop}
            aria-label="Volver arriba"
        >
            <FiArrowUp />
        </button>
    );
}

export default ScrollTopButton;