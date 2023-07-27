import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';

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
import './components/Header.css'; 
import Footer from './components/Footer';
import Blog from './components/Blog';
import Login from './components/Login'; 
import WithAuth from './components/WithAuth';

// Inicializa Firebase
initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="SideMenuAndPageContent">
          <Sidebar />
          <div className="PageContent">
            <Routes>
              <Route path="/" element={<WithAuth component={CardEditor} />} />
              <Route path="/crear-deck" element={<WithAuth component={CrearDeck} />} />
              <Route path="/crear-box" element={<WithAuth component={CrearBox} />} />
              <Route path="/crear-torneo" element={<WithAuth component={Torneos} />} />
              <Route path="/lista-box" element={<WithAuth component={ListaBox} />} />
              <Route path="/lista-box/:boxId" element={<WithAuth component={DetalleBox} />} />
              <Route path="/crear-video" element={<WithAuth component={VideoYt} />} />
              <Route path="/crear-entrada" element={<WithAuth component={Blog} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
