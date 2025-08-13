import { Routes, Route, Link } from 'react-router-dom';
import Registrar from './pages/Registrar.jsx';
import Grupos from './pages/Grupos.jsx';
import './App.css';

function App() {
  return (
    <>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: 15, textDecoration: 'none', color: '#333' }}>
          Inicio
        </Link>
        <Link to="/registrar" style={{ marginRight: 15, textDecoration: 'none', color: '#333' }}>
          Registrar
        </Link>
        <Link to="/grupos" style={{ textDecoration: 'none', color: '#333' }}>
          Grupos
        </Link>
      </nav>

      <main style={{ padding: '0 20px' }}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Bienvenido al proyecto de Investigación Colaborativa</h1>
                <p>Usa el menú para registrar investigadores o ver grupos.</p>
              </div>
            }
          />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/grupos" element={<Grupos />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
