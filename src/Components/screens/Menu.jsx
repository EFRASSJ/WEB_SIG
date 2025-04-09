import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar'; // Importa el Sidebar

const initialMenu = [
  {
    img: 'https://via.placeholder.com/50',
    nombre: 'Coca Cola',
    precio: '$1.50',
    descripcion: 'Bebida gaseosa refrescante.',
    categorias: ['Bebidas', 'Frías']
  },
  {
    img: 'https://via.placeholder.com/50',
    nombre: 'Hamburguesa',
    precio: '$5.00',
    descripcion: 'Hamburguesa con queso y papas fritas.',
    categorias: ['Comidas', 'Rápidas']
  },
  {
    img: 'https://via.placeholder.com/50',
    nombre: 'Helado',
    precio: '$2.00',
    descripcion: 'Helado de vainilla con chispas de chocolate.',
    categorias: ['Postres', 'Frías']
  }
];

function Menu() {
  const [menuData] = useState(initialMenu);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Menú</h3>
          <button className="btn btn-danger">+ Agregar</button>
        </div>

        {/* Tabla de Menú */}
        <table className="table table-bordered mt-4">
          <thead className="table-danger">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Categorías</th>
            </tr>
          </thead>
          <tbody>
            {menuData.map((item, index) => (
              <tr key={index}>
                <td><img src={item.img} alt={item.nombre} className="rounded" width="50" /></td>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
                <td>{item.descripcion}</td>
                <td>
                  {item.categorias.map((categoria, catIndex) => (
                    <span key={catIndex} className="badge bg-primary me-1">
                      {categoria}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Menu;