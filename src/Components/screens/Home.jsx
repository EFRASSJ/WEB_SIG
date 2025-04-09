import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VictoryBar, VictoryPie } from 'victory';
import { data } from '../utils/informe';
import {ingresosData} from './../utils/informe'
import Sidebar from './Sidebar'; // Importa el Sidebar

const pieData = [
  { x: 'Día', y: 60 },
  { x: 'Noche', y: 40 },
];

function AdminPanel() {
  return (
    <div className="d-flex bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Panel de Administración</h3>
          <button className="btn btn-danger">PDF</button>
        </div>

        {/* Chart Section */}
        <div className="d-flex justify-content-between mt-4">
          <div className="p-3 rounded mt-3">
            <h5>Ventas</h5>
            <VictoryBar data={data} x="day" y="earnings" style={{ data: { fill: 'maroon' } }} />
          </div>
          <div>
            <h5>Ventas Totales: <strong>980</strong></h5>
            <VictoryPie data={pieData} colorScale={["#D81B60", "#F06292"]} radius={80} />
          </div>
        </div>

        {/* Table */}
        <table className="table table-striped table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>Día</th>
              <th>Ingresos Día</th>
              <th>Ingresos Tarde </th>
              <th>Total</th>
              <th>Clientes Día</th>
              <th>Clientes Tarde</th>
            </tr>
          </thead>
          <tbody>
            {ingresosData.map((ingreso, index) => (
              <tr key={index}>
                <td>{ingreso.dia}</td>
                <td>{ingreso.ingresosDia}</td>
                <td>{ingreso.ingresosTarde}</td>
                <td>{ingreso.total}</td>
                <td>{ingreso.clientesDia}</td>
                <td>{ingreso.clientesTarde}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;