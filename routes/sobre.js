const express = require("express");
const router = express.Router();

// Rota para a página inicial
router.get("/", async (req, res) => {
  res.render(
      "base",{
          title: "Sobre",
          view: "sobre/sobre",
      });
});


module.exports = router;
