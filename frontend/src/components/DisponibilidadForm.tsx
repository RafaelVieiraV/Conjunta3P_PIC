import { useState } from 'react';

export default function DisponibilidadForm({ onSubmit }) {
  const [franjaHoraria, setFranjaHoraria] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!franjaHoraria.trim() || !modalidad.trim()) {
      setError('Franja horaria y modalidad son obligatorios');
      return;
    }
    setError(null);
    onSubmit({ franja_horaria: franjaHoraria, modalidad });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nueva Disponibilidad</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Franja horaria:</label><br />
        <input
          type="text"
          value={franjaHoraria}
          onChange={e => setFranjaHoraria(e.target.value)}
          placeholder="Ej: Lunes 14:00-16:00"
        />
      </div>
      <div>
        <label>Modalidad:</label><br />
        <select value={modalidad} onChange={e => setModalidad(e.target.value)}>
          <option value="">Seleccione modalidad</option>
          <option value="Presencial">Presencial</option>
          <option value="Virtual">Virtual</option>
        </select>
      </div>
      <button type="submit">Guardar Disponibilidad</button>
    </form>
  );
}
