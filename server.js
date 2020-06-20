const app = require("express")();
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const cors = require('cors');

// Conecta no MongoDB
// mongoose.connect(
//   "url"
// );

// Carrega o model de Usuário
require("./models/user");

app.use(bodyParser.json());
app.use(cors({origin: '*'}))
// Inicia as rotas da API
app.use("/api", require("./controllers/user"));

app.listen(3000);