module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define("Curso", {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      periodo: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    Produto.associate = (models) => {
      // O alias deve ser 'Categoria' para corresponder ao alias na consulta
      Produto.belongsTo(models.Curso, {
        foreignKey: "cursoId",
        as: "Curso", // Use o alias consistente com as consultas
      });
    };
  
    return Curso;
  };
  