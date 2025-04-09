import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar'; // Importa el Sidebar

const meseros = [
  { img: 'https://via.placeholder.com/50', nombre: 'Maximiliano Torres', correo: 'maximiliano@gmail.com', tipo: 'líder' },
  { img: 'https://via.placeholder.com/50', nombre: 'Ana Hernandez', correo: 'anahernandez@gmail.com', tipo: 'mesero' },
  { img: 'https://via.placeholder.com/50', nombre: 'Julio Alvares', correo: 'julioalvares@gmail.com', tipo: 'mesero' },
  { img: 'https://via.placeholder.com/50', nombre: 'Alison Martínez', correo: 'alisonmartinez@gmail.com', tipo: 'mesero' }
];

function GestionMeseros() {
  const [meserosData, setMeserosData] = useState(meseros);

  // Maneja el cambio de tipo
  const handleTipoChange = (index, newTipo) => {
    const updatedMeseros = [...meserosData];
    updatedMeseros[index].tipo = newTipo;
    setMeserosData(updatedMeseros);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Gestión de Meseros</h3>
          <button className="btn btn-danger">+ Agregar</button>
        </div>

        {/* Tabla de Meseros */}
        <table className="table table-bordered mt-4">
          <thead className="table-danger">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {meserosData.map((mesero, index) => (
              <tr key={index}>
                <td><img src={mesero.img} alt={mesero.nombre} className="rounded" width="50" /></td>
                <td>{mesero.nombre}</td>
                <td>{mesero.correo}</td>
                <td>******</td>
                <td>
                  <select
                    className="form-select"
                    value={mesero.tipo}
                    onChange={(e) => handleTipoChange(index, e.target.value)}
                  >
                    <option value="líder">Líder</option>
                    <option value="mesero">Mesero</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GestionMeseros;