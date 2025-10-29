# WhatsApp Web JS API

API REST simples construída com Node.js, Express e [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) para envio e recebimento de mensagens via WhatsApp Web.

## Requisitos

- Node.js 18+
- Conta WhatsApp ativa para autenticação

## Configuração

1. Clone o repositório e instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo `.env.example` para `.env` e defina o token de acesso:

   ```bash
   cp .env.example .env
   # Edite o arquivo .env e informe o valor desejado
   ```

   ```env
   API_TOKEN=sua_chave_segura
   PORT=3000
   ```

## Executando o projeto

- Ambiente de desenvolvimento com recarregamento automático:

  ```bash
  npm run dev
  ```

- Ambiente de produção:

  ```bash
  npm start
  ```

Ao iniciar pela primeira vez, o terminal exibirá um QR Code. Escaneie-o com o aplicativo WhatsApp (Menu > Dispositivos conectados > Conectar um dispositivo) para autenticar a sessão. A sessão é persistida localmente usando `LocalAuth`, assim você não precisará escanear novamente enquanto os dados permanecerem no diretório `.wwebjs_auth`.

## Endpoints

Todos os endpoints exigem o cabeçalho `Authorization: Bearer <API_TOKEN>`.

### `GET /status`

Retorna o estado atual da conexão com o WhatsApp:

```json
{
  "status": "connected"
}
```

### `POST /send`

Envia uma mensagem para um número WhatsApp:

```bash
curl -X POST http://localhost:3000/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{"number": "+5511999999999", "message": "Olá, mundo!"}'
```

Resposta esperada:

```json
{
  "success": true,
  "to": "+5511999999999",
  "message": "Olá, mundo!"
}
```

### `POST /receive`

Endpoint de depuração que simula o recebimento de mensagens. Ele apenas registra o conteúdo no console e retorna status 200. Exemplo:

```bash
curl -X POST http://localhost:3000/receive \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{"from": "+5511999999999", "message": "Mensagem simulada"}'
```

## Logs

O terminal exibirá logs claros durante a execução:

```
🚀 Servidor iniciado na porta 3000
📱 Escaneie o QR code abaixo para autenticar:
✅ WhatsApp conectado!
📨 Mensagem recebida de +5511999999999@c.us: Olá!
📤 Mensagem enviada para +5511999999999
```

Esses logs auxiliam no monitoramento das ações da API.
