const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

dotenv.config({ path: './.env' });

//middlewares
app.use(express.json());
app.use(cors());

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User CRUD API',
      version: '1.0.0',
      description: 'A simple CRUD API for User management',
    },
    servers: [
      {
        url: 'http://localhost:9000',
        description: 'Local Server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes
const routes = require('./routes');
const User = require('./db/model/userSchema');
app.use(routes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'No Route Found For This Path' });
});

app.listen(9000, () => {
  console.log(`✅ Server running on http://localhost:9000`);
  console.log(`📄 Swagger Docs available at http://localhost:9000/api-docs`);
});
