import React, { useState } from 'react';
import "./Blog.css";

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
    <div className="blog-form-container">
      <h2 className="blog-form-title">Crear nueva entrada de blog</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input className="form-control" type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Cuerpo del blog:</label>
          <textarea className="form-control" name="cuerpo_blog" value={formData.cuerpo_blog} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Fecha:</label>
          <input className="form-control" type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Imagen destacada:</label>
          <input className="form-control" type="text" name="imagen_destacada" value={formData.imagen_destacada} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <input className="form-control" type="text" name="categoria" value={formData.categoria} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Blog;
