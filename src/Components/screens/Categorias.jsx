import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar'; // Importa el Sidebar

const initialCategorias = [
  { img: 'https://via.placeholder.com/50', nombre: 'Bebidas', estado: 'Habilitada' },
  { img: 'https://via.placeholder.com/50', nombre: 'Comidas', estado: 'Habilitada' },
  { img: 'https://via.placeholder.com/50', nombre: 'Postres', estado: 'Inhabilitada' }
];

function Categorias() {
  const [categoriasData, setCategoriasData] = useState(initialCategorias);

  // Maneja el cambio de estado de la categoría
  const toggleEstado = (index) => {
    const updatedCategorias = [...categoriasData];
    updatedCategorias[index].estado = updatedCategorias[index].estado === 'Habilitada' ? 'Inhabilitada' : 'Habilitada';
    setCategoriasData(updatedCategorias);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Categorías</h3>
          <button className="btn btn-danger">+ Agregar</button>
        </div>

        {/* Tabla de Categorías */}
        <table className="table table-bordered mt-4">
          <thead className="table-danger">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {categoriasData.map((categoria, index) => (
              <tr key={index}>
                <td><img src={categoria.img} alt={categoria.nombre} className="rounded" width="50" /></td>
                <td>{categoria.nombre}</td>
                <td>
                  <button
                    className={`btn ${categoria.estado === 'Habilitada' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
                    onClick={() => toggleEstado(index)} // Cambia el estado al hacer clic
                  >
                    {categoria.estado}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categorias;