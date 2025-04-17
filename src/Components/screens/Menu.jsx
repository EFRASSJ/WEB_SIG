import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Sidebar from './Sidebar';

function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true); // 👈 nuevo loading
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
    categorias: [],
    adminId: ''
  });

  useEffect(() => {
    fetchProductos();
    fetchAdmins();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    setLoadingProductos(true);
    try {
      const response = await axios.get('http://localhost:8080/api/producto');
      setMenuData(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoadingProductos(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto/user');
      setAdmins(response.data);
    } catch (error) {
      console.error("Error al cargar admins:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categoria');
      setCategorias(response.data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCategoriaChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, categorias: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre: formData.nombre,
      precio: formData.precio,
      descripcion: formData.descripcion,
      imagen: formData.imagen || "sin-imagen",
      adminId: formData.adminId ? { id: formData.adminId } : null,
      categorias: formData.categorias.map(id => ({ id }))
    };

    try {
      await axios.post('http://localhost:8080/api/producto', nuevoProducto);
      setFormData({
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: '',
        categorias: [],
        adminId: ''
      });
      setShowForm(false);
      fetchProductos();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Menú</h3>
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
                  placeholder="Nombre"
                  className="form-control"
                  required
                />
              </div>
              <div className="col">
                <input
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="Precio"
                  className="form-control"
                  required
                />
              </div>
              <div className="col">
                <input
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  placeholder="URL Imagen (base64 o URL)"
                  className="form-control"
                />
              </div>
            </div>

            <input
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              className="form-control mb-3"
              required
            />

            {/* Select de admin */}
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
                  {admin.email}
                </option>
              ))}
            </select>

            {/* Select de categorías múltiples */}
            <select
              name="categorias"
              multiple
              className="form-control mb-3"
              value={formData.categorias}
              onChange={handleCategoriaChange}
              required
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-success">Guardar Producto</button>
          </form>
        )}

        {/* Tabla o loading */}
        {loadingProductos ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Cargando productos...</span>
            </div>
            <p className="mt-2">Cargando productos...</p>
          </div>
        ) : (
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
                  <td>
                    <img
                      src={item.imagen || "https://via.placeholder.com/50"}
                      alt={item.nombre}
                      className="rounded"
                      width="50"
                    />
                  </td>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    {item.categorias && item.categorias.length > 0 ? (
                      item.categorias.map((cat, catIndex) => (
                        <span key={catIndex} className="badge bg-primary me-1">
                          {cat.nombre}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">Sin categoría</span>
                    )}
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

export default Menu;
