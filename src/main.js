require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const { initializeClient } = require('./whatsapp');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  console.error('❌ Erro interno:', err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor iniciado na porta ${port}`);
  initializeClient();
});
