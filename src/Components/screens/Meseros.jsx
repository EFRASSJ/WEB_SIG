import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Sidebar from './Sidebar';

function GestionMeseros() {
  const [meserosData, setMeserosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    imagen: '',
    tipo: 'mesero'
  });

  useEffect(() => {
    fetchMeseros();
  }, []);

  const fetchMeseros = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:8080/api/producto/user', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const meseros = res.data.map(user => {
        let tipo = 'mesero';
        if (user.roles?.includes('ROLE_ADMIN') || user.roles?.includes('ROLE_LIDER')) {
          tipo = 'líder';
        }

        return {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          tipo,
          img: user.photo || 'https://via.placeholder.com/50'
        };
      });

      setMeserosData(meseros);
    } catch (err) {
      console.error("Error al obtener meseros:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoMesero = {
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      photo: formData.imagen || null,
      roles: ["ROLE_MESERO"]
    };

    try {
      await axios.post('http://localhost:8080/auth/register', nuevoMesero);
      setFormData({
        nombre: '',
        email: '',
        password: '',
        imagen: '',
        tipo: 'mesero'
      });
      setShowForm(false);
      fetchMeseros();
    } catch (err) {
      console.error("Error al registrar mesero:", err);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Gestión de Meseros</h3>
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
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Correo"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="URL de imagen"
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  value="Mesero"
                  disabled
                />
              </div>
            </div>
            <button className="btn btn-success">Registrar Mesero</button>
          </form>
        )}

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Cargando meseros...</span>
            </div>
            <p className="mt-2">Cargando meseros...</p>
          </div>
        ) : (
          <table className="table table-bordered mt-4">
            <thead className="table-danger">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {meserosData.map((mesero, index) => (
                <tr key={index}>
                  <td><img src={mesero.img} alt={mesero.nombre} className="rounded" width="50" /></td>
                  <td>{mesero.nombre}</td>
                  <td>{mesero.email}</td>
                  <td>
                    <select className="form-select" value={mesero.tipo} disabled>
                      <option value="líder">Líder</option>
                      <option value="mesero">Mesero</option>
                    </select>
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

export default GestionMeseros;
