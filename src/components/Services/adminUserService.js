// src/services/adminUserService.js

const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function getAdminUsers() {
    const response = await fetch(
        `${API_URL}/api/admin/users`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            `No se pudieron obtener los usuarios: ${response.status}`
        );
    }

    return response.json();
}

export async function getAdminUserById(userId) {
    const response = await fetch(
        `${API_URL}/api/admin/users/${userId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            `No se pudo obtener el usuario: ${response.status}`
        );
    }

    return response.json();
}

export async function updateUserRole(
    userId,
    role
) {
    const response = await fetch(
        `${API_URL}/api/admin/users/${userId}/role`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                role,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            `No se pudo actualizar el rol: ${response.status}`
        );
    }

    return response.json();
}

export async function updateUserEnabled(
    userId,
    enabled
) {
    const response = await fetch(
        `${API_URL}/api/admin/users/${userId}/enabled`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                enabled,
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