const express = require('express');
const router = express.Router();
const { getStatus, sendMessage } = require('./whatsapp');

const authenticate = (req, res, next) => {
  const token = process.env.API_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'API token não configurado.' });
  }

  const authHeader = req.headers.authorization || '';
  const [scheme, providedToken] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !providedToken) {
    return res.status(401).json({ error: 'Credenciais ausentes ou inválidas.' });
  }

  if (providedToken !== token) {
    return res.status(403).json({ error: 'Token inválido.' });
  }

  return next();
};

router.use(authenticate);

router.get('/status', (req, res) => {
  return res.json({ status: getStatus() });
});

router.post('/send', async (req, res) => {
  const { number, message } = req.body || {};

  if (!number || !message) {
    return res.status(400).json({ error: 'Campos "number" e "message" são obrigatórios.' });
  }

  try {
    await sendMessage(number, message);
    return res.json({ success: true, to: number, message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/receive', (req, res) => {
  const { from, message } = req.body || {};
  console.log(`📨 Simulação de recebimento de ${from || 'desconhecido'}: ${message || ''}`);
  return res.status(200).json({ received: true });
});

module.exports = router;
