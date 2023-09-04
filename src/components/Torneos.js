import React, { useState } from 'react';
import './Torneos.css';

function Torneos() {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [informacionTorneo, setInformacionTorneo] = useState('');
  const [formatoTorneo, setFormatoTorneo] = useState('');
  const [banner, setBanner] = useState('');
  const [top1, setTop1] = useState('');
  const [top2, setTop2] = useState('');
  const [top4_1, setTop4_1] = useState('');
  const [top4_2, setTop4_2] = useState('');
  const [top8_1, setTop8_1] = useState('');
  const [top8_2, setTop8_2] = useState('');
  const [top8_3, setTop8_3] = useState('');
  const [top8_4, setTop8_4] = useState('');
  const [decks, setDecks] = useState([{ nombre: '', cantidad: 0 }]);
  const [submitting, setSubmitting] = useState(false);
  
  const handleAddDeck = () => {
    setDecks([...decks, { nombre: '', cantidad: 0 }]);
  };
  
  const handleRemoveDeck = (index) => {
    const newDecks = [...decks];
    newDecks.splice(index, 1);
    setDecks(newDecks);
  };
  
  const handleDeckChange = (e, index, field) => {
    const newDecks = [...decks];
    newDecks[index][field] = e.target.value;
    setDecks(newDecks);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const torneoData = {
      nombre,
      fecha,
      organizador,
      informacion_torneo: informacionTorneo,
      formato_torneo: formatoTorneo,
      banner,
      top1,
      top2,
      top4_1,
      top4_2,
      top8_1,
      top8_2,
      top8_3,
      top8_4,
      decks
    };

    try {
      setSubmitting(true);
  
      const response = await fetch('https://backend-dlp-neuronube.koyeb.app/torneos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(torneoData),
      });
  
      if (response.ok) {
        console.log('Torneo creado');
        setNombre('');
        setFecha('');
        setOrganizador('');
        setInformacionTorneo('');
        setFormatoTorneo('');
        setBanner('');
        setTop1('');
        setTop2('');
        setTop4_1('');
        setTop4_2('');
        setTop8_1('');
        setTop8_2('');
        setTop8_3('');
        setTop8_4('');
        setDecks([{ nombre: '', cantidad: 0 }]);
      } else {
        console.log('Error al crear el torneo');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="torneos-container">
      <h1 className="torneos-title">Crear Torneo</h1>
      <form className="torneos-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input type="text" className="form-input" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha:</label>
          <input type="text" className="form-input" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Organizador:</label>
          <input type="text" className="form-input" value={organizador} onChange={(e) => setOrganizador(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Información del Torneo:</label>
          <textarea className="form-textarea" value={informacionTorneo} onChange={(e) => setInformacionTorneo(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Formato del Torneo:</label>
          <input type="text" className="form-input" value={formatoTorneo} onChange={(e) => setFormatoTorneo(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Banner:</label>
          <input type="text" className="form-input" value={banner} onChange={(e) => setBanner(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Top 1:</label>
          <input type="text" className="form-input" value={top1} onChange={(e) => setTop1(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Top 2:</label>
          <input type="text" className="form-input" value={top2} onChange={(e) => setTop2(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Top 4-1:</label>
          <input type="text" className="form-input" value={top4_1} onChange={(e) => setTop4_1(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Top 4-2:</label>
          <input type="text" className="form-input" value={top4_2} onChange={(e) => setTop4_2(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Top 8-1:</label>
          <input type="text" className="form-input" value={top8_1} onChange={(e) => setTop8_1(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Top 8-2:</label>
          <input type="text" className="form-input" value={top8_2} onChange={(e) => setTop8_2(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Top 8-3:</label>
          <input type="text" className="form-input" value={top8_3} onChange={(e) => setTop8_3(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Top 8-4:</label>
          <input type="text" className="form-input" value={top8_4} onChange={(e) => setTop8_4(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Decks:</label>
          {decks.map((deck, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Nombre del Deck"
                value={deck.nombre}
                onChange={(e) => handleDeckChange(e, index, 'nombre')}
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={deck.cantidad}
                onChange={(e) => handleDeckChange(e, index, 'cantidad')}
              />
              <button type="button" onClick={() => handleRemoveDeck(index)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={handleAddDeck}>Agregar Deck</button>
        </div>
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Crear Torneo'}
        </button>
      </form>
    </div>
  );
}

export default Torneos;
