-- Tabla para roles
CREATE TABLE IF NOT EXISTS rol (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO rol (id, name) VALUES (1,'Administrador');

-- Insertar el rol para Usuario
INSERT INTO rol (id, name) VALUES (2, 'Usuario');

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

CREATE TABLE IF NOT EXISTS categories_requirements (
    id SERIAL PRIMARY KEY,
    name TEXT,
    person_id INTEGER REFERENCES persons(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para subcategorias de requisitos creados por el Administrador
CREATE TABLE IF NOT EXISTS subcategories_requirements (
    id SERIAL PRIMARY KEY,
    name TEXT,
    categories_requirements_id INTEGER REFERENCES categories_requirements(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para requisitos de seguridad creados por el Administrador
CREATE TABLE IF NOT EXISTS requirements_security (
    id SERIAL PRIMARY KEY,
    numeration TEXT,
    level_requirements INTEGER[], -- Definición de un array de enteros
    description TEXT,
    CWE TEXT,
    NIST TEXT,
    subcategories_requirements_id INTEGER REFERENCES subcategories_requirements(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para proyectos creados por el Usuario
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    person_id INTEGER REFERENCES persons(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para requisitos ingresados por el Usuario en proyectos
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

--Tabla intermedia para los requisitos y requisitos de seguridad
CREATE TABLE IF NOT EXISTS requirements_requirements_security (
    id SERIAL PRIMARY KEY,
    requirements_id INTEGER REFERENCES requirements(id),
    requirements_security_id INTEGER REFERENCES requirements_security(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);