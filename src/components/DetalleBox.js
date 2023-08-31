import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardEditor from './CardEditor';
import CardForm from './CardForm';
import './DetalleBox.css';
import { Modal } from 'antd';

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
        const response = await axios.get(`https://backend-dlp-neuronube.koyeb.app/boxes/${boxId}`);
        setBox(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBoxData();
  }, [boxId]);

  useEffect(() => {
    // Cuando selectedCard es null, significa que una carta fue editada y guardada
    if (selectedCard === null) {
      const fetchCardData = async () => {
        if (box && box.cartas_ur && box.cartas_sr && box.cartas_r && box.cartas_n) {
          const urCardPromises = box.cartas_ur.map(carta =>
            axios.get(`https://backend-dlp-neuronube.koyeb.app/cards/${carta._id}`)
          );
          const srCardPromises = box.cartas_sr.map(carta =>
            axios.get(`https://backend-dlp-neuronube.koyeb.app/cards/${carta._id}`)
          );
          const rCardPromises = box.cartas_r.map(carta =>
            axios.get(`https://backend-dlp-neuronube.koyeb.app/cards/${carta._id}`)
          );
          const nCardPromises = box.cartas_n.map(carta =>
            axios.get(`https://backend-dlp-neuronube.koyeb.app/cards/${carta._id}`)
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
    }
  }, [selectedCard, box]);
  

  const handleEditCard = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateCard = async (updatedCard) => {
    try {
      await axios.put(`https://backend-dlp-neuronube.koyeb.app/cards/${updatedCard._id}`, updatedCard);
  
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
  
      setSelectedCard(null);  // Esto debería desencadenar la actualización de la UI
      
    } catch (error) {
      console.error('Error al actualizar la carta:', error);
    }
  };
  

  const handleModalOverlayClick = () => {
    setSelectedCard(null);
  };

  const handleDeleteBox = async () => {
    try {
      await axios.delete(`https://backend-dlp-neuronube.koyeb.app/boxes/${boxId}`);
      // Redirect the user to the previous page or any other desired action after deletion
      // For example: window.location.href = '/boxes';
    } catch (error) {
      console.error('Error al eliminar la box:', error);
    }
  };


  return (
    <div>
      <h2>Detalle de la Box: {boxId}</h2>
      {/* Renderizar las cartas UR */}
      <div>
      {/* Button to Delete the Box */}
      <button className="delete-box-button" onClick={handleDeleteBox}>
        Eliminar Box
      </button>
    </div>
      <h3>Cartas UR</h3>
      <div className="cartas-container">
        <div className="cartas-grid">
          {cartasUR.map(carta => (
            <div 
  key={carta._id} 
  className="carta-item" 
  onClick={() => handleEditCard(carta)}  // Mover el evento onClick aquí
>
  <img src={carta.image.secure_url} alt={carta.nombre} className="carta-imagen" />
</div>
          ))}
        </div>
      </div>

      {/* Renderizar las cartas SR */}
      <h3>Cartas SR</h3>
      <div className="cartas-container">
        <div className="cartas-grid">
          {cartasSR.map(carta => (
            <div 
  key={carta._id} 
  className="carta-item" 
  onClick={() => handleEditCard(carta)}  // Mover el evento onClick aquí
>
  <img src={carta.image.secure_url} alt={carta.nombre} className="carta-imagen" />
</div>
          ))}
        </div>
      </div>

      {/* Renderizar las cartas R */}
      <h3>Cartas R</h3>
      <div className="cartas-container">
        <div className="cartas-grid">
          {cartasR.map(carta => (
            <div 
  key={carta._id} 
  className="carta-item" 
  onClick={() => handleEditCard(carta)}  // Mover el evento onClick aquí
>
  <img src={carta.image.secure_url} alt={carta.nombre} className="carta-imagen" />
</div>
          ))}
        </div>
      </div>

      {/* Renderizar las cartas N */}
      <h3>Cartas N</h3>
      <div className="cartas-container">
        <div className="cartas-grid">
          {cartasN.map(carta => (
                    <div 
          key={carta._id} 
          className="carta-item" 
          onClick={() => handleEditCard(carta)}  // Mover el evento onClick aquí
        >
          <img src={carta.image.secure_url} alt={carta.nombre} className="carta-imagen" />
        </div>
          ))}
        </div>
      </div>

      {/* Renderizar el editor de cartas si hay una carta seleccionada */}
      {selectedCard && (
        <Modal
  title="Editar carta"
  visible={selectedCard !== null}
  onCancel={() => setSelectedCard(null)}
  footer={null}
>
  {selectedCard && (
    <CardForm
      card={selectedCard}
      onSubmit={handleUpdateCard}
      onCancel={() => setSelectedCard(null)}
    />
  )}
</Modal>
      )}
    </div>
  );
};

export default DetalleBox;
