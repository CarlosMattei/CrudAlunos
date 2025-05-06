module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define('Aluno', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Aluno.associate = (models) => {
        Aluno.belongsTo(models.Curso, {  // Changed from models.cursos to models.Curso
            foreignKey: "cursoId",     // Changed from cursoId to alunoId
            as: "Curso",              // Changed from curso to cursos (plural makes more sense for hasMany)
        });
    };

    return Aluno;
};