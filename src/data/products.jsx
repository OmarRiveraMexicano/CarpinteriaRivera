const baseUrl = import.meta.env.BASE_URL;

const products = [
    {
        id: 1,
        name: "Repisa Flotante Oslo",
        price: 799,
        category: "Repisas",
        image: `${baseUrl}images/oslo.jpg`,
        description:
            "Repisa de pino macizo con diseño minimalista y acabado mate.",
        stock: 8,
    },
    {
        id: 2,
        name: "Repisa Esquinera Nórdica",
        price: 949,
        category: "Repisas",
        image: `${baseUrl}images/nordica.jpg`,
        description:
            "Repisa esquinera compacta, ideal para aprovechar espacios pequeños.",
        stock: 5,
    },
    {
        id: 3,
        name: "Mesa de Centro Aura",
        price: 3499,
        category: "Mesas",
        image: `${baseUrl}images/mesa-centro.jpg`,
        images: [
            `${baseUrl}mesa.jpg`,
            `${baseUrl}mesa.jpg`,
            `${baseUrl}mesa.jpg`,
            `${baseUrl}mesa.jpg`,
        ],
        description:
            "Mesa de centro artesanal fabricada en madera sólida.",
        stock: 4,
    },
    {
        id: 4,
        name: "Escritorio Studio",
        price: 4299,
        category: "Escritorios",
        image: `${baseUrl}images/escritorio.jpg`,
        description:
            "Escritorio funcional con espacio amplio para trabajar o estudiar.",
        stock: 3,
    },
    {
        id: 5,
        name: "Buró Minimal",
        price: 2299,
        category: "Dormitorio",
        image: `${baseUrl}images/buro.jpg`,
        description:
            "Buró compacto con cajón y acabado natural de estilo contemporáneo.",
        stock: 6,
    },
    {
        id: 6,
        name: "Mesa de Noche Siena",
        price: 1999,
        category: "Dormitorio",
        image: `${baseUrl}images/mesa-noche.jpg`,
        description:
            "Mesa de noche ligera con espacio de almacenamiento abierto.",
        stock: 7,
    },
    {
        id: 7,
        name: "Zapatera Vertical",
        price: 2899,
        category: "Organización",
        image: `${baseUrl}images/zapatera.jpg`,
        description:
            "Zapatera vertical diseñada para mantener organizado tu calzado.",
        stock: 4,
    },
    {
        id: 8,
        name: "Organizador de Relojes",
        price: 1199,
        category: "Organización",
        image: `${baseUrl}reloj.jpg`,
        description:
            "Organizador artesanal con diez espacios individuales para relojes.",
        stock: 10,
    },
    {
        id: 9,
        name: "Casa para Perro Rustik",
        price: 3799,
        category: "Mascotas",
        image: `${baseUrl}casa.jpg`,
        description:
            "Casa de madera resistente, diseñada para brindar comodidad y protección.",
        stock: 2,
    },
    {
        id: 10,
        name: "Librero Modular",
        price: 4999,
        category: "Libreros",
        image: `${baseUrl}images/librero.jpg`,
        description:
            "Librero modular de gran capacidad para libros, decoración y almacenamiento.",
        stock: 3,
    },
];

export default products;