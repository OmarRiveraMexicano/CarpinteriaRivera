import { useEffect, useState } from "react";

import {
    FiEdit2,
    FiPackage,
    FiPlus,
    FiRefreshCw,
    FiTrash2,
    FiX,
} from "react-icons/fi";

import {
    createProduct,
    deleteProduct,
    getAdminProducts,
    updateProduct,
} from "../components/Services/adminProductService";

import "./AdminProducts.css";

const emptyForm = {
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
};

function AdminProducts() {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [formOpen, setFormOpen] =
        useState(false);

    const [editingProduct, setEditingProduct] =
        useState(null);

    const [form, setForm] =
        useState(emptyForm);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getAdminProducts();

            setProducts(data);
        } catch (error) {
            console.error(error);

            setError(
                "No fue posible cargar los productos."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat(
            "es-MX",
            {
                style: "currency",
                currency: "MXN",
            }
        ).format(price);
    };

    const handleInputChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const openCreateForm = () => {
        setEditingProduct(null);
        setForm(emptyForm);
        setError("");
        setFormOpen(true);
    };

    const openEditForm = (product) => {
        setEditingProduct(product);

        setForm({
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl,
        });

        setError("");
        setFormOpen(true);
    };

    const closeForm = () => {
        if (saving) {
            return;
        }

        setFormOpen(false);
        setEditingProduct(null);
        setForm(emptyForm);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const productData = {
                name: form.name.trim(),
                category: form.category.trim(),
                description:
                    form.description.trim(),
                price: Number(form.price),
                stock: Number(form.stock),
                imageUrl:
                    form.imageUrl.trim(),
            };

            if (editingProduct) {
                const updated =
                    await updateProduct(
                        editingProduct.id,
                        productData
                    );

                setProducts((current) =>
                    current.map((product) =>
                        product.id === updated.id
                            ? updated
                            : product
                    )
                );
            } else {
                const created =
                    await createProduct(
                        productData
                    );

                setProducts((current) => [
                    created,
                    ...current,
                ]);
            }

            closeForm();
        } catch (error) {
            console.error(error);

            setError(
                editingProduct
                    ? "No se pudo actualizar el producto."
                    : "No se pudo crear el producto."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (product) => {
        const confirmed = window.confirm(
            `¿Eliminar "${product.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteProduct(product.id);

            setProducts((current) =>
                current.filter(
                    (item) =>
                        item.id !== product.id
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo eliminar el producto."
            );
        }
    };

    return (
        <main className="admin-products-page">
            <div className="admin-products-container">

                <header className="admin-products-header">
                    <div>
                        <span className="admin-products-eyebrow">
                            Administración
                        </span>

                        <h1>Productos</h1>

                        <p>
                            Administra el catálogo,
                            precios y existencias.
                        </p>
                    </div>

                    <div className="admin-products-header-actions">
                        <button
                            type="button"
                            className="admin-products-refresh"
                            onClick={loadProducts}
                            disabled={loading}
                        >
                            <FiRefreshCw />
                            Actualizar
                        </button>

                        <button
                            type="button"
                            className="admin-products-create"
                            onClick={openCreateForm}
                        >
                            <FiPlus />
                            Nuevo producto
                        </button>
                    </div>
                </header>

                {error && (
                    <div className="admin-products-error">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="admin-products-loading">
                        Cargando productos...
                    </div>
                ) : products.length === 0 ? (
                    <div className="admin-products-empty">
                        <FiPackage />

                        <h2>
                            No hay productos
                        </h2>

                        <p>
                            Agrega el primer producto
                            del catálogo.
                        </p>

                        <button
                            type="button"
                            onClick={openCreateForm}
                        >
                            <FiPlus />
                            Crear producto
                        </button>
                    </div>
                ) : (
                    <div className="admin-products-table-wrapper">
                        <table className="admin-products-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(
                                    (product) => (
                                        <tr
                                            key={
                                                product.id
                                            }
                                        >
                                            <td>
                                                <div className="admin-product-info">
                                                    <div className="admin-product-image">
                                                        {product.imageUrl ? (
                                                            <img
                                                                src={
                                                                    product.imageUrl.startsWith(
                                                                        "http"
                                                                    )
                                                                        ? product.imageUrl
                                                                        : `${import.meta.env.BASE_URL}${product.imageUrl}`
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                            />
                                                        ) : (
                                                            <FiPackage />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            {
                                                                product.name
                                                            }
                                                        </strong>

                                                        <span>
                                                            ID #
                                                            {
                                                                product.id
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                {
                                                    product.category
                                                }
                                            </td>

                                            <td>
                                                <strong className="admin-product-price">
                                                    {formatPrice(
                                                        product.price
                                                    )}
                                                </strong>
                                            </td>

                                            <td>
                                                <span
                                                    className={`admin-product-stock ${
                                                        product.stock ===
                                                        0
                                                            ? "admin-product-stock--empty"
                                                            : product.stock <=
                                                                3
                                                              ? "admin-product-stock--low"
                                                              : ""
                                                    }`}
                                                >
                                                    {
                                                        product.stock
                                                    }{" "}
                                                    disponibles
                                                </span>
                                            </td>

                                            <td>
                                                <div className="admin-product-actions">
                                                    <button
                                                        type="button"
                                                        className="admin-product-edit"
                                                        onClick={() =>
                                                            openEditForm(
                                                                product
                                                            )
                                                        }
                                                        aria-label={`Editar ${product.name}`}
                                                    >
                                                        <FiEdit2 />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="admin-product-delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                product
                                                            )
                                                        }
                                                        aria-label={`Eliminar ${product.name}`}
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {formOpen && (
                <div
                    className="admin-product-modal-backdrop"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeForm();
                        }
                    }}
                >
                    <div className="admin-product-modal">
                        <div className="admin-product-modal-header">
                            <div>
                                <span>
                                    {editingProduct
                                        ? "Editar producto"
                                        : "Nuevo producto"}
                                </span>

                                <h2>
                                    {editingProduct
                                        ? editingProduct.name
                                        : "Agregar al catálogo"}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                aria-label="Cerrar"
                            >
                                <FiX />
                            </button>
                        </div>

                        <form
                            className="admin-product-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="admin-product-field">
                                <label htmlFor="name">
                                    Nombre
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={
                                        handleInputChange
                                    }
                                    required
                                />
                            </div>

                            <div className="admin-product-field">
                                <label htmlFor="category">
                                    Categoría
                                </label>

                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    value={
                                        form.category
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                    required
                                />
                            </div>

                            <div className="admin-product-form-row">
                                <div className="admin-product-field">
                                    <label htmlFor="price">
                                        Precio
                                    </label>

                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={
                                            form.price
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        required
                                    />
                                </div>

                                <div className="admin-product-field">
                                    <label htmlFor="stock">
                                        Stock
                                    </label>

                                    <input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={
                                            form.stock
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="admin-product-field">
                                <label htmlFor="imageUrl">
                                    URL de imagen
                                </label>

                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    value={
                                        form.imageUrl
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                    placeholder="images/producto.jpg"
                                    required
                                />
                            </div>

                            <div className="admin-product-field">
                                <label htmlFor="description">
                                    Descripción
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    value={
                                        form.description
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                    required
                                />
                            </div>

                            <div className="admin-product-form-actions">
                                <button
                                    type="button"
                                    className="admin-product-cancel"
                                    onClick={closeForm}
                                    disabled={saving}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="admin-product-save"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Guardando..."
                                        : editingProduct
                                          ? "Guardar cambios"
                                          : "Crear producto"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

export default AdminProducts;