const API_URL =
    import.meta.env.VITE_API_URL ??
    "http://localhost:8080";

export async function registerUser(userData) {
    const response = await fetch(
        `${API_URL}/auth/api/users`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        }
    );

    if (!response.ok) {
        let message = "No se pudo crear la cuenta.";

        try {
            const error = await response.json();

            message =
                error.message ||
                error.error ||
                message;
        } catch {
            // La respuesta no contenía JSON.
        }

        throw new Error(message);
    }

    return response.json();
}