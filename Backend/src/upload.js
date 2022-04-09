const Cnab = require("../models/cnab");
const NormalizeCnab = require("./NormalizeCnab");

module.exports = {
  uploadFile : async (req, res) => {  
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
  }
}