const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("networktoughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado ao banco de dados ");
} catch (err) {
  console.log(err);
}

module.exports = sequelize;
