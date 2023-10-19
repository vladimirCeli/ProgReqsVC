const express = require('express')
const compression = require("compression");
const app = express()
app.use(compression());

const morgan = require('morgan')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const projectsRoutes = require('./routes/projects.routes')
const requirementsRoutes = require('./routes/requirements.routes')
const tasks = require('./routes/tasks.routes')
const person = require('./routes/person.routes')
const { scheduleCleanupTask } = require('./config/Schedule')
//const questionnaire = require('./routes/questionnaire/questionnaire.routes')
const requirementsec = require('./routes/requirementssec.routes')
const refreshTokens = require('./routes/refreshToken.routes')
const auth = require('./routes/auth.routes')
const logout = require('./routes/logout.routes')
const register = require('./routes/register.routes')
const questionnaireRoutes = require('./routes/questionnaire/questionnaire.routes')
const subseccionRoutes = require('./routes/questionnaire/practice.routes')
const questionRoutes = require('./routes/questionnaire/question.routes')
const cookieParser = require("cookie-parser");
const verifyJWT = require('./middleware/verifyJWT')
const sequelize = require('../src/config/db');

require('./model/Rol.model.js')
require('./model/Person.model.js')
require('./model/CategoriesRequirements.model.js')
require('./model/SubcategoriesRequirements.model.js')
require('./model/RequirementsSecurity.model.js')
require('./model/Projects.model.js')
require('./model/Requirements.model.js')
require('./model/RequirementsRequirementsSecurity.model.js')
require('./model/Task.model.js')
const Person = require('./model/Person.model.js')
//app.use(cookieParser());

require('./config/mongodb')

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

scheduleCleanupTask();


app.use(logout)
app.use(auth)
app.use(register)
app.use(refreshTokens)
app.use(projectsRoutes)
app.use(requirementsRoutes)
app.use(tasks)
app.use(questionnaireRoutes)
app.use(require('./routes/categoriesecurity.routes.js'))
app.use(require('./routes/questionnaire/categorie.routes'))
app.use(require('./routes/subcategories.routes'))
app.use(require('./routes/interequirements.routes'))
app.use(subseccionRoutes)
app.use(questionRoutes)
app.use(requirementsec)
app.use(require('./routes/tasks.routes'))
app.use(require('./routes/questionnaire/response.routes'))
app.use(verifyJWT)
app.use(person)

//app.use(questionnaire)



async function main() {
    try {
        await sequelize.authenticate();
        
        // Sincroniza la base de datos y forza la recreación de tablas
        await sequelize.sync({ force: false });
        await Person.update({ refresh_token: null }, { where: {} });
        // Crea roles si no existen
        await sequelize.query(`
            INSERT INTO rol (id, name) VALUES (1, 'Administrador')
            ON CONFLICT (id) DO NOTHING;
        `);
        await sequelize.query(`
            INSERT INTO rol (id, name) VALUES (2, 'Usuario')
            ON CONFLICT (id) DO NOTHING;
        `);
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
main();

app.listen(4000, () => {
    console.log('Server On')
})