const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Aluno = require("./aluno")(sequelize, DataTypes);
db.Professor = require("./professor")(sequelize, DataTypes);
db.Professor = require("./cursos")(sequelize, DataTypes);
db.Professor = require("./materias")(sequelize, DataTypes);

//loop para criação dos campos no mysql
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;