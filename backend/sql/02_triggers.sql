CREATE OR REPLACE FUNCTION fn_auto_group()
RETURNS trigger AS $$
DECLARE
    existing_group_id INT;
    count_assignments INT;
    group_name TEXT;
BEGIN
    -- Bloquea la tabla grupo para evitar race conditions al crear grupos
    LOCK TABLE grupo IN SHARE ROW EXCLUSIVE MODE;

    -- Buscar si ya existe un grupo para esta línea y disponibilidad
    SELECT g.id INTO existing_group_id
    FROM grupo g
    WHERE g.linea_id = NEW.linea_id
      AND g.disponibilidad_id = NEW.disponibilidad_id
    ORDER BY g.created_at DESC
    LIMIT 1;

    -- Si ya hay grupo, solo añadir el nuevo investigador al grupo (sin duplicados)
    IF existing_group_id IS NOT NULL THEN
        INSERT INTO grupo_miembro (grupo_id, investigador_id)
        VALUES (existing_group_id, NEW.investigador_id)
        ON CONFLICT DO NOTHING;
        RETURN NEW;
    END IF;

    -- Contar cuántas asignaciones hay para esta combinación (línea+disponibilidad)
    SELECT COUNT(*) INTO count_assignments
    FROM investigador_linea_disponibilidad
    WHERE linea_id = NEW.linea_id
      AND disponibilidad_id = NEW.disponibilidad_id;

    -- Si hay 3 o más asignaciones, crear grupo y agregar miembros
    IF count_assignments >= 3 THEN
        -- Generar un nombre único para el grupo con timestamp
        group_name := 'Grupo_L' || NEW.linea_id || '_D' || NEW.disponibilidad_id
                      || '_' || to_char(NOW(), 'YYYYMMDDHH24MI');

        -- Crear el grupo y capturar su id
        INSERT INTO grupo (linea_id, disponibilidad_id, nombre)
        VALUES (NEW.linea_id, NEW.disponibilidad_id, group_name)
        RETURNING id INTO existing_group_id;

        -- Insertar todos los investigadores asignados a ese grupo
        INSERT INTO grupo_miembro (grupo_id, investigador_id)
        SELECT existing_group_id, investigador_id
        FROM investigador_linea_disponibilidad
        WHERE linea_id = NEW.linea_id
          AND disponibilidad_id = NEW.disponibilidad_id
        ON CONFLICT DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS trg_auto_group ON investigador_linea_disponibilidad;

CREATE TRIGGER trg_auto_group
AFTER INSERT ON investigador_linea_disponibilidad
FOR EACH ROW
EXECUTE FUNCTION fn_auto_group();
