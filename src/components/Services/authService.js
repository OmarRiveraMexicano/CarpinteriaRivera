const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function loginUser(credentials) {
    const response = await fetch(
        `${API_URL}/auth/api/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify(credentials),
        }
    );

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error(
                "Correo o contraseña incorrectos."
            );
        }

        if (response.status === 403) {
            throw new Error(
                "No tienes permiso para iniciar sesión."
            );
        }

        throw new Error(
            `Error al iniciar sesión: ${response.status}`
        );
    }

    /*
     * Si tu backend devuelve JSON con información
     * del usuario, esto lo obtiene.
     *
     * Si devuelve un body vacío, abajo te explico
     * cómo cambiarlo.
     */
    return response.json();
}