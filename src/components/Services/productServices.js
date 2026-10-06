const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const FRONTEND_BASE_URL = import.meta.env.BASE_URL;

function normalizeProduct(product) {
    return {
        ...product,

        // Tu ProductCard usa "image", pero el backend envía "imageUrl".
        image: product.imageUrl
            ? `${FRONTEND_BASE_URL}${product.imageUrl}`
            : `${FRONTEND_BASE_URL}placeholder.jpg`,
    };
}

export async function getProducts() {
    const response = await fetch(`${API_URL}/public/api/products`);

    if (!response.ok) {
        throw new Error(
            `No se pudieron obtener los productos: ${response.status}`
        );
    }

    const products = await response.json();

    return products.map(normalizeProduct);
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/public/api/products/${id}`);

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }

        throw new Error(
            `No se pudo obtener el producto: ${response.status}`
        );
    }

    const product = await response.json();

    return normalizeProduct(product);
}