import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Sidebar from './Sidebar';

function Categorias() {
  const [categoriasData, setCategoriasData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Estado para mostrar spinner
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Habilitada',
    imagen: '',
    adminId: ''
  });

  useEffect(() => {
    fetchCategorias();
    fetchAdmins();
  }, []);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/categoria');
      setCategoriasData(res.data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/producto/user');
      setAdmins(res.data);
    } catch (err) {
      console.error('Error al cargar admins:', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaCategoria = {
      nombre: formData.nombre,
      estado: formData.estado,
      imagen: formData.imagen || null,
      adminId: { id: formData.adminId }
    };

    try {
      await axios.post('http://localhost:8080/api/categoria', nuevaCategoria);
      setFormData({ nombre: '', estado: 'Habilitada', imagen: '', adminId: '' });
      setShowForm(false);
      fetchCategorias();
    } catch (err) {
      console.error('Error al agregar categoría:', err);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Categorías</h3>
          <button className="btn btn-danger" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Agregar'}
          </button>
        </div>

        {showForm && (
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre de la categoría"
                  className="form-control"
                  required
                />
              </div>
              <div className="col">
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="Habilitada">Habilitada</option>
                  <option value="Inhabilitada">Inhabilitada</option>
                </select>
              </div>
              <div className="col">
                <input
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  placeholder="URL o base64 de imagen"
                  className="form-control"
                />
              </div>
            </div>
            <select
              name="adminId"
              value={formData.adminId}
              onChange={handleChange}
              className="form-control mb-3"
              required
            >
              <option value="">Selecciona un administrador</option>
              {admins.map(admin => (
                <option key={admin.id} value={admin.id}>
                  {admin.email || `ID: ${admin.id}`}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-success">Registrar Categoría</button>
          </form>
        )}

        {/* Mostrar loading mientras se cargan las categorías */}
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando categorías...</p>
          </div>
        ) : (
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
                  <td>
                    <img
                      src={categoria.imagen || 'https://via.placeholder.com/50'}
                      alt={categoria.nombre}
                      className="rounded"
                      width="50"
                    />
                  </td>
                  <td>{categoria.nombre}</td>
                  <td>
                    <span className={`badge ${categoria.estado === 'Habilitada' ? 'bg-success' : 'bg-secondary'}`}>
                      {categoria.estado}
                    </span>
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

export default Categorias;
