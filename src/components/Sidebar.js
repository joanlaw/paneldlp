import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Importa el archivo de estilos CSS

const Sidebar = () => {
  return (
    <div className="sidebar">

      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <Link to="/crear-deck" className="sidebar-menu-link">Crear Deck</Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/crear-box" className="sidebar-menu-link">Crear Box</Link>
          <ul className="submenu-crear-box">
            <li>
              <Link to="/lista-box" className="submenu-link">Lista Box</Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/crear-torneo" className="sidebar-menu-link">Crear Torneo</Link>
        </li>
        <li>
        <Link to="/" className="sidebar-link">
  <button className="sidebar-btn">
    <span className="sidebar-btn-link">Volver al inicio</span>
  </button>
</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
