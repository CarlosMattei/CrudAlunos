const express = require("express");
const router = express.Router();
const { Professor, Materia } = require("../models"); // Ajuste o caminho conforme necessário

// Mostrar todos os pluno
router.get("/",  async (req, res) => {
  try {
    const professors = await Professor.findAll({
      include: [{ model: Materia, as: "Materia" }],
    });
    
    res.render("base", {
      title: "Professor",
      view: "professors/show",
      professors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar Professor");
  }
});

// Formulário para adicionar um novo produto
router.get("/add",  async (req, res) => {
  try {
    const materias = await Materia.findAll();
    res.render("base", {
      title: "Add Professor",
      view: "professors/add",
      materias,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar materias");
  }
});

// Adicionar um novo produto
router.post("/add", async (req, res) => {
  try {
    const { nome, materiaId } = req.body;
    const materia = await Materia.findByPk(materiaId);
    if (!materia) {
      return res.status(400).send("materia não encontrado");
    }
    await Professor.create({
      nome,
      materiaId,
    });
    res.redirect("/professors");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar Professor");
  }
});

// Formulário para editar um produto
router.get("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const Professor = await Professor.findByPk(id, {
      include: [{ model: materia, as: "materia" }],
    });
    const materias = await materia.findAll();
    if (Professor) {
      res.render("base", {
        title: "Edit materia",
        view: "professors/edit",
        Professor,
        materias,
      });
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar produto");
  }
});

// Atualizar um produto
router.post("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, materiaId } = req.body;
    const Professor = await Professor.findByPk(id);
    if (Professor) {
      await Professor.update({ nome, materiaId });
      res.redirect("/Professors");
    } else {
      res.status(404).send("Professor não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o Professor");
  }
});

// Deletar um produto
router.post("/delete/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const Professor = await Professor.findByPk(id);
    if (Professor) {
      await Professor.destroy();
      res.redirect("/Professors");
    } else {
      res.status(404).send("Professor não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir Professor");
  }
});

module.exports = router;
