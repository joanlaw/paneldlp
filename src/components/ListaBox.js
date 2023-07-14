import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaBox = () => {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://back-render-cloud-dlp.onrender.com/boxes')
      .then((response) => {
        setBoxes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando cajas...</p>;
  }

  if (error) {
    return <p>Hubo un error al cargar las cajas</p>;
  }

  return (
    <div>
      <h2>Lista de Cajas</h2>
      <ul>
        {boxes.map((box) => (
          <li key={box._id}>
            <Link to={`/lista-box/${box._id}`}>{box.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaBox;
