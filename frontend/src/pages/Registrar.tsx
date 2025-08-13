import { useState, useEffect } from 'react';
import { get, post } from '../api';
import InvestigadorForm from '../components/InvestigadorForm';
import LineaForm from '../components/LineaForm';
import DisponibilidadForm from '../components/DisponibilidadForm';


type Linea = {
  id: number;
  nombre: string;
  area?: string;
};

type Disponibilidad = {
  id: number;
  franja_horaria?: string;
  modalidad?: string;
};

type InvestigadorData = {
  nombre: string;
  apellido: string;
  departamento: string;
  experiencia: number;
};

type LineaData = {
  nombre: string;
  area: string;
};

type DisponibilidadData = {
  franja_horaria: string;
  modalidad: string;
};

export default function Registrar() {
  const [step, setStep] = useState<number>(1);
  const [investigadorId, setInvestigadorId] = useState<number | null>(null);
  const [lineaId, setLineaId] = useState<number | null>(null);
  const [disponibilidadId, setDisponibilidadId] = useState<number | null>(null);
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [lineasData, dispData] = await Promise.all([get('lineas'), get('disponibilidades')]);
        setLineas(lineasData);
        setDisponibilidades(dispData);
      } catch {
        setError('Error cargando líneas o disponibilidades');
      }
    }
    fetchData();
  }, []);

  // 1) Crear Investigador
  async function handleCrearInvestigador(data: InvestigadorData) {
    try {
      const res = await post('investigadores', data);
      setInvestigadorId(res.id);
      setStep(2);
      setError(null);
      setMensaje(`Investigador creado: ID ${res.id}`);
    } catch (e: any) {
      setError(e.message || 'Error desconocido');
      setMensaje(null);
    }
  }

  // Seleccionar línea existente
  function handleSeleccionarLinea(id: number) {
    setLineaId(id);
    setStep(3);
  }

  // Crear línea nueva
  async function handleCrearLinea(data: LineaData) {
    try {
      const res = await post('lineas', data);
      setLineaId(res.id);
      setStep(3);
      setError(null);
      setMensaje(`Línea creada: ID ${res.id}`);
      // Refrescar líneas
      const lineasData = await get('lineas');
      setLineas(lineasData);
    } catch (e: any) {
      setError(e.message || 'Error desconocido');
      setMensaje(null);
    }
  }

  // Crear disponibilidad y asignar
  async function handleCrearDisponibilidad(data: DisponibilidadData) {
    try {
      const dispRes = await post('disponibilidades', data);
      setDisponibilidadId(dispRes.id);

      await post('asignaciones', {
        investigador_id: investigadorId,
        linea_id: lineaId,
        disponibilidad_id: dispRes.id,
      });

      setError(null);
      setMensaje('Registro completo: investigador, línea, disponibilidad y asignación creados.');

      // Resetear para nuevo registro
      setStep(1);
      setInvestigadorId(null);
      setLineaId(null);
      setDisponibilidadId(null);
    } catch (e: any) {
      setError(e.message || 'Error desconocido');
      setMensaje(null);
    }
  }

  return (
    <div>
      <h2>Registrar Investigador, Línea y Disponibilidad</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

      {step === 1 && <InvestigadorForm onSubmit={handleCrearInvestigador} />}

      {step === 2 && (
        <>
          <h3>Seleccionar línea existente</h3>
          <ul>
            {lineas.map(l => (
              <li key={l.id}>
                {l.nombre} - {l.area ?? ''}
                {' '}
                <button onClick={() => handleSeleccionarLinea(l.id)}>Seleccionar</button>
              </li>
            ))}
          </ul>
          <hr />
          <h3>O crear nueva línea</h3>
          <LineaForm onSubmit={handleCrearLinea} />
        </>
      )}

      {step === 3 && <DisponibilidadForm onSubmit={handleCrearDisponibilidad} />}
    </div>
  );
}
