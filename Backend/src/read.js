const sequelize = require("../config/database");

module.exports = {
  getSummary : async (req, res)=>{
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
  }
}