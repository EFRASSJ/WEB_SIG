import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Components/screens/Sidebar';
import Login from './Components/screens/Login';
import Home from './Components/screens/Home';
import Meseros from './Components/screens/Meseros';
import Mesas from './Components/screens/Mesas';
import Categorias from './Components/screens/Categorias';
import Productos from './Components/screens/Menu';
import Reseñas from './Components/screens/Reseñas';
import ReseñasScreen from "./Components/screens/Reseñas";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation(); // Obtén la ruta actual

  // Condiciona la visualización del Sidebar
  const showSidebar = location.pathname !== '/';

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content */}
      <div style={{ marginLeft: showSidebar ? '250px' : '0', width: '100%' }}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/meseros" element={<Meseros />} />
            <Route path="/mesas" element={<Mesas />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/resenas" element={<ReseñasScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;