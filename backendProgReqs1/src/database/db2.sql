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
    rol_id INTEGER REFERENCES rol(id) DEFAULT 2,
    confirmation_token TEXT,
    confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT,
    benefit TEXT,
    activity TEXT,
    user_id INTEGER REFERENCES persons(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maturity_level (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subsections (
    id SERIAL PRIMARY KEY,
    name TEXT,
    category_id INTEGER REFERENCES categories(id),
    maturity_level_id INTEGER REFERENCES maturity_level(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT,
    subsection_id INTEGER REFERENCES subsections(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    question_id INTEGER REFERENCES questions(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quality_criteria (
    id SERIAL PRIMARY KEY,
    name TEXT,
	subsection_id INTEGER REFERENCES subsections(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_selections (
    categories_id INTEGER REFERENCES categories(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE level_requirements (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
);

CREATE TABLE requirements_security (
    id SERIAL PRIMARY KEY,
    numeration TEXT,
    level_requirements_id INTEGER REFERENCES level_requirements(id),
    requerements_id INTEGER REFERENCES requirements(id),
    description TEXT,
    CWE TEXT,
    NIST TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tasks_id INTEGER UNIQUE REFERENCES tasks(id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    user_id INTEGER REFERENCES persons(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description TEXT,
    progress INT,
    CONSTRAINT progress_check CHECK (progress >= 0 AND progress <= 100),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categories_id INTEGER REFERENCES categories(id)
);
