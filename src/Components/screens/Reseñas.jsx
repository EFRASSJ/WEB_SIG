import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import ReactStars from 'react-rating-stars-component';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const calificacionesData = {
  labels: ['5⭐', '4⭐', '3⭐', '2⭐', '1⭐'],
  datasets: [
    {
      label: 'Cantidad de Reseñas',
      data: [120, 80, 30, 15, 5], // Valores de las calificaciones
      backgroundColor: '#D81B60',
      borderColor: '#D81B60',
      borderWidth: 1,
    },
  ],
};

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
            <Bar data={calificacionesData} />
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
