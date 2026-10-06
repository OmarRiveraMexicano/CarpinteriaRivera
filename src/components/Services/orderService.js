// src/services/adminOrderService.js

const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function getAdminOrders() {
    const response = await fetch(
        `${API_URL}/api/admin/orders/all`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            `No se pudieron cargar las órdenes: ${response.status}`
        );
    }

    return response.json();
}

export async function getUserOrders() {
    const response = await fetch(
        `${API_URL}/auth/api/orders/user`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudieron cargar los pedidos."
        );
    }

    return response.json();
}


export async function createOrder(orderData) {
    const response = await fetch(
        `${API_URL}/auth/api/orders`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify(orderData),
        }
    );

    if (!response.ok) {
        let message =
            "No se pudo registrar el pedido.";

        try {
            const errorData =
                await response.json();

            message =
                errorData.message ||
                errorData.error ||
                message;
        } catch {
            // Ignoramos si no viene JSON.
        }

        throw new Error(message);
    }

    return response.json();
}

export async function getAdminOrderById(orderId) {
    const response = await fetch(
        `${API_URL}/api/admin/orders/${orderId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            `No se pudo cargar la orden: ${response.status}`
        );
    }

    return response.json();
}

export async function updateAdminOrderStatus(
    orderId,
    status
) {
    const response = await fetch(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                status,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            `No se pudo actualizar el estado: ${response.status}`
        );
    }

    return response.json();
}