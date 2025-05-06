const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Aluno = require("./aluno")(sequelize, DataTypes);
db.Professor = require("./professor")(sequelize, DataTypes);
db.Curso = require("./curso")(sequelize, DataTypes);
db.Materia = require("./materia")(sequelize, DataTypes); // Add this line

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;