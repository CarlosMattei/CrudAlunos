const express = require("express");
const router = express.Router();
const { Materia } = require("../models");


// Listar Materias
router.get("/",  async (req, res) => {
  const materias = await Materia.findAll();
  res.render("base", {
    title: "Materias",
    view: "materias/show",
    materias,
  });
});

// Formulário para adicionar Materia
router.get("/add",  (req, res) => {
  res.render("base", {
    title: "Add Materia",
    view: "materias/add",
  });
});

// Adicionar novo Materia
router.post("/add", async (req, res) => {
  try {
    // Log para depuração
    console.log("Corpo da requisição:", req.body);

    // Capturar nome e area com valores padrão para evitar undefined
    const nome = req.body.nome ? String(req.body.nome) : "";
    const area = req.body.area ? String(req.body.area) : "";

    // Validar campos obrigatórios
    if (!nome || !area) {
      return res.status(400).render("base", {
        title: "Add Materia",
        view: "materias/add",
        error: "Nome e período são obrigatórios",
      });
    }
    if (nome.trim() === "" || area.trim() === "") {
      return res.status(400).render("base", {
        title: "Add Materia",
        view: "materias/add",
        error: "Nome e período devem ser textos não vazios",
      });
    }

    await Materia.create({
      nome: nome.trim(),
      area: area.trim(),
    });
    res.redirect("/materias");
  } catch (error) {
    console.error(error);
    res.status(400).render("base", {
      title: "Add Materia",
      view: "materias/add",
      error: error.message,
    });
  }
});

// Formulário para editar Materia
router.get("/edit/:id",  async (req, res) => {
  const materia = await Materia.findByPk(req.params.id);
  res.render("base", {
    title: "Editar Materia",
    view: "materias/edit",
    materia,
  });
});

// Atualizar Materia
router.post("/edit/:id",  async (req, res) => {
  await Materia.update(
    { nome: req.body.nome, area: req.body.area  },
    {
      where: { id: req.params.id },
    }
  );
  res.redirect("/materias");
});

// Deletar Materia
router.post("/delete/:id",  async (req, res) => {
  await Materia.destroy({ where: { id: req.params.id } });
  res.redirect("/materias");
});

module.exports = router;
