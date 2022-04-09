const { Model, DataTypes } = require("sequelize");
const Sequelize = require("../config/database");
const Tipos = require("./tipos");

class Cnab extends Model {}

Cnab.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  tipo: {
    type: DataTypes.INTEGER,
  },
  data: {
    type: DataTypes.DATEONLY,
  },
  valor: {
    type: DataTypes.DECIMAL(10,2),
  },
  cpf:{
    type: DataTypes.STRING(11),
  },
  cartao:{
    type: DataTypes.STRING(12),
  },
  hora:{
    type: DataTypes.STRING(10),
  },
  dono:{
    type: DataTypes.STRING,
  },
  loja:{
    type: DataTypes.STRING,
  },  
}, {
  sequelize: Sequelize, modelName: "cnab"
})

module.exports = Cnab;