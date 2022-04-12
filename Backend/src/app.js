const express = require("express");
const path = require("path");
const cors = require('cors');
const multer  = require('multer');  
const bodyParser = require("body-parser");
const sequelize = require("../config/database");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { uploadFile } = require("./upload");
const { getSummary } = require("./read");

const app = express();

let upload  = multer({ storage: multer.memoryStorage() });


app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CNAB Express API with Swagger",
      version: "0.1.0",
      description:
        "Esta api foi desenvolvida com intuito de estudo, para envio e listagem de cnab",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "DaniloMS",
        email: "danilo.softwares@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  apis: ["src/app.js"],
};

const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(express.static("public"));
app.use(express.static("public/static"));
app.use(express.static("public/static/assets"));
app.use(express.static("public/static/assets/img"));
app.use(express.static("public/static/assets/img/avatars"));
app.use(express.static("public/static/css"));
app.use(express.static("public/static/js"));
app.use(express.static("public/static/media"));

app.get("/", async (req, res)=>{
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

/**
 * @swagger
 * /cnab/upload:
 *   post:
 *     tags:
 *       - CNAB
 *     description: envio de todos os arquivos cnab
 *     produces:
 *       - multipart/form-data
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *         required: true
 *         content: 
 *             multipart/form-data:
 *                 schema:
 *                    type: object
 *                    properties:
 *                       arquivos:
 *                          type: string
 *                          format: base64
 *     responses:
 *       200:
 *         description: retorna status como true e texto de retorno "arquivos importados com sucesso!"
 */
app.post("/api/cnab/upload", upload.fields([{ name: 'arquivos'},]) , uploadFile );

/**
 * @swagger
 * /cnab:
 *   get:
 *     tags:
 *       - CNAB
 *     description: retorna todos os dados de cnab enviados
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: retorna status como true e todos os dados de cnabs enviados em um array
 */
app.get("/api/cnab", getSummary);


app.listen(4000,()=> {
  console.log("server active on port 4000");
})