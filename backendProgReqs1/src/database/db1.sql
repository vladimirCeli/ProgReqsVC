--CREATE TYPE type_category AS ENUM ('Gobernancia', 'Diseño', 'Implementación', 'Verificación', 'Operaciones');

-- Tabla para categorías
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT,
    benefit TEXT,
    activity TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--CREATE TYPE type_subsection AS ENUM ('Estrategia y métricas', 'Política y cumplimiento', 'Educación y Orientación', 'Evaluación de la amenaza', 'Seguridad de Requisitos', 'Arquitectura de seguridad', 'Construcción segura','Despliegue seguro','Gestión de defectos','Evaluación de Arquitectura','Requisitos basados en pruebas','Pruebas de seguridad','Administracion de incidentes','Gestión del entorno','Gestión operativa');
-- Tabla para subsecciones
CREATE TABLE subsections (
    id SERIAL PRIMARY KEY,
    name TEXT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--CREATE TYPE type_question AS ENUM ('¿Comprendes la apetencia al riesgo a nivel empresarial para tus aplicaciones?','');
-- Tabla para preguntas
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT,
    subsection_id INT,
    FOREIGN KEY (subsection_id) REFERENCES subsections(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para respuestas con el tipo enum
--CREATE TYPE answer_enum AS ENUM ('No', 'Sí, cubre riesgos generales.', 'Sí, cubre riesgos específicos de la organización.', 'Sí, cubre riesgos y oportunidades.');

CREATE TABLE maturity_level (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    name TEXT, -- Utiliza el tipo enum definido
    question_id INT,
    maturity_level_id INT,
	FOREIGN KEY (maturity_level_id) REFERENCES maturity_level(id),
    FOREIGN KEY (question_id) REFERENCES questions(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para criterios de calidad
CREATE TABLE quality_criteria (
    id SERIAL PRIMARY KEY,
    name TEXT,
	subsection_id INT,
    FOREIGN KEY (subsection_id) REFERENCES subsections(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    username TEXT,
    password TEXT,
    rol_id INTEGER REFERENCES rol(id) DEFAULT 2, -- Valor predeterminado 2 (Cliente)
    confirmation_token TEXT,   -- Nuevo campo para el token de confirmación
    confirmed BOOLEAN DEFAULT FALSE, -- Nuevo campo para el estado de confirmación
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabla para selecciones de usuarios
CREATE TABLE user_selections (
    user_id INT,
    question_id INT,
    answer_id INT,
    criteria_id INT,
    FOREIGN KEY (user_id) REFERENCES persons(id), -- Si tienes una tabla de usuarios
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (answer_id) REFERENCES answers(id),
    FOREIGN KEY (criteria_id) REFERENCES quality_criteria(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE level_requirements (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categories_id INTEGER REFERENCES categories(id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE requirements (
    id SERIAL PRIMARY KEY,
    ident_requirement_id TEXT NOT NULL,
    name TEXT,
    characteristicsr TEXT,
    description TEXT,
    req_no_funtional TEXT,
    priority_req TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_id INTEGER REFERENCES projects(id),
    level_requirements_id INTEGER REFERENCES level_requirements(id)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categories_id INTEGER REFERENCES categories(id)
);
