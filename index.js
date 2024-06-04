const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions = {
    origin: ['http://localhost:5000'],
    methods: "GET,PUT,POST,DELETE",
}
app.use(cors(corsOptions))

//Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Logbook
app.use(require('./middlewares/logbook.middleware'))

//Routes
app.use("/api/musicgenre", require('./routes/musicgenre.routes'))
app.use("/api/song", require('./routes/song.routes'))
app.use("/api/user", require('./routes/user.routes'))
app.use("/api/role", require('./routes/role.routes'))
app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/file", require('./routes/file.routes'))
app.use("/api/logbook", require('./routes/logbook.routes'))
app.get('*', (req, res) => { res.status(404).send()})

const errorlogger = require('./middlewares/errorlogger.middleware')
const errorhandler = require('./middlewares/errorhandler.middleware')
app.use(errorlogger, errorhandler);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`)
    console.log(`http://localhost:${process.env.SERVER_PORT}`)
})
