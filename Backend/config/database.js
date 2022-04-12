const mysql = require('mysql2');
const { Sequelize } = require("sequelize");

let adressDb = require('./adress.json');

const host = adressDb.host;
const port = adressDb.port;
const user = adressDb.user;
const password = adressDb.password;
const database = adressDb.database;

const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
  host,
  port
});

const connection = mysql.createConnection({ host, port, user, password });

// Run create database statement
connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`,() => {
  sequelize.sync().then(()=> { 
    console.log("database created");

    const Tipos = require("../models/tipos");
    Tipos.bulkCreate([
      {tipo:1,descricao:"Débito",natureza:"Entrada",sinal:"+"},
      {tipo:2,descricao:"Boleto",natureza:"Saída",sinal:"-"},
      {tipo:3,descricao:"Financiamento",natureza:"Saída",sinal:"-"},
      {tipo:4,descricao:"Crédito",natureza:"Entrada",sinal:"+"},
      {tipo:5,descricao:"Recebimento Empréstimo",natureza:"Entrada",sinal:"+"},
      {tipo:6,descricao:"Vendas",natureza:"Entrada",sinal:"+"},
      {tipo:7,descricao:"Recebimento TED",natureza:"Entrada",sinal:"+"},
      {tipo:8,descricao:"Recebimento DOC",natureza:"Entrada",sinal:"+"},
      {tipo:9,descricao:"Aluguel",natureza:"Saída",sinal:"-"},
    ],{
      updateOnDuplicate: ["tipo"] 
    })
  });
});

// Close the connection
connection.end();

module.exports = sequelize;
