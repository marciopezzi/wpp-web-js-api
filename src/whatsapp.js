const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

let connectionStatus = 'disconnected';

client.on('qr', (qr) => {
  console.log('📱 Escaneie o QR code abaixo para autenticar:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  connectionStatus = 'connected';
  console.log('✅ WhatsApp conectado!');
});

client.on('authenticated', () => {
  console.log('🔓 Sessão autenticada.');
});

client.on('auth_failure', (message) => {
  connectionStatus = 'disconnected';
  console.error(`❌ Falha na autenticação: ${message}`);
});

client.on('disconnected', (reason) => {
  connectionStatus = 'disconnected';
  console.log(`⚠️ WhatsApp desconectado: ${reason}`);
});

client.on('message', (message) => {
  const from = message.from || 'desconhecido';
  const preview = message.body || '';
  console.log(`📨 Mensagem recebida de ${from}: ${preview}`);
});

const initializeClient = async () => {
  try {
    connectionStatus = 'connecting';
    await client.initialize();
  } catch (error) {
    connectionStatus = 'disconnected';
    console.error('❌ Falha ao inicializar o cliente WhatsApp:', error);
  }
};

const getStatus = () => connectionStatus;

const sendMessage = async (number, text) => {
  if (connectionStatus !== 'connected') {
    throw new Error('Cliente WhatsApp não está conectado.');
  }

  if (!number || !text) {
    throw new Error('Número e mensagem são obrigatórios.');
  }

  const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
  const sentMessage = await client.sendMessage(chatId, text);
  console.log(`📤 Mensagem enviada para ${number}`);
  return sentMessage;
};

module.exports = {
  client,
  initializeClient,
  getStatus,
  sendMessage
};
