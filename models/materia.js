module.exports = (sequelize, DataTypes) => {
    const Materia = sequelize.define("Materia", {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Materia.associate = (models) => {
      Materia.hasMany(models.Professor, {
        foreignKey: "materiaId",
        as: "professors",
      });
    };
    
    return Materia;
  };
  