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

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
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
    level_requirements_id INTEGER UNIQUE,
    level_requirements_id REFERENCES level_requirements(id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categories_id INTEGER REFERENCES categories(id)
);