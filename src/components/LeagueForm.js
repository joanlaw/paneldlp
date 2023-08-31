import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './LeagueFormStyles.css';

const API_URL = 'https://backend-dlp-neuronube.koyeb.app/leagues';

const LeagueForm = ({ leagueToEdit = null, afterSave }) => {
  const [leagueName, setLeagueName] = useState(leagueToEdit?.league_name || '');
  const [leagueFormat, setLeagueFormat] = useState(leagueToEdit?.league_format || '');
  const [startDate, setStartDate] = useState(leagueToEdit?.start_date?.split('T')[0] || '');
  const [startTime, setStartTime] = useState(leagueToEdit?.start_date?.split('T')[1]?.slice(0, 5) || '');
  const [enlaceTorneo, setEnlaceTorneo] = useState(leagueToEdit?.enlace_torneo || '');
  const [imageTorneo, setImageTorneo] = useState(leagueToEdit?.image_torneo || '');
  const [infoTorneo, setInfoTorneo] = useState(leagueToEdit?.infoTorneo || [{
    format: '',
    banlist: '',
    deck_info: '',
    eliminacion: ''
  }]);

  useEffect(() => {
    if (leagueToEdit) {
      setLeagueName(leagueToEdit.league_name);
      setLeagueFormat(leagueToEdit.league_format);
      setStartDate(leagueToEdit.start_date.split('T')[0]);
      setStartTime(leagueToEdit.start_date.split('T')[1]?.slice(0, 5));
      setEnlaceTorneo(leagueToEdit.enlace_torneo);
      setImageTorneo(leagueToEdit.image_torneo);
      setInfoTorneo(leagueToEdit.infoTorneo);
    }
  }, [leagueToEdit]);

  const handleInfoChange = (e, index, field) => {
    const updatedInfo = [...infoTorneo];
    updatedInfo[index][field] = e.target.value;
    setInfoTorneo(updatedInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        league_name: leagueName,
        league_format: leagueFormat,
        start_date: startDate + 'T' + startTime,
        enlace_torneo: enlaceTorneo,
        image_torneo: imageTorneo,
        infoTorneo: infoTorneo,
      };
      let response;

      if (leagueToEdit) {
        response = await axios.put(`${API_URL}/${leagueToEdit._id}`, payload);
      } else {
        response = await axios.post(API_URL, payload);
      }

      afterSave && afterSave(response.data);
      alert("Liga guardada con éxito!");

      // Resetear el formulario
      setLeagueName('');
      setLeagueFormat('');
      setStartDate('');
      setStartTime('');
      setEnlaceTorneo('');
      setImageTorneo('');
      setInfoTorneo([{
        format: '',
        banlist: '',
        deck_info: '',
        eliminacion: ''
      }]);

    } catch (error) {
      console.error("Error saving league:", error);
      alert("Error al guardar la liga. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="leagueForm-container">
      <div className="leagueForm__group">
        <label className="leagueForm__label">League Name:</label>
        <input
          type="text"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          className="leagueForm__input"
        />
      </div>
      <div className="leagueForm__group">
        <label className="leagueForm__label">League Format:</label>
        <input
          type="text"
          value={leagueFormat}
          onChange={(e) => setLeagueFormat(e.target.value)}
          className="leagueForm__input"
        />
      </div>
      <div className="leagueForm__group">
        <label className="leagueForm__label">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="leagueForm__input"
        />
      </div>
      <div className="leagueForm__group">
        <label className="leagueForm__label">Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="leagueForm__input"
        />
      </div>
      <div className="leagueForm__group">
        <label className="leagueForm__label">Enlace Torneo:</label>
        <input
          type="text"
          value={enlaceTorneo}
          onChange={(e) => setEnlaceTorneo(e.target.value)}
          className="leagueForm__input"
        />
      </div>
      <div className="leagueForm__group">
        <label className="leagueForm__label">Image Torneo:</label>
        <input
          type="text"
          value={imageTorneo}
          onChange={(e) => setImageTorneo(e.target.value)}
          className="leagueForm__input"
        />
      </div>
      {infoTorneo.map((info, index) => (
        <div key={index} className="leagueForm__group">
          <label className="leagueForm__label">Format:</label>
          <input
            type="text"
            value={info.format}
            onChange={(e) => handleInfoChange(e, index, 'format')}
            className="leagueForm__input"
          />
          <label className="leagueForm__label">Banlist:</label>
          <input
            type="text"
            value={info.banlist}
            onChange={(e) => handleInfoChange(e, index, 'banlist')}
            className="leagueForm__input"
          />
          <label className="leagueForm__label">Deck Info:</label>
          <input
            type="text"
            value={info.deck_info}
            onChange={(e) => handleInfoChange(e, index, 'deck_info')}
            className="leagueForm__input"
          />
          <label className="leagueForm__label">Eliminacion:</label>
          <input
            type="text"
            value={info.eliminacion}
            onChange={(e) => handleInfoChange(e, index, 'eliminacion')}
            className="leagueForm__input"
          />
        </div>
      ))}
      <div className="leagueForm__group">
        <button type="submit" className="leagueForm__button">Save</button>
      </div>
    </form>
  );
  
};

export default LeagueForm;
