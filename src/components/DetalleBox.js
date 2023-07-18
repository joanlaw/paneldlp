import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardEditor from './CardEditor';
import CardForm from './CardForm';
import './DetalleBox.css';

const DetalleBox = () => {
  const { boxId } = useParams();
  const [box, setBox] = useState(null);
  const [cartasUR, setCartasUR] = useState([]);
  const [cartasSR, setCartasSR] = useState([]);
  const [cartasR, setCartasR] = useState([]);
  const [cartasN, setCartasN] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchBoxData = async () => {
      try {
        const response = await axios.get(`https://back-render-cloud-dlp.onrender.com/boxes/${boxId}`);
        setBox(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBoxData();
  }, [boxId]);

  useEffect(() => {
    const fetchCardData = async () => {
      if (box && box.cartas_ur && box.cartas_sr && box.cartas_r && box.cartas_n) {
        const urCardPromises = box.cartas_ur.map(carta =>
          axios.get(`https://back-render-cloud-dlp.onrender.com/cards/${carta._id}`)
        );

        const srCardPromises = box.cartas_sr.map(carta =>
          axios.get(`https://back-render-cloud-dlp.onrender.com/cards/${carta._id}`)
        );

        const rCardPromises = box.cartas_r.map(carta =>
          axios.get(`https://back-render-cloud-dlp.onrender.com/cards/${carta._id}`)
        );

        const nCardPromises = box.cartas_n.map(carta =>
          axios.get(`https://back-render-cloud-dlp.onrender.com/cards/${carta._id}`)
        );

        try {
          const urCardResponses = await Promise.all(urCardPromises);
          const srCardResponses = await Promise.all(srCardPromises);
          const rCardResponses = await Promise.all(rCardPromises);
          const nCardResponses = await Promise.all(nCardPromises);

          const urCardsData = urCardResponses.map(response => response.data);
          const srCardsData = srCardResponses.map(response => response.data);
          const rCardsData = rCardResponses.map(response => response.data);
          const nCardsData = nCardResponses.map(response => response.data);

          setCartasUR(urCardsData);
          setCartasSR(srCardsData);
          setCartasR(rCardsData);
          setCartasN(nCardsData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchCardData();
  }, [box]);

  const handleEditCard = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateCard = async (updatedCard) => {
    try {
      await axios.put(`https://api.duellinks.pro/cards/${updatedCard._id}`, updatedCard);

      if (selectedCard) {
        switch (selectedCard.rareza) {
          case 'UR':
            setCartasUR(cartasUR.map(card => (card._id === updatedCard._id ? updatedCard : card)));
            break;
          case 'SR':
            setCartasSR(cartasSR.map(card => (card._id === updatedCard._id ? updatedCard : card)));
            break;
          case 'R':
            setCartasR(cartasR.map(card => (card._id === updatedCard._id ? updatedCard : card)));
            break;
          case 'N':
            setCartasN(cartasN.map(card => (card._id === updatedCard._id ? updatedCard : card)));
            break;
          default:
            break;
        }
      }
      
      setSelectedCard(null);
      
      
    } catch (error) {
      console.error('Error al actualizar la carta:', error);
    }
  };

  const handleModalOverlayClick = () => {
    setSelectedCard(null);
  };

  return (
    <div>
      <h2>Detalle de la Box: {boxId}</h2>
      {/* Renderizar las cartas UR */}
      <h3>Cartas UR</h3>
      <div className="cartas-container">
        <div className="cartas-grid">
          {cartasUR.map(carta => (
            <div key={carta._id} className="carta-item">
              <img src={carta.image.secure_url} alt={carta.nombre} className="carta-imagen" />
              <p>{carta.nombre}</p>
              <button onClick={() => handleEditCard(carta)}>Editar Carta</button>
            </div>
          ))}
        </div>
      </div>

      {/* Renderizar las cartas SR */}
      <h3>Cartas SR</h3>
      <div className="cartas-container">
        <div className="cartas-grid">
          {cartasSR.map(carta => (
            <div key={carta._id} className="carta-item">
              <img src={carta.image.secure_url} alt={carta.nombre} className="carta-imagen" />
              <p>{carta.nombre}</p>
              <button onClick={() => handleEditCard(carta)}>Editar Carta</button>
            </div>
          ))}
        </div>
      </div>

      {/* Renderizar las cartas R */}
      <h3>Cartas R</h3>
      <div className="cartas-container">
        <div className="cartas-grid">
          {cartasR.map(carta => (
            <div key={carta._id} className="carta-item">
              <img src={carta.image.secure_url} alt={carta.nombre} className="carta-imagen" />
              <p>{carta.nombre}</p>
              <button onClick={() => handleEditCard(carta)}>Editar Carta</button>
            </div>
          ))}
        </div>
      </div>

      {/* Renderizar las cartas N */}
      <h3>Cartas N</h3>
      <div className="cartas-container">
        <div className="cartas-grid">
          {cartasN.map(carta => (
            <div key={carta._id} className="carta-item">
              <img src={carta.image.secure_url} alt={carta.nombre} className="carta-imagen" />
              <p>{carta.nombre}</p>
              <button onClick={() => handleEditCard(carta)}>Editar Carta</button>
            </div>
          ))}
        </div>
      </div>

      {/* Renderizar el editor de cartas si hay una carta seleccionada */}
      {selectedCard && (
        <div className="modal-overlay" onClick={handleModalOverlayClick}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-left">
              <img src={selectedCard.image.secure_url} alt={selectedCard.nombre} className="modal-card-image" />
            </div>
            <div className="modal-right">
              <CardForm
                card={selectedCard}
                onSubmit={handleUpdateCard}
                onCancel={() => setSelectedCard(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleBox;
