import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar'; // Importa el Sidebar
import ReactStars from 'react-rating-stars-component'; // Componente para mostrar estrellas
import { VictoryBar } from 'victory'; // Para la gráfica de barras

const resenas = [
  {
    nombre: 'Juan Perez',
    comentario: 'Increíble experiencia. La comida fue deliciosa y el servicio excelente.',
    calificacion: 5,
  },
  {
    nombre: 'Ana López',
    comentario: 'Buen lugar, aunque podría mejorar la atención al cliente.',
    calificacion: 4,
  },
];

// Datos para la gráfica de barras
const calificacionesData = [
  { x: '5 estrellas', y: 120 },
  { x: '4 estrellas', y: 80 },
  { x: '3 estrellas', y: 30 },
  { x: '2 estrellas', y: 15 },
  { x: '1 estrella', y: 5 },
];

function Reseñas() {
  return (
    <div className="d-flex">
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="container-fluid p-4">
        <h3>Reseñas</h3>
        <div className="d-flex align-items-center mb-4">
          <h1>4.5</h1>
          <ReactStars value={4.5} size={30} edit={false} /> {/* Calificación promedio */}
          <p>Basado en 3,512,100 reseñas</p>
        </div>

        {/* Gráfica de barras */}
        <div className="mt-4 p-4 bg-light rounded shadow">
          <h5 className="text-center mb-4 text-danger">Distribución de Calificaciones</h5>
          <VictoryBar
            data={calificacionesData}
            x="x"
            y="y"
            style={{
              data: { fill: '#D81B60' },
              labels: { fill: '#555' },
            }}
          />
        </div>

        {/* Lista de reseñas individuales */}
        <div className="mt-4">
          {resenas.map((reseña, index) => (
            <div key={index} className="mb-4 border p-3 rounded">
              <h5>{reseña.nombre}</h5>
              <ReactStars value={reseña.calificacion} size={20} edit={false} />
              <p>{reseña.comentario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reseñas;
