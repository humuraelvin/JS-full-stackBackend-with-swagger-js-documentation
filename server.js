const express = require('express');
const cors = require('cors');
const dbconnection = require('./utils/dbconn');
require('dotenv').config();
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
const router = require('./routes/routes');
const options = require('./documentation/swagger-doc')
const cookieParser = require('cookie-parser');
const debug=require('debug')('app:debug')

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.use('/', router);

dbconnection();

const port = process.env.PORT;

const spacs = swaggerjsdoc(options);

app.use(
    '/api-docs',
    swaggerui.serve,
    swaggerui.setup(spacs)
)

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
})