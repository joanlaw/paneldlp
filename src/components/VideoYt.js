import React, { useState, useEffect } from 'react';
import './VideoYt.css';

function VideoYt() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [deck, setDeck] = useState('');
  const [deck2, setDeck2] = useState('');
  const [deck3, setDeck3] = useState('');
  const [deck4, setDeck4] = useState('');
  const [deck5, setDeck5] = useState('');
  const [bannerVideo, setBannerVideo] = useState('');
  const [alert, setAlert] = useState(null); // Nuevo estado para la alerta

  const handleSubmit = async (e) => {
    e.preventDefault();

    const videoData = {
      titulo,
      descripcion,
      link_video: linkVideo,
      deck,
      deckv2: deck2,
      deckv3: deck3,
      deckv4: deck4,
      deckv5: deck5,
      banner_video: bannerVideo,
    };

    try {
      const response = await fetch('https://backend-dlp-neuronube.koyeb.app/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
      });
    
      if (response.ok) {
        // Mostrar alerta de éxito
        setAlert({ type: 'success', message: 'Video creado exitosamente' });
        // Reiniciar campos del formulario
        setTitulo('');
        setDescripcion('');
        setLinkVideo('');
        setDeck('');
        setDeck2('');
        setDeck3('');
        setDeck4('');
        setDeck5('');
        setBannerVideo('');
      } else {
        // Mostrar alerta de error
        setAlert({ type: 'error', message: 'Error al crear el video' });
      }
    } catch (error) {
      console.error(error);
    }
    
  };

  useEffect(() => {
    // Limpia la alerta después de un tiempo
    const timer = setTimeout(() => {
      setAlert(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="video-yt-container">
      <h1 className="video-yt-title">Crear Video</h1>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}
      <form className="video-yt-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-textarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Link del Video:</label>
          <input
            type="text"
            className="form-input"
            value={linkVideo}
            onChange={(e) => setLinkVideo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Deck:</label>
          <input
            type="text"
            className="form-input"
            value={deck}
            onChange={(e) => setDeck(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Deck 2:</label>
          <input
            type="text"
            className="form-input"
            value={deck2}
            onChange={(e) => setDeck2(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Deck 3:</label>
          <input
            type="text"
            className="form-input"
            value={deck3}
            onChange={(e) => setDeck3(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Deck 4:</label>
          <input
            type="text"
            className="form-input"
            value={deck4}
            onChange={(e) => setDeck4(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Deck 5:</label>
          <input
            type="text"
            className="form-input"
            value={deck5}
            onChange={(e) => setDeck5(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Banner del Video:</label>
          <input
            type="text"
            className="form-input"
            value={bannerVideo}
            onChange={(e) => setBannerVideo(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Crear Video</button>
      </form>
    </div>
  );
  
}

export default VideoYt;
