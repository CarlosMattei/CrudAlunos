const express = require("express");
const router = express.Router();
const { Materia } = require("../models");


// Listar materias
router.get("/",  async (req, res) => {
  const materias = await Materia.findAll();
  res.render("base", {
    title: "Matérias",
    view: "materias/show",
    materias,
  });
});

// Formulário para adicionar materias
router.get("/add",  (req, res) => {
  res.render("base", {
    title: "Add Materias",
    view: "materias/add",
  });
});

// Adicionar nova materia
router.post("/add",  async (req, res) => {
  await Materia.create({ nome: req.body.nome });
  res.redirect("/materias");
});

// Formulário para editar materias
router.get("/edit/:id",  async (req, res) => {
  const materias = await Materia.findByPk(req.params.id);
  res.render("base", {
    title: "Editar Materias",
    view: "materias/edit",
    materias,
  });
});

// Atualizar materia
router.post("/edit/:id",  async (req, res) => {
  await Materia.update(
    { nome: req.body.nome },
    {
      where: { id: req.params.id },
    }
  );
  res.redirect("/materia");
});

// Deletar materia
router.post("/delete/:id",  async (req, res) => {
    await Materia.destroy({ where: { id: req.params.id } });
    res.redirect("/materias");
  });

  module.exports = router;