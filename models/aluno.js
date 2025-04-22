module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define('Aluno', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'aluno',
        freezeTableName: true
    });

    Aluno.associate = (models) => {
        Aluno.hasMany(models.cursos, {
          foreignKey: "alunoId",
          as: "curso",
        });
      };

    return Aluno;
};