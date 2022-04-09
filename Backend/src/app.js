const express = require("express");
const path = require("path");
const cors = require('cors');
const multer  = require('multer');  
const bodyParser = require("body-parser");
const sequelize = require("../config/database");
const Cnab = require("../models/cnab");
const NormalizeCnab = require("./NormalizeCnab");

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

app.post("/api/cnab/upload", upload.fields([{ name: 'arquivos'},]) ,async (req, res)=>{  
  try{  
    await Cnab.destroy({
      where: {},
      truncate: true
    });
    for (const key in req.files.arquivos) {
      const fileContent = req.files.arquivos[key].buffer.toString();
      const normaliza = new NormalizeCnab(fileContent);
      const itens = normaliza.get();
      await Cnab.bulkCreate(itens);
    }    
    res.send({status:true, result:"arquivos importados com sucesso!"});
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }  
});

app.get("/api/cnab", async (req, res)=>{
  try{
    const tab = await sequelize.query(
      `      
      select *
      FROM (
      SELECT 1 nivel, cnab.cnabs.loja, cnab.cnabs.dono, cnab.cnabs.cpf, cnab.cnabs.cartao, cnab.cnabs.data, cnab.cnabs.hora,  cnab.tipos.natureza, cnab.tipos.descricao ,
      cnab.cnabs.valor
      FROM cnab.cnabs 
      JOIN cnab.tipos 
      ON tipos.tipo = cnabs.tipo 
      union ALL 
      SELECT DISTINCT  2 nivel, cb2.loja, null, null, null, null, null,  null, null ,
      (
      select case when sum(cnab.cnabs.valor) is null then  0 else sum(cnab.cnabs.valor) end
      FROM cnab.cnabs 
      JOIN cnab.tipos 
      ON tipos.tipo = cnabs.tipo
      and cnab.cnabs.loja = cb2.loja
      and tipos.sinal = '+'
      ) -
      (
      select case when sum(cnab.cnabs.valor) is null then  0 else sum(cnab.cnabs.valor) end
      FROM cnab.cnabs 
      JOIN cnab.tipos 
      ON tipos.tipo = cnabs.tipo
      and cnab.cnabs.loja = cb2.loja
      and tipos.sinal = '-'
      )
      FROM cnab.cnabs as cb2
      JOIN cnab.tipos 
      ON tipos.tipo = cb2.tipo 
      ) tb
      order by tb.loja, tb.nivel

      `
    );
    res.send({status:true, result: tab[0]})
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }
});


app.listen(4000,()=> {
  console.log("server active on port 4000");
})