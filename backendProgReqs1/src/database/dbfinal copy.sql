-- Tabla para roles
CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar el rol para Administrador
INSERT INTO rol (id, name) VALUES (1, 'Administrador');

-- Insertar el rol para Usuario
INSERT INTO rol (id, name) VALUES (2, 'Usuario');

-- Tabla para personas
CREATE TABLE persons (
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
    refresh_token TEXT,
);

-- Tabla para proyectos
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    person_id INTEGER REFERENCES persons(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación intermedia para personas y proyectos
CREATE TABLE person_project (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES persons(id),
    project_id INTEGER REFERENCES projects(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabla para requisitos de nivel
CREATE TABLE level_requirements (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para requisitos
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
    project_id INTEGER REFERENCES projects(id)
);

-- Tabla para requisitos de seguridad
CREATE TABLE requirements_security (
    id SERIAL PRIMARY KEY,
    numeration TEXT,
    level_requirements_id INTEGER REFERENCES level_requirements(id),
    requerements_id INTEGER REFERENCES requirements(id),
    description TEXT,
    CWE TEXT,
    NIST TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para tareas
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description TEXT,
    progress INT,
    CONSTRAINT progress_check CHECK (progress >= 0 AND progress <= 100),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    requirements_security_id INTEGER UNIQUE REFERENCES requirements_security(id)
);
