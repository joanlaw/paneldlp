import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardForm from './CardForm';
import './CardEditor.css';
import { Modal } from 'antd';


const CardEditor = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://backend-dlp-neuronube.koyeb.app/cards/', {
          params: {
            search: searchTerm,
            page: currentPage - 1,
            size: cardsPerPage
          }
        });
        setCards(response.data.docs);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log('Error al obtener las cartas:', error);
      }
    };
  
    fetchCards();
  }, [searchTerm, currentPage]); // Agrega searchTerm aquí también para que cuando cambie se haga la petición al servidor con el nuevo término

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCard(null);
    setCurrentPage(1);
  };

  const handleUpdateCard = (updatedCard) => {
    const updateCard = async () => {
      try {
        await axios.put(`https://backend-dlp-neuronube.koyeb.app/cards/${updatedCard._id}`, updatedCard);
        setCards((prevCards) =>
          prevCards.map((card) =>
            card._id === updatedCard._id ? updatedCard : card
          )
        );
        setSelectedCard(null);
      } catch (error) {
        console.log('Error al actualizar la carta:', error);
      }
    };

    updateCard();
  };

  const renderCards = () => {
    return cards.map((card) => (
      <div
        key={card._id}
        className="card-item"
        onClick={() => handleSelectCard(card)}
      >
        <img src={card.image.secure_url} alt={card.nombre} className="card-image" />
        <div className="card-name">{card.nombre}</div>
        <div className="card-id">ID: {card._id}</div>
      </div>
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const maxDisplayedPages = 7;
    const pageNumbers = [];

    let startPage = currentPage - Math.floor(maxDisplayedPages / 2);
    let endPage = currentPage + Math.floor(maxDisplayedPages / 2);

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        {currentPage > 1 && (
          <>
            <button className="pagination-btn" onClick={() => paginate(1)}>
              &lt;&lt;
            </button>
            <button className="pagination-btn" onClick={() => paginate(currentPage - 1)}>
              &lt;
            </button>
          </>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-btn ${number === currentPage ? 'active' : ''}`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <>
            <button className="pagination-btn" onClick={() => paginate(currentPage + 1)}>
              &gt;
            </button>
            <button className="pagination-btn" onClick={() => paginate(totalPages)}>
              &gt;&gt;
            </button>
          </>
        )}
      </div>
    );
  };

  const handleModalOverlayClick = () => {
    setSelectedCard(null);
  };

  return (
    <div className="card-editor-container">
      <div className="buscar-input">
        <input
          type="text"
          placeholder="Buscar carta..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="card-grid-home">{renderCards()}</div>
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
      {renderPagination()}
    </div>
  );
};

export default CardEditor;
