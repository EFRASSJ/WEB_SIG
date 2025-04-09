import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import ReactStars from 'react-rating-stars-component';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from 'victory';

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

const calificacionesData = [
  { x: '5⭐', y: 120 },
  { x: '4⭐', y: 80 },
  { x: '3⭐', y: 30 },
  { x: '2⭐', y: 15 },
  { x: '1⭐', y: 5 },
];

function ReseñasScreen() {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h3 className="mb-4">Reseñas</h3>

        <div className="d-flex align-items-center gap-3 mb-4">
          <h1 className="mb-0">4.5</h1>
          <ReactStars value={4.5} size={30} edit={false} />
          <p className="mb-0">Basado en 3,512,100 reseñas</p>
        </div>

        <div className="mt-4 p-4 bg-light rounded shadow">
          <h5 className="text-center mb-4 text-danger">Distribución de Calificaciones</h5>
          <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryBar data={calificacionesData} x="x" y="y" style={{ data: { fill: '#D81B60' } }} />
          </VictoryChart>
        </div>

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

export default ReseñasScreen;
