import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
 
function Reseñas() {
  const [resenas, setResenas] = useState([]);
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);
  const [nombre, setNombre] = useState('');
  const [mesaNombre, setMesaNombre] = useState('');

  useEffect(() => {
    cargarResenas();
  }, []);

  const cargarResenas = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/resena");
      setResenas(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al obtener reseñas", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario || puntuacion < 1 || !nombre || !mesaNombre) {
      alert("Completa todos los campos");
      return;
    }

    const resena = {
      comentario,
      puntuacion,
      userId: nombre,
      mesaId: { mesa: mesaNombre }
    };

    try {
      await axios.post("http://localhost:8080/api/resena", resena);
      alert("¡Gracias por tu reseña!");
      setComentario('');
      setPuntuacion(0);
      setNombre('');
      setMesaNombre('');
      cargarResenas();
    } catch (error) {
      console.error("Error al enviar reseña", error);
      alert("Error al enviar reseña");
    }
  };

  const promedio = resenas.length
    ? (resenas.reduce((sum, r) => sum + r.puntuacion, 0) / resenas.length).toFixed(1)
    : 0;

  const distribucion = [0, 0, 0, 0, 0];
  resenas.forEach(r => {
    if (r.puntuacion >= 1 && r.puntuacion <= 5) distribucion[r.puntuacion - 1]++;
  });

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <div className="row">
          {/* Título y promedio */}
          <div className="col-md-6 mb-4 text-center">
            <h2 className="fw-bold">Reseñas</h2>
            <h1 className="display-4 fw-bold">{promedio}</h1>
            <StarRatings
              rating={parseFloat(promedio)}
              starRatedColor="#FFD700"
              numberOfStars={5}
              starDimension="30px"
              starSpacing="4px"
            />
            <p className="text-muted mt-2">{resenas.length} reseña{resenas.length !== 1 ? 's' : ''}</p>

            {/* Distribución de estrellas */}
            <div className="mt-4">
              {[5, 4, 3, 2, 1].map((estrella, index) => (
                <div key={estrella} className="d-flex align-items-center mb-2">
                  <span className="me-2" style={{ width: 20 }}>{estrella}⭐</span>
                  <div className="progress flex-grow-1 me-2" style={{ height: 10 }}>
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: `${(distribucion[estrella - 1] / resenas.length) * 100 || 0}%` }}
                    />
                  </div>
                  <span>{distribucion[estrella - 1]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="col-md-6 mb-4">
            <div className="bg-light shadow p-4 rounded">
              <h5 className="text-center text-danger fw-bold mb-3">Deja tu Reseña</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="form-control"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Nombre de la Mesa"
                    className="form-control"
                    value={mesaNombre}
                    onChange={e => setMesaNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Comentario"
                    value={comentario}
                    onChange={e => setComentario(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 text-center">
                  <label className="form-label">Calificación</label>
                  <br />
                  <StarRatings
                    rating={puntuacion}
                    starRatedColor="#FFD700"
                    changeRating={(newValue) => setPuntuacion(newValue)}
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="4px"
                    name="rating"
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-danger px-4">Enviar Reseña</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Lista de reseñas */}
        <div className="row mt-4">
          {resenas.map((reseña, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="border p-3 rounded bg-white shadow-sm h-100">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                    alt="avatar"
                    style={{ width: 50, height: 50, borderRadius: '50%', marginRight: 15 }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{reseña.userId || 'Anónimo'}</h6>
                    <StarRatings
                      rating={reseña.puntuacion}
                      starRatedColor="#FFD700"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="3px"
                      name={`rating-${index}`}
                    />
                  </div>
                </div>
                <p className="mb-0">{reseña.comentario}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reseñas;
