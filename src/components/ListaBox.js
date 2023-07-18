import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListaBox.css';

const ListaBox = () => {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://api.duellinks.pro/boxes')
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
    <div className="lista-box-container">
      <h2>Lista de Cajas</h2>
      <div className="box-flex-container">
        {boxes.map((box) => (
          <div className="box-item" key={box._id}>
            <Link to={`/lista-box/${box._id}`}>
              <img src={box.banner} alt={box.nombre} />
            </Link>
            <p>{box.nombre}</p>
          </div>
        ))}
      </div>
      <Link to="/crear-box" className="crear-box-button">
        Crear Box
      </Link>
    </div>
  );
};

export default ListaBox;
