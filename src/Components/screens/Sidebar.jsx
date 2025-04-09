import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import mesero from './../img/mesero.png';
import categorias from './../img/categorias.png';
import Home from './../img/home.png';
import menu from './../img/menu.png';
import mesa from './../img/mesas.png';
import reseñas from './../img/reseña.png';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
      <div
          className="d-flex flex-column text-white"
          style={{
            width: '250px',
            height: '100vh',
            backgroundColor: '#9B1C31',
            position: 'fixed',
            top: 0,
            left: 0,
          }}
      >
        <div className="pt-3 px-3">
          <h4 className="text-center">RESTAURANT</h4>
          <hr />
        </div>

        <ul className="nav nav-pills flex-column mb-auto px-3">
          <li>
            <Link
                to="/home"
                className="nav-link text-white d-flex align-items-center"
                style={{ backgroundColor: isActive('/home') ? '#F47497' : 'transparent' }}
            >
              <img src={Home} alt="Dashboard" style={{ width: '30px', height: '30px', marginRight: '12px' }} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
                to="/meseros"
                className="nav-link text-white d-flex align-items-center"
                style={{ backgroundColor: isActive('/meseros') ? '#F47497' : 'transparent' }}
            >
              <img src={mesero} alt="Meseros" style={{ width: '30px', height: '30px', marginRight: '12px' }} />
              <span>Meseros</span>
            </Link>
          </li>
          <li>
            <Link
                to="/mesas"
                className="nav-link text-white d-flex align-items-center"
                style={{ backgroundColor: isActive('/mesas') ? '#F47497' : 'transparent' }}
            >
              <img src={mesa} alt="Mesas" style={{ width: '30px', height: '30px', marginRight: '12px' }} />
              <span>Mesas</span>
            </Link>
          </li>
          <li>
            <Link
                to="/categorias"
                className="nav-link text-white d-flex align-items-center"
                style={{ backgroundColor: isActive('/categorias') ? '#F47497' : 'transparent' }}
            >
              <img src={categorias} alt="Categorías" style={{ width: '30px', height: '30px', marginRight: '12px' }} />
              <span>Categorías</span>
            </Link>
          </li>
          <li>
            <Link
                to="/productos"
                className="nav-link text-white d-flex align-items-center"
                style={{ backgroundColor: isActive('/productos') ? '#F47497' : 'transparent' }}
            >
              <img src={menu} alt="Productos" style={{ width: '30px', height: '30px', marginRight: '12px' }} />
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link
                to="/resenas"
                className="nav-link text-white d-flex align-items-center"
                style={{ backgroundColor: isActive('/resenas') ? '#F47497' : 'transparent' }}
            >
              <img src={reseñas} alt="Reseñas" style={{ width: '30px', height: '30px', marginRight: '12px' }} />
              <span>Reseñas</span>
            </Link>
          </li>
        </ul>
      </div>
  );
}

export default Sidebar;
