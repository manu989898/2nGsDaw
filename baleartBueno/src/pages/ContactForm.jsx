import { useState } from "react";
import Navbar from "./NavBar.jsx";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Reset form after 5 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-md mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Formulario de Contacto</h1>

        {submitted ? (
          <p className="text-center text-green-600 font-semibold">
            ¡Gracias por tu mensaje! Ha sido enviado con éxito.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-semibold">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Enviar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
