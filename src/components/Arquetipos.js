import React, { useState } from 'react';
import axios from 'axios';

const ArquetipoForm = () => {
  const [nombre_arquetipo, setNombreArquetipo] = useState('');
  const [image_arquetipo, setImageArquetipo] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const newArquetipo = {
      nombre_arquetipo,
      image_arquetipo,
    };

    try {
      const response = await axios.post('https://backend-dlp-neuronube.koyeb.app/arquetipos', newArquetipo);
      console.log(response.data);
      setNombreArquetipo('');
      setImageArquetipo('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Crear Arquetipo</h1>
      
      <label>Nombre del Arquetipo:</label>
      <input 
        type="text" 
        value={nombre_arquetipo} 
        onChange={(e) => setNombreArquetipo(e.target.value)}
        required
      />

      <label>Imagen del Arquetipo:</label>
      <input 
        type="text" 
        value={image_arquetipo} 
        onChange={(e) => setImageArquetipo(e.target.value)}
        required
      />

      <button type="submit">Crear Arquetipo</button>
    </form>
  );
};

export default ArquetipoForm;
