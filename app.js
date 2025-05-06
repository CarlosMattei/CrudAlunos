const express = require("express");
const path = require("path");
const app = express();
const db = require("./models");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configuração do EJS como view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Rota principal
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
// Rotas para alunos e professores
const alunosRouter = require("./routes/alunos");
const professorRouter = require("./routes/professor");
const materiasRouter = require("./routes/materias");
const cursosRouter = require("./routes/cursos");
const sobreRouter = require("./routes/sobre");
app.use("/alunos", alunosRouter);
app.use("/professor", professorRouter);
app.use("/cursos", cursosRouter);
app.use("/materias", materiasRouter);
app.use("/sobre", sobreRouter);
// Iniciar o servidor e sincronizar com o banco de dados
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
  });
});
