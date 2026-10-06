const API_URL =
    import.meta.env.VITE_API_URL ??
    "http://localhost:8080";

export async function getDashboardData() {
    const response = await fetch(
        `${API_URL}/api/admin/dashboard`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo cargar el dashboard."
        );
    }

    return response.json();
}