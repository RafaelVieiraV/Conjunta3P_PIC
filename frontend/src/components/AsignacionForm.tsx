import React from 'react';

type Investigador = { id: number; nombre: string; apellido: string; departamento: string; experiencia: number; };
type Linea = { id: number; nombre: string; area: string; };
type Disponibilidad = { id: number; franja_horaria: string; modalidad: string; };

type AsignacionInput = { investigador_id: number; linea_id: number; disponibilidad_id: number; };

type Props = { onSubmit: (data: AsignacionInput) => void };
import { useState, useEffect } from 'react';
import { get } from '../api';

export default function AsignacionForm({ onSubmit }: Props) {
  const [investigadores, setInvestigadores] = useState<any[]>([]);
  const [lineas, setLineas] = useState<any[]>([]);
  const [disponibilidades, setDisponibilidades] = useState<any[]>([]);

  const [investigadorId, setInvestigadorId] = useState<string>('');
  const [lineaId, setLineaId] = useState<string>('');
  const [disponibilidadId, setDisponibilidadId] = useState<string>('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const invs = await get('investigadores');
        const lns = await get('lineas');
        const disps = await get('disponibilidades');
        setInvestigadores(invs);
        setLineas(lns);
        setDisponibilidades(disps);
      } catch {
        setError('Error cargando datos');
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!investigadorId || !lineaId || !disponibilidadId) {
      setError('Debe seleccionar todos los campos');
      return;
    }
    setError(null);
    onSubmit({ investigador_id: Number(investigadorId), linea_id: Number(lineaId), disponibilidad_id: Number(disponibilidadId) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear Asignación</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Investigador:</label><br />
        <select value={investigadorId} onChange={e => setInvestigadorId(e.target.value)}>
          <option value="">Seleccione investigador</option>
          {investigadores.map(i => (
            <option key={i.id} value={i.id}>
              {i.nombre} {i.apellido}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Línea de investigación:</label><br />
        <select value={lineaId} onChange={e => setLineaId(e.target.value)}>
          <option value="">Seleccione línea</option>
          {lineas.map(l => (
            <option key={l.id} value={l.id}>
              {l.nombre} ({l.area})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Disponibilidad:</label><br />
        <select value={disponibilidadId} onChange={e => setDisponibilidadId(e.target.value)}>
          <option value="">Seleccione disponibilidad</option>
          {disponibilidades.map(d => (
            <option key={d.id} value={d.id}>
              {d.franja_horaria} ({d.modalidad})
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Crear Asignación</button>
    </form>
  );
}
