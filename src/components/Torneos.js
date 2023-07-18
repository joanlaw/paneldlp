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
  const [top3, setTop3] = useState('');
  const [top4, setTop4] = useState('');
  const [submitting, setSubmitting] = useState(false); // Estado para controlar el envío del formulario

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
      top3,
      top4
    };

    try {
      setSubmitting(true); // Establecer el estado de envío en true durante la solicitud

      const response = await fetch('https://back-render-cloud-dlp.onrender.com/torneos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(torneoData),
      });

      if (response.ok) {
        // El torneo se creó exitosamente
        console.log('Torneo creado');
        // Restablecer los campos a sus valores iniciales
        setNombre('');
        setFecha('');
        setOrganizador('');
        setInformacionTorneo('');
        setFormatoTorneo('');
        setBanner('');
        setTop1('');
        setTop2('');
        setTop3('');
        setTop4('');
      } else {
        // Ocurrió un error al crear el torneo
        console.log('Error al crear el torneo');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false); // Establecer el estado de envío en false después de la solicitud
    }
  };

  return (
    <div className="torneos-container">
      <h1 className="torneos-title">Crear Torneo</h1>
      <form className="torneos-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha:</label>
          <input
            type="text"
            className="form-input"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Organizador:</label>
          <input
            type="text"
            className="form-input"
            value={organizador}
            onChange={(e) => setOrganizador(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Información del Torneo:</label>
          <textarea
            className="form-textarea"
            value={informacionTorneo}
            onChange={(e) => setInformacionTorneo(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Formato del Torneo:</label>
          <input
            type="text"
            className="form-input"
            value={formatoTorneo}
            onChange={(e) => setFormatoTorneo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Banner:</label>
          <input
            type="text"
            className="form-input"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Top 1:</label>
          <input
            type="text"
            className="form-input"
            value={top1}
            onChange={(e) => setTop1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Top 2:</label>
          <input
            type="text"
            className="form-input"
            value={top2}
            onChange={(e) => setTop2(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Top 3:</label>
          <input
            type="text"
            className="form-input"
            value={top3}
            onChange={(e) => setTop3(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Top 4:</label>
          <input
            type="text"
            className="form-input"
            value={top4}
            onChange={(e) => setTop4(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Crear Torneo'}
        </button>
      </form>
    </div>
  );
}

export default Torneos;
