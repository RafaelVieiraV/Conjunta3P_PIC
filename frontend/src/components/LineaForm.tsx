import { useState } from 'react';

export default function LineaForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [area, setArea] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!nombre.trim() || !area.trim()) {
      setError('Nombre y área son obligatorios');
      return;
    }
    setError(null);
    onSubmit({ nombre, area });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nueva Línea de Investigación</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Nombre:</label><br />
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Ej: Inteligencia Artificial"
        />
      </div>
      <div>
        <label>Área:</label><br />
        <input
          type="text"
          value={area}
          onChange={e => setArea(e.target.value)}
          placeholder="Ej: Computación"
        />
      </div>
      <button type="submit">Guardar Línea</button>
    </form>
  );
}
