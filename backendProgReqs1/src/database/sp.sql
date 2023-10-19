-- Tabla para roles
CREATE TABLE IF NOT EXISTS rol (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar el rol para Administrador
INSERT INTO rol (name) VALUES ('Administrador');

-- Insertar el rol para Usuario
INSERT INTO rol (name) VALUES ('Usuario');

-- Tabla para personas
CREATE TABLE IF NOT EXISTS persons (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    username TEXT,
    password TEXT,
    rol_id INTEGER REFERENCES rol(id) DEFAULT 2,
    confirmation_token TEXT,
    confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email, username),
    UNIQUE (confirmation_token),
    refresh_token TEXT
);

-- Tabla para proyectos
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    person_id INTEGER REFERENCES persons(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación intermedia para personas y proyectos
CREATE TABLE IF NOT EXISTS person_project (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES persons(id),
    project_id INTEGER REFERENCES projects(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para requisitos de nivel
CREATE TABLE IF NOT EXISTS level_requirements (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para requisitos
CREATE TABLE IF NOT EXISTS requirements (
    id SERIAL PRIMARY KEY,
    ident_requirement_id TEXT NOT NULL,
    name TEXT,
    characteristicsr TEXT,
    description TEXT,
    req_no_funtional TEXT,
    priority_req TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_id INTEGER REFERENCES projects(id)
);

-- Tabla para requisitos de seguridad
CREATE TABLE IF NOT EXISTS requirements_security (
    id SERIAL PRIMARY KEY,
    numeration TEXT,
    level_requirements_id INTEGER REFERENCES level_requirements(id),
    description TEXT,
    CWE TEXT,
    NIST TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación intermedia para requisitos y requisitos de seguridad
CREATE TABLE IF NOT EXISTS requirement_requirements_security (
    id SERIAL PRIMARY KEY,
    requirement_id INTEGER REFERENCES requirements(id),
    requirements_security_id INTEGER REFERENCES requirements_security(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para tareas
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    description TEXT,
    progress INT,
    CONSTRAINT progress_check CHECK (progress >= 0 AND progress <= 100),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Establecer índices y claves externas necesarios

-- Índice para la relación entre personas y proyectos
CREATE INDEX IF NOT EXISTS idx_person_project ON person_project (person_id, project_id);

-- Índice para la relación entre requisitos y proyectos
CREATE INDEX IF NOT EXISTS idx_requirements_project ON requirements (project_id);

-- Índice para la relación entre requisitos de seguridad y requisitos
CREATE INDEX IF NOT EXISTS idx_req_sec_requirements ON requirement_requirements_security (requirement_id, requirements_security_id);

-- Índice para la relación entre requisitos de seguridad y nivel de requisitos
CREATE INDEX IF NOT EXISTS idx_req_sec_level_requirements ON requirements_security (level_requirements_id);

-- Índice para la relación entre proyectos y personas
CREATE INDEX IF NOT EXISTS idx_project_person ON projects (person_id);

-- Índice para la relación entre tareas y requisitos de seguridad
CREATE INDEX IF NOT EXISTS idx_tasks_req_sec ON tasks (requirements_security_id);
