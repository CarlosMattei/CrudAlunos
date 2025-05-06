module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define('Professor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Professor.associate = (models) => {
        Professor.belongsTo(models.Materia, {
            foreignKey: "materiaId",
            as: "Materia",
        });
    };

    return Professor;
};