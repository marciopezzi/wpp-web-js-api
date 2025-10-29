const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "main-session",
  }),
});

client.on("qr", (qr) => {
  console.log("📱 Escaneie o QR code abaixo para autenticar:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ Cliente conectado e pronto!");
});

client.on("message", (msg) => {
  if (msg.body === "!ping") {
    msg.reply("pong");
  }
});

client.initialize();
