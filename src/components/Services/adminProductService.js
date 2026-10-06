const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function getAdminProducts() {
    const response = await fetch(
        `${API_URL}/admin/api/products/all`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener los productos."
        );
    }

    return response.json();
}

export async function createProduct(product) {
    const response = await fetch(
        `${API_URL}/admin/api/products`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(product),
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo crear el producto."
        );
    }

    return response.json();
}

export async function updateProduct(
    productId,
    product
) {
    const response = await fetch(
        `${API_URL}/admin/api/products/${productId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(product),
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo actualizar el producto."
        );
    }

    return response.json();
}

export async function deleteProduct(productId) {
    const response = await fetch(
        `${API_URL}/admin/api/products/${productId}`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo eliminar el producto."
        );
    }
}