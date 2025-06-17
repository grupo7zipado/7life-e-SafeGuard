# 📡 Broker MQTT – Visão Geral e Aplicação no Projeto

## 🔌 O que é um Broker MQTT?

Um **broker MQTT** é o componente central de um sistema baseado no protocolo MQTT. Ele atua como um **servidor de mensagens**, sendo responsável por:

- Receber mensagens dos dispositivos conectados  
- Filtrar e autenticar as conexões  
- Encaminhar mensagens para os dispositivos ou aplicações que estiverem inscritos nos tópicos correspondentes  

---

## 📡 Para que serve um Broker MQTT?

Antes de entender o papel do broker, é importante saber o que é o **protocolo MQTT (Message Queuing Telemetry Transport)**:

- ➡️ Um protocolo leve de mensagens baseado no modelo *publish/subscribe*  
- ➡️ Ideal para aplicações IoT, com foco em eficiência e baixa largura de banda  
- ➡️ Projetado para funcionar mesmo com conexões instáveis, como em sensores remotos  

No funcionamento padrão:

- Dispositivos **publicam** dados em tópicos específicos (ex: `esp32/temp`)  
- Outros dispositivos ou aplicações **assinam** esses tópicos para receber os dados  
- 🧠 O broker gerencia essa troca de informações, sendo o **“cérebro”** da rede MQTT  

---

## ⚙️ Como funciona um Broker MQTT?

1. Dispositivos se conectam ao broker via protocolo MQTT (geralmente na porta **1883**)  
2. Um dispositivo **publica** uma mensagem em um tópico (ex: `esp32/bpm`)  
3. O broker **recebe** essa mensagem  
4. O broker **encaminha** a mensagem para todos os que estiverem **inscritos** nesse tópico  

Esse modelo promove o **desacoplamento** entre quem envia e quem recebe as mensagens, tornando o sistema mais flexível e escalável.

---

## 🧪 Como foi utilizado no projeto

### 🔍 Função no projeto

O broker MQTT foi utilizado como uma **ponte de comunicação entre o ESP32 e o servidor web**, permitindo o envio de:

- Batimentos cardíacos  
- Oxigenação sanguínea  
- Temperatura corporal  

Esses dados eram transmitidos em **tempo real** para o sistema, e o próprio broker também foi responsável por **registrar diretamente as informações no banco de dados**.

---

### 🌐 Acesso via WebSocket (WS)

Para garantir a atualização em tempo real na interface web:

- Foi utilizada comunicação via **WebSocket**, que mantém uma conexão contínua e bidirecional com o broker  
- A biblioteca `mqtt.js` foi utilizada para conectar o frontend diretamente ao broker  
- A aplicação assinava os mesmos tópicos utilizados pelo ESP32, permitindo a **visualização instantânea dos sinais vitais** na tela  

---

### 🖥️ Broker utilizado

O broker escolhido foi o **Aedes**, uma implementação MQTT **leve** desenvolvida em **Node.js**, ideal para:

- Integração com backends JavaScript  
- Conexão direta com o banco de dados  
- Projetos de pequeno e médio porte com foco em IoT  

---
