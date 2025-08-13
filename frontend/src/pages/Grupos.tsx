import { useEffect, useState } from 'react';
import { get } from '../api.js';

export default function Grupos() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGrupos() {
      try {
        const data = await get('grupos');
        setGrupos(data);
        setLoading(false);
      } catch (e) {
        setError('Error cargando grupos');
        setLoading(false);
      }
    }
    fetchGrupos();
  }, []);

  if (loading) return <p>Cargando grupos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!grupos.length) return <p>No hay grupos disponibles.</p>;

  return (
    <div>
      <h2>Grupos</h2>
      {grupos.map(g => (
        <div
          key={g.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '10px',
            marginBottom: '15px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
          }}
        >
          <h3>{g.nombre}</h3>
          <p>
            <strong>Línea:</strong> {g.linea_nombre}
          </p>
          <p>
            <strong>Disponibilidad:</strong> {g.disponibilidad_franja} ({g.disponibilidad_modalidad})
          </p>
          <p>
            <strong>Miembros:</strong>
          </p>
          <ul>
            {g.miembros.map(m => (
              <li key={m.investigador_id}>
                {m.nombre} {m.apellido}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
