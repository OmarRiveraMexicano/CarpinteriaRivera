// src/pages/Admin/AdminUsers.jsx

import { useEffect, useState } from "react";

import {
    FiRefreshCw,
    FiShield,
    FiUserCheck,
    FiUserX,
} from "react-icons/fi";

import {
    getAdminUsers,
    updateUserEnabled,
    updateUserRole,
} from "../components/Services/adminUserService";

import "./AdminUsers.css";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [updatingUserId, setUpdatingUserId] =
        useState(null);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminUsers();

            setUsers(data);
        } catch (error) {
            console.error(error);

            setError(
                "No fue posible cargar los usuarios."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleRoleChange = async (
        userId,
        role
    ) => {
        try {
            setUpdatingUserId(userId);

            const updatedUser =
                await updateUserRole(
                    userId,
                    role
                );

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === userId
                        ? updatedUser
                        : user
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo actualizar el rol."
            );
        } finally {
            setUpdatingUserId(null);
        }
    };

    const handleEnabledChange = async (
        user
    ) => {
        try {
            setUpdatingUserId(user.id);

            const updatedUser =
                await updateUserEnabled(
                    user.id,
                    !user.enabled
                );

            setUsers((currentUsers) =>
                currentUsers.map((item) =>
                    item.id === user.id
                        ? updatedUser
                        : item
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo actualizar el estado del usuario."
            );
        } finally {
            setUpdatingUserId(null);
        }
    };

    return (
        <main className="admin-users-page">
            <div className="admin-users-container">
                <div className="admin-users-header">
                    <div>
                        <span>
                            Administración
                        </span>

                        <h1>
                            Usuarios
                        </h1>

                        <p>
                            Gestiona roles y acceso
                            de las cuentas registradas.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="admin-users-refresh"
                        onClick={loadUsers}
                        disabled={loading}
                    >
                        <FiRefreshCw />

                        Actualizar
                    </button>
                </div>

                {error && (
                    <div className="admin-users-error">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="admin-users-loading">
                        Cargando usuarios...
                    </div>
                ) : (
                    <div className="admin-users-table-wrapper">
                        <table className="admin-users-table">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="admin-user-name">
                                                <span className="admin-user-avatar">
                                                    {user.username
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </span>

                                                <div>
                                                    <strong>
                                                        {
                                                            user.username
                                                        }
                                                    </strong>

                                                    <span>
                                                        ID #{user.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            <select
                                                value={user.role}
                                                disabled={
                                                    updatingUserId ===
                                                    user.id
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    handleRoleChange(
                                                        user.id,
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                            >
                                                <option value="USER">
                                                    USER
                                                </option>

                                                <option value="ADMIN">
                                                    ADMIN
                                                </option>
                                            </select>
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    user.enabled
                                                        ? "admin-user-status admin-user-status--active"
                                                        : "admin-user-status admin-user-status--disabled"
                                                }
                                            >
                                                {user.enabled
                                                    ? "Activo"
                                                    : "Desactivado"}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className={
                                                    user.enabled
                                                        ? "admin-user-action admin-user-action--disable"
                                                        : "admin-user-action admin-user-action--enable"
                                                }
                                                disabled={
                                                    updatingUserId ===
                                                    user.id
                                                }
                                                onClick={() =>
                                                    handleEnabledChange(
                                                        user
                                                    )
                                                }
                                            >
                                                {user.enabled ? (
                                                    <FiUserX />
                                                ) : (
                                                    <FiUserCheck />
                                                )}

                                                {user.enabled
                                                    ? "Desactivar"
                                                    : "Activar"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}

export default AdminUsers;