module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define("Professor", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    }, {
        tableName: 'professor',
        freezeTableName: true
    });

    Professor.associate = (models) => {
        Professor.hasMany(models.materia, {
          foreignKey: "id",
          as: "materia",
        });
      };

    return Professor;
}