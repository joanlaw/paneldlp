import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardForm from './CardForm';
import './CardEditor.css';

const CardEditor = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(50);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://back-render-cloud-dlp.onrender.com/cards/');
        setCards(response.data);
      } catch (error) {
        console.log('Error al obtener las cartas:', error);
      }
    };

    fetchCards();
  }, []);

  const filteredCards = cards.filter((card) => {
    const nameMatch = card.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const englishNameMatch = card.name_english.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || englishNameMatch;
  });

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        await axios.put(`https://back-render-cloud-dlp.onrender.com/cards/${updatedCard._id}`, updatedCard);
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
    return currentCards.map((card) => (
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

  const renderPagination = () => {
    const pageCount = Math.ceil(filteredCards.length / cardsPerPage);
    const maxDisplayedPages = 7;
    const pageNumbers = [];

    let startPage = currentPage - Math.floor(maxDisplayedPages / 2);
    let endPage = currentPage + Math.floor(maxDisplayedPages / 2);

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > pageCount) {
      startPage -= endPage - pageCount;
      endPage = pageCount;
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
        {currentPage < pageCount && (
          <>
            <button className="pagination-btn" onClick={() => paginate(currentPage + 1)}>
              &gt;
            </button>
            <button className="pagination-btn" onClick={() => paginate(pageCount)}>
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
      <h1>Dlp creator 1.0</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar carta..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="card-grid">{renderCards()}</div>
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
      {renderPagination()}
    </div>
  );
};

export default CardEditor;
