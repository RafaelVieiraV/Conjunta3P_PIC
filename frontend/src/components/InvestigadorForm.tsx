import { useState } from 'react';

export default function InvestigadorForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !departamento.trim() || experiencia === '') {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (isNaN(experiencia) || experiencia < 0) {
      setError('Experiencia debe ser un número mayor o igual a 0');
      return;
    }
    setError(null);
    onSubmit({ nombre, apellido, departamento, experiencia: Number(experiencia) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Investigador</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Nombre:</label><br />
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Ej: Ana"
        />
      </div>
      <div>
        <label>Apellido:</label><br />
        <input
          type="text"
          value={apellido}
          onChange={e => setApellido(e.target.value)}
          placeholder="Ej: Martínez"
        />
      </div>
      <div>
        <label>Departamento:</label><br />
        <input
          type="text"
          value={departamento}
          onChange={e => setDepartamento(e.target.value)}
          placeholder="Ej: Biología"
        />
      </div>
      <div>
        <label>Experiencia (años):</label><br />
        <input
          type="number"
          min="0"
          value={experiencia}
          onChange={e => setExperiencia(e.target.value)}
          placeholder="Ej: 10"
        />
      </div>
      <button type="submit">Guardar Investigador</button>
    </form>
  );
}
