import { useState } from "react";
import { FiSend } from "react-icons/fi";

import "./Quote.css";

function QuoteForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        furnitureType: "",
        dimensions: "",
        material: "",
        budget: "",
        deadline: "",
        description: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const message = `
Hola, quiero solicitar una cotización personalizada.

Nombre: ${formData.name}
Teléfono: ${formData.phone}
Correo: ${formData.email || "No especificado"}
Tipo de mueble: ${formData.furnitureType}
Medidas: ${formData.dimensions}
Material: ${formData.material || "No especificado"}
Presupuesto: ${formData.budget || "No especificado"}
Fecha estimada: ${formData.deadline || "No especificada"}

Descripción:
${formData.description}
        `.trim();

        const whatsappNumber = "521XXXXXXXXXX";

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
        )}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <main className="quote-page">
            <section className="quote-hero">
                <div className="quote-container">
                    <span className="quote-eyebrow">
                        Proyecto personalizado
                    </span>

                    <h1>
                        Cuéntame qué mueble necesitas.
                    </h1>

                    <p>
                        Comparte tu idea, medidas y presupuesto. Con esa
                        información puedo preparar una cotización inicial.
                    </p>
                </div>
            </section>

            <section className="quote-section">
                <div className="quote-container quote-layout">
                    <div className="quote-information">
                        <span>Antes de enviar</span>

                        <h2>
                            Entre más detalles compartas, más precisa será
                            la cotización.
                        </h2>

                        <p>
                            Puedes incluir medidas aproximadas, tipo de
                            madera, acabado, referencias y el espacio donde
                            colocarás el mueble.
                        </p>

                        <ul>
                            <li>Medidas del espacio disponible.</li>
                            <li>Fotografías o referencias del diseño.</li>
                            <li>Presupuesto aproximado.</li>
                            <li>Fecha en la que lo necesitas.</li>
                        </ul>
                    </div>

                    <form
                        className="quote-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="quote-form-grid">
                            <div className="quote-field">
                                <label htmlFor="name">
                                    Nombre completo
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>

                            <div className="quote-field">
                                <label htmlFor="phone">
                                    Teléfono
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="55 1234 5678"
                                    required
                                />
                            </div>

                            <div className="quote-field">
                                <label htmlFor="email">
                                    Correo electrónico
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>

                            <div className="quote-field">
                                <label htmlFor="furnitureType">
                                    Tipo de mueble
                                </label>

                                <select
                                    id="furnitureType"
                                    name="furnitureType"
                                    value={formData.furnitureType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Selecciona una opción
                                    </option>

                                    <option value="Repisa">
                                        Repisa
                                    </option>

                                    <option value="Escritorio">
                                        Escritorio
                                    </option>

                                    <option value="Mesa">
                                        Mesa
                                    </option>

                                    <option value="Clóset">
                                        Clóset
                                    </option>

                                    <option value="Librero">
                                        Librero
                                    </option>

                                    <option value="Mueble para televisión">
                                        Mueble para televisión
                                    </option>

                                    <option value="Otro">
                                        Otro
                                    </option>
                                </select>
                            </div>

                            <div className="quote-field">
                                <label htmlFor="dimensions">
                                    Medidas aproximadas
                                </label>

                                <input
                                    id="dimensions"
                                    name="dimensions"
                                    type="text"
                                    value={formData.dimensions}
                                    onChange={handleChange}
                                    placeholder="Ej. 120 × 80 × 45 cm"
                                    required
                                />
                            </div>

                            <div className="quote-field">
                                <label htmlFor="material">
                                    Material preferido
                                </label>

                                <select
                                    id="material"
                                    name="material"
                                    value={formData.material}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        No estoy seguro
                                    </option>

                                    <option value="Pino">
                                        Pino
                                    </option>

                                    <option value="MDF">
                                        MDF
                                    </option>

                                    <option value="Melamina">
                                        Melamina
                                    </option>

                                    <option value="Triplay">
                                        Triplay
                                    </option>

                                    <option value="Otro">
                                        Otro
                                    </option>
                                </select>
                            </div>

                            <div className="quote-field">
                                <label htmlFor="budget">
                                    Presupuesto aproximado
                                </label>

                                <select
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Selecciona un rango
                                    </option>

                                    <option value="Menos de $2,000 MXN">
                                        Menos de $2,000
                                    </option>

                                    <option value="$2,000 a $5,000 MXN">
                                        $2,000 a $5,000
                                    </option>

                                    <option value="$5,000 a $10,000 MXN">
                                        $5,000 a $10,000
                                    </option>

                                    <option value="Más de $10,000 MXN">
                                        Más de $10,000
                                    </option>
                                </select>
                            </div>

                            <div className="quote-field">
                                <label htmlFor="deadline">
                                    Fecha aproximada
                                </label>

                                <input
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="quote-field quote-field--full">
                                <label htmlFor="description">
                                    Describe tu idea
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe el diseño, uso, acabado, colores o cualquier detalle importante."
                                    rows="7"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="quote-submit"
                        >
                            Solicitar cotización
                            <FiSend />
                        </button>

                        <p className="quote-disclaimer">
                            Al enviar, se abrirá WhatsApp con la
                            información capturada.
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default QuoteForm;