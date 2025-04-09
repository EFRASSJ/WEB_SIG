import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar'; // Importa el Sidebar

const initialMesas = [
  { img: 'https://via.placeholder.com/50', mesa: 'Mesa_01', capacidad: '4 Personas', estado: 'Habilitada' },
  { img: 'https://via.placeholder.com/50', mesa: 'Mesa_02', capacidad: '2 Personas', estado: 'Habilitada' },
  { img: 'https://via.placeholder.com/50', mesa: 'Mesa_03', capacidad: '6 Personas', estado: 'Inhabilitada' },
  { img: 'https://via.placeholder.com/50', mesa: 'Mesa_04', capacidad: '2 Personas', estado: 'Habilitada' }
];

function GestionMesas() {
  const [mesasData, setMesasData] = useState(initialMesas);

  // Maneja el cambio de estado de la mesa
  const toggleEstado = (index) => {
    const updatedMesas = [...mesasData];
    updatedMesas[index].estado = updatedMesas[index].estado === 'Habilitada' ? 'Inhabilitada' : 'Habilitada';
    setMesasData(updatedMesas);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Mesas</h3>
          <button className="btn btn-danger">+ Agregar</button>
        </div>

        {/* Tabla de Mesas */}
        <table className="table table-bordered mt-4">
          <thead className="table-danger">
            <tr>
              <th>Imagen</th>
              <th>Mesa</th>
              <th>Capacidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mesasData.map((mesa, index) => (
              <tr key={index}>
                <td><img src={mesa.img} alt={mesa.mesa} className="rounded" width="50" /></td>
                <td>{mesa.mesa}</td>
                <td>{mesa.capacidad}</td>
                <td>
                  <button
                    className={`btn ${mesa.estado === 'Habilitada' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
                    onClick={() => toggleEstado(index)} // Cambia el estado al hacer clic
                  >
                    {mesa.estado}
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

export default GestionMesas;