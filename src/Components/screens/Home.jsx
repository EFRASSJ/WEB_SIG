import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function AdminPanel() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true); //  Estado de carga

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const fetchOrdenes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/orden");
      setOrdenes(res.data || []);
    } catch (error) {
      console.error("Error al cargar órdenes:", error);
    } finally {
      setLoading(false); //  Finaliza carga
    }
  };

  const totalOrdenes = ordenes.length;

  const barChartData = {
    labels: ordenes.map((_, index) => `Orden ${index + 1}`),
    datasets: [
      {
        label: "Número de Productos",
        backgroundColor: "#B71C1C",
        data: ordenes.map((o) => o.productos?.length || 0),
      },
    ],
  };

  const pieChartData = {
    labels: ordenes.map((_, index) => `Orden ${index + 1}`),
    datasets: [
      {
        data: ordenes.map((o) => o.productos?.length || 0),
        backgroundColor: ordenes.map(
          (_, i) => ["#E91E63", "#F06292", "#FFCDD2", "#D81B60", "#F8BBD0"][i % 5]
        ),
      },
    ],
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Órdenes", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["#", "Mesa", "Productos", "Comentario", "Fecha"]],
      body: ordenes.map((orden, i) => [
        i + 1,
        orden.mesaId?.mesa || "N/A",
        orden.productos.map((p) => p.nombre).join(", "),
        orden.comentario || "Sin comentario",
        orden.fecha ? new Date(orden.fecha).toLocaleString() : "Sin fecha",
      ]),
    });
    doc.save("reporte-ordenes.pdf");
  };

  // 🔄 Si está cargando, muestra spinner
  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-danger" role="status" style={{ width: "4rem", height: "4rem" }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h5 className="mt-3">Cargando datos...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Panel de Administración</h2>
          <button className="btn btn-danger" onClick={exportPDF}>PDF</button>
        </div>

        <div className="row">
          <div className="col-md-8">
            <h5>Productos por Orden</h5>
            <Bar data={barChartData} />
          </div>
          <div className="col-md-4">
            <h5 className="text-end">Órdenes Totales: <strong>{totalOrdenes}</strong></h5>
            <Pie data={pieChartData} />
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Mesa</th>
                <th>Productos</th>
                <th>Comentario</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{orden.mesaId?.mesa || "Sin Mesa"}</td>
                  <td>{orden.productos?.map((p) => p.nombre).join(", ")}</td>
                  <td>{orden.comentario || "Sin comentario"}</td>
                  <td>{orden.fecha ? new Date(orden.fecha).toLocaleString() : "Sin fecha"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
