// IMPROTS
// BROKER MQTT
const aedes = require('aedes')();
// CRIA AS PORTAS DE ACESSO 
const net = require('net');
// CRIA O SERVIÇO WS
const ws = require("ws");
// CRIA O SERVIÇO HTTP
const http = require("http");
//CONEXÃO COM BANCO
const db = require("./db.js");

require('dotenv').config();

// Porta do broker MQTT
const PORT_MQTT = process.env.PORT_MQTT;
const WS_PORT =  process.env.PORT_WS;
// Cria o servidor MQTT
const server = net.createServer(aedes.handle);

// Evento de conexão no broker
aedes.on('client', (client) => {
  console.log(`Cliente conectado: ${client.id} | Conexão: ${JSON.stringify(client.connDetails)}`);
});
  



// Evento de desconexão
aedes.on('clientDisconnect', (client) => {
  console.log(`Cliente desconectado: ${client.id} | Conexão: ${JSON.stringify(client.connDetails)}`);
});

aedes.on('publish', async (packet, client) => {
    const [esp_mac, action] = packet.topic.split('/');

    if (client) {
      console.log(
      'Novo Publish Recebido:\n' +
      `Cliente: ${client ? client.id : 'Interno/Retain'}\n` +
      `Conexão: ${client && client.connDetails ? JSON.stringify(client.connDetails) : 'N/A'}\n` +
      `Tópico: ${packet.topic}\n` +
      `Payload: ${packet.payload.toString()}`
      );
      if (action === "temperatura" || action === "bpm" || action === "oxigenacao") {
        try {
            if (!(client.id && packet.payload)) {
                throw new Error('Erro de client e payload');
            }

            const data = JSON.parse(packet.payload.toString());

            if (!(data && data.use_id && data.dados_tipo && data.dados_valor && data.dados_generate)) {
                throw new Error('Dado Inválido');
            }
			  const dados_generate = new Date( data.dados_generate*1000);
            // 🔹 Insere os dados no banco
            const sql = "INSERT INTO dados (use_id, dados_tipo, dados_valor, dados_generate) VALUES (?, ?, ?, ?);";
            const dados = [data.use_id, data.dados_tipo, data.dados_valor, dados_generate ];
            
            const res = await db.query(sql, dados);
            console.log(`✅ Dado inserido no banco: ${res}`);

        } catch (error) {
            console.log(`❌ Erro: ${error.message}`);
        }
      }

    }
});


  
// Evento de inscrição em tópicos
aedes.on('subscribe', (subscriptions, client) => {
  console.log(`Cliente inscrito: ${client.id} | Tópicos: ${subscriptions.map(s => s.topic).join(', ')}`);
});
  
// Inicia o servidor
server.listen(PORT_MQTT, () => {
  console.log(`Broker MQTT rodando na porta ${PORT_MQTT}`);
});




// Servidor HTTP + WebSockets para MQTT
const httpServer = http.createServer();
const wss = new ws.Server({ server: httpServer });

wss.on("connection", (ws) => {
  const stream = require("stream");
  const duplex = new stream.Duplex({
    read(size) {},
    write(chunk, encoding, callback) {
      ws.send(chunk, encoding, callback);
    },
  });

  duplex.on("data", (data) => ws.send(data));
  ws.on("message", (msg) => duplex.push(msg));
  ws.on("close", () => duplex.push(null));

  aedes.handle(duplex);
});

httpServer.listen(WS_PORT, () => {
  console.log(`Broker MQTT WebSocket rodando na porta ${WS_PORT}`);
});
