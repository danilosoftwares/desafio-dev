const express = require("express");
const path = require("path");
const cors = require('cors');
const multer  = require('multer');  
const bodyParser = require("body-parser");
const sequelize = require("../config/database");
const { uploadFile } = require("./upload");
const { getSummary } = require("./read");

const app = express();

let upload  = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

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

app.post("/api/cnab/upload", upload.fields([{ name: 'arquivos'},]) , uploadFile );
app.get("/api/cnab", getSummary);


app.listen(4000,()=> {
  console.log("server active on port 4000");
})