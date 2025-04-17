import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Sidebar from './Sidebar';

function GestionMesas() {
  const [mesasData, setMesasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mesa: '',
    capacidad: '',
    imagen: ''
  });

  useEffect(() => {
    fetchMesas();
  }, []);

  const fetchMesas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:8080/api/mesa', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const dataConEstado = response.data.map(mesa => ({
        ...mesa,
        estado: mesa.capacidad > 0 ? 'Habilitada' : 'Inhabilitada'
      }));
      setMesasData(dataConEstado);
    } catch (error) {
      console.error("Error al cargar mesas:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEstado = (index) => {
    const updated = [...mesasData];
    updated[index].estado = updated[index].estado === 'Habilitada' ? 'Inhabilitada' : 'Habilitada';
    setMesasData(updated);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaMesa = {
      mesa: formData.mesa,
      capacidad: parseInt(formData.capacidad),
      imagen: formData.imagen || null
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post('http://localhost:8080/api/mesa', nuevaMesa, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFormData({ mesa: '', capacidad: '', imagen: '' });
      setShowForm(false);
      fetchMesas();
    } catch (error) {
      console.error("Error al crear la mesa:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Mesas</h3>
          <button className="btn btn-danger" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Agregar'}
          </button>
        </div>

        {showForm && (
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  name="mesa"
                  value={formData.mesa}
                  onChange={handleChange}
                  placeholder="Nombre de la mesa"
                  className="form-control"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  placeholder="Capacidad"
                  className="form-control"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  placeholder="URL Imagen (opcional)"
                  className="form-control"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">Guardar Mesa</button>
          </form>
        )}

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Cargando mesas...</span>
            </div>
            <p className="mt-2">Cargando mesas...</p>
          </div>
        ) : (
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
                <tr key={mesa.id || index}>
                  <td>
                    <img
                      src={mesa.imagen || 'https://via.placeholder.com/50'}
                      alt={mesa.mesa || 'Sin nombre'}
                      className="rounded"
                      width="50"
                    />
                  </td>
                  <td>{mesa.mesa || 'Sin nombre'}</td>
                  <td>{mesa.capacidad ?? 'Sin info'}</td>
                  <td>
                    <button
                      className={`btn ${mesa.estado === 'Habilitada' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
                      onClick={() => toggleEstado(index)}
                    >
                      {mesa.estado}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GestionMesas;
