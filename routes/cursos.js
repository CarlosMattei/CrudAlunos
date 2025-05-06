const express = require("express");
const router = express.Router();
const { Curso } = require("../models");


// Listar cursos
router.get("/",  async (req, res) => {
  const cursos = await Curso.findAll();
  res.render("base", {
    title: "Cursos",
    view: "cursos/show",
    cursos,
  });
});

// Formulário para adicionar curso
router.get("/add",  (req, res) => {
  res.render("base", {
    title: "Add Curso",
    view: "cursos/add",
  });
});

// Adicionar novo curso
router.post("/add", async (req, res) => {
  try {
    // Log para depuração
    console.log("Corpo da requisição:", req.body);

    // Capturar nome e periodo com valores padrão para evitar undefined
    const nome = req.body.nome ? String(req.body.nome) : "";
    const periodo = req.body.periodo ? String(req.body.periodo) : "";

    // Validar campos obrigatórios
    if (!nome || !periodo) {
      return res.status(400).render("base", {
        title: "Add Curso",
        view: "cursos/add",
        error: "Nome e período são obrigatórios",
      });
    }
    if (nome.trim() === "" || periodo.trim() === "") {
      return res.status(400).render("base", {
        title: "Add Curso",
        view: "cursos/add",
        error: "Nome e período devem ser textos não vazios",
      });
    }

    await Curso.create({
      nome: nome.trim(),
      periodo: periodo.trim(),
    });
    res.redirect("/cursos");
  } catch (error) {
    console.error(error);
    res.status(400).render("base", {
      title: "Add Curso",
      view: "cursos/add",
      error: error.message,
    });
  }
});

// Formulário para editar curso
router.get("/edit/:id",  async (req, res) => {
  const curso = await Curso.findByPk(req.params.id);
  res.render("base", {
    title: "Editar Curso",
    view: "cursos/edit",
    curso,
  });
});

// Atualizar curso
router.post("/edit/:id",  async (req, res) => {
  await Curso.update(
    { nome: req.body.nome, periodo: req.body.periodo  },
    {
      where: { id: req.params.id },
    }
  );
  res.redirect("/cursos");
});

// Deletar curso
router.post("/delete/:id",  async (req, res) => {
  await Curso.destroy({ where: { id: req.params.id } });
  res.redirect("/cursos");
});

module.exports = router;
