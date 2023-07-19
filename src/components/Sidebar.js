import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Importa el archivo de estilos CSS
import { Menu } from 'antd';
import { Navigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="SideMenu">
    <Menu className="SideMenuVertical" mode="vertical">
      <Menu.Item key="/crear-deck" className="sidebar-menu-item">
        <Link to="/crear-deck" className="sidebar-menu-link">
          Crear Deck
        </Link>
      </Menu.Item>
      <Menu.Item key="/lista-box" className="sidebar-menu-item">
        <Link to="/lista-box" className="sidebar-menu-link">
          Lista de cajas
        </Link>
      </Menu.Item>
      <Menu.Item key="/crear-torneo" className="sidebar-menu-item">
        <Link to="/crear-torneo" className="sidebar-menu-link">
          Crear Torneo
        </Link>
      </Menu.Item>
      <Menu.Item key="/crear-video" className="sidebar-menu-item">
        <Link to="/crear-video" className="sidebar-menu-link">
          Videos YT
        </Link>
      </Menu.Item>

      <Menu.Item key="/crear-entrada" className="sidebar-menu-item">
        <Link to="/crear-entrada" className="sidebar-menu-link">
          Crear entrada
        </Link>
      </Menu.Item>

      <Menu.Item key="/" className="sidebar-link">
        <Link to="/" className="sidebar-link">
          <button className="sidebar-btn">
            <span className="sidebar-btn-link">Volver al inicio</span>
          </button>
        </Link>
      </Menu.Item>
    </Menu>
  </div>
  );
};

export default Sidebar;
