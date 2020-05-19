const router = require("express").Router();
const mongoose = require("mongoose");
const authMiddleware = require("../middlewares/auth");

const User = mongoose.model("User");

router.post("/register", async (req, res) => {
  const { email, username } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Usuário já existe." });
    }

    const user = await User.create(req.body);

    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: "Falha ao registrar usuário." });
  }
});

router.post("/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    return res.json({
      user,
      token: user.generateToken()
    });
  } catch (err) {
    return res.status(400).json({ error: "Falha ao tentar autenticar o usuário." });
  }
});

router.use(authMiddleware);

router.get("/me", async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);

    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: "Não conseguimos encontrar dados do usuário" });
  }
});

module.exports = router;