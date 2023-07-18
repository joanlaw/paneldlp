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
import VideoYt from './components/VideoYt';
import Torneos from './components/Torneos';
import './components/Header.css'; // Importa el archivo de estilos CSS
import Footer from './components/Footer';

function App() {
  return (
    <Router>
  <div className="App">
    <Header />
    <div className="SideMenuAndPageContent">
      <Sidebar />
      <div className="PageContent">
        <Routes>
          <Route path="/" element={<CardEditor />} />
          <Route path="/crear-deck" element={<CrearDeck />} />
          <Route path="/crear-box" element={<CrearBox />} />
          <Route path="/crear-torneo" element={<Torneos />} />
          <Route path="/lista-box" element={<ListaBox />} />
          <Route path="/lista-box/:boxId" element={<DetalleBox />} />
          <Route path="/crear-video" element={<VideoYt />} />
        </Routes>
      </div>
    </div>
    <Footer />
  </div>
    </Router>
  );
}

export default App;
