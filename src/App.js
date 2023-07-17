import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import CardEditor from './components/CardEditor';
import CrearDeck from './components/CrearDeck';
import CrearBox from './components/CrearBox';
import CrearTorneo from './components/CrearTorneo';
import ListaBox from './components/ListaBox';
import DetalleBox from './components/DetalleBox';
import Header from './components/Header';
import './components/Header.css'; // Importa el archivo de estilos CSS

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="SideMenuAndPageContent">
  <Sidebar></Sidebar>
  <div className="PageContent">
    <Routes>
      <Route path="/" element={<CardEditor />} />
      <Route path="/crear-deck" element={<CrearDeck />} />
      <Route path="/crear-box" element={<CrearBox />} />
      <Route path="/crear-torneo" element={<CrearTorneo />} />
      <Route path="/lista-box" element={<ListaBox />} />
      <Route path="/lista-box/:boxId" element={<DetalleBox />} />
    </Routes>
  </div>
</div>
      </div>
    </Router>
  );
}

export default App;
