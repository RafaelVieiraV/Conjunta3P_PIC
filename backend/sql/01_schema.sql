-- =============================
-- Creación de tablas principales
-- =============================

-- Tabla de Investigadores
CREATE TABLE investigador (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    experiencia INTEGER NOT NULL CHECK (experiencia >= 0)
);

-- Tabla de Líneas de investigación
CREATE TABLE linea_investigacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL UNIQUE,
    area VARCHAR(150) NOT NULL
);

-- Tabla de Disponibilidad
CREATE TABLE disponibilidad (
    id SERIAL PRIMARY KEY,
    franja_horaria VARCHAR(100) NOT NULL, -- Ej: "Lunes 14:00-16:00"
    modalidad VARCHAR(20) NOT NULL        -- "Presencial" o "Virtual"
);

-- Tabla intermedia: asignaciones de investigador a línea y disponibilidad
CREATE TABLE investigador_linea_disponibilidad (
    id SERIAL PRIMARY KEY,
    investigador_id INT NOT NULL REFERENCES investigador(id) ON DELETE CASCADE,
    linea_id INT NOT NULL REFERENCES linea_investigacion(id) ON DELETE CASCADE,
    disponibilidad_id INT NOT NULL REFERENCES disponibilidad(id) ON DELETE CASCADE,
    UNIQUE (investigador_id, linea_id, disponibilidad_id)
);

-- Tabla de Grupos
CREATE TABLE grupo (
    id SERIAL PRIMARY KEY,
    linea_id INT NOT NULL REFERENCES linea_investigacion(id) ON DELETE CASCADE,
    disponibilidad_id INT NOT NULL REFERENCES disponibilidad(id) ON DELETE CASCADE,
    nombre VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabla de miembros de un grupo
CREATE TABLE grupo_miembro (
    grupo_id INT NOT NULL REFERENCES grupo(id) ON DELETE CASCADE,
    investigador_id INT NOT NULL REFERENCES investigador(id) ON DELETE CASCADE,
    PRIMARY KEY (grupo_id, investigador_id)
);
