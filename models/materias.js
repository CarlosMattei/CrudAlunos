module.exports = (sequelize, DataTypes) => {
    const Materia = sequelize.define("Materia", {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    Produto.associate = (models) => {
      // O alias deve ser 'Categoria' para corresponder ao alias na consulta
      Produto.belongsTo(models.Materia, {
        foreignKey: "materiaId",
        as: "Materia", // Use o alias consistente com as consultas
      });
    };
  
    return Materia;
  };
  