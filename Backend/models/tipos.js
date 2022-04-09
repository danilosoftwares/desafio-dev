const { Model, DataTypes } = require("sequelize");
const Sequelize = require("../config/database");

class Tipos extends Model {}

Tipos.init({
  tipo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true    
  },
  descricao: {
    type: DataTypes.STRING,
  },
  natureza: {
    type: DataTypes.ENUM("Entrada","Saida"),
    defaultValue: "Entrada",
  },  
  sinal: {
    type: DataTypes.ENUM("+","-"),
    defaultValue: "+",
  },   
}, {
  sequelize: Sequelize, modelName: "tipos"
})

module.exports = Tipos;