import React, { useState } from 'react';
import axios from 'axios';

import './LeagueFormStyles.css';


const API_URL = 'https://backend-dlp-neuronube.koyeb.app/leagues';

const LeagueForm = ({ leagueToEdit = null, afterSave }) => {
  const [leagueName, setLeagueName] = useState(leagueToEdit?.league_name || '');
  const [leagueFormat, setLeagueFormat] = useState(leagueToEdit?.league_format || '');
  const [startDate, setStartDate] = useState(leagueToEdit?.start_date?.split('T')[0] || '');
  const [startTime, setStartTime] = useState(leagueToEdit?.start_date?.split('T')[1]?.slice(0, 5) || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        league_name: leagueName, 
        league_format: leagueFormat, 
        start_date: startDate + 'T' + startTime 
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
        <button type="submit" className="leagueForm__button">Save</button>
      </div>
    </form>
  );
};

export default LeagueForm;
