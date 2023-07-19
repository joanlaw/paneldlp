import React, { useState } from 'react';

function Blog() {
  const [formData, setFormData] = useState({
    titulo: '',
    cuerpo_blog: '',
    fecha: '',
    imagen_destacada: '',
    categoria: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí realizar la solicitud POST al backend para enviar formData al servidor
    fetch('https://back-render-cloud-dlp.onrender.com/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        // Aquí puedes realizar cualquier acción adicional después de enviar el formulario
      })
      .catch((error) => {
        console.error('Error al enviar el formulario:', error);
      });
  };

  return (
    <div>
      <h2>Crear nueva entrada de blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
        </div>
        <div>
          <label>Cuerpo del blog:</label>
          <textarea name="cuerpo_blog" value={formData.cuerpo_blog} onChange={handleChange} />
        </div>
        <div>
          <label>Fecha:</label>
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
        </div>
        <div>
          <label>Imagen destacada:</label>
          <input type="text" name="imagen_destacada" value={formData.imagen_destacada} onChange={handleChange} />
        </div>
        <div>
          <label>Categoría:</label>
          <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Blog;
