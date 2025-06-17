# 7life-e-SafeGuard
**TCC Técnico em Redes de Computadores**

O projeto desenvolvido pelo **Grupo7zipado** tem como objetivo apresentar uma solução integrada para o **monitoramento de sinais vitais**, com foco em **BPM (batimentos cardíacos), oxigenação e temperatura corporal**.

A solução é composta por três partes principais:

## 📲 Dispositivo Móvel de Monitoramento

Um equipamento portátil baseado em **ESP32**, equipado com sensores para a coleta dos sinais vitais e um display OLED para exibição local dos dados. Este dispositivo realiza a leitura em tempo real, conecta-se à rede Wi-Fi e envia as informações para o servidor por meio do protocolo **MQTT**.

## 🌐 Serviços em NodeJS de Broker MQTT e API

Com NodeJs foi criado um **Broker MQTT** recebe os dados enviados pelos dispositivos. Em seguida, uma **API** processa e armazena essas informações em um banco de dados, tornando-as acessíveis para os usuários finais.

## 💻 Aplicação Web (Sistema 7LIFE)

Uma interface web desenvolvida em **React**, que permite a visualização em tempo real dos sinais vitais coletados. Os usuários podem acessar gráficos e tabelas que apresentam o histórico das medições, com foco em facilidade de uso e acessibilidade.

---

## Principais Tecnologias Utilizadas

- **ESP32** (Microcontrolador com Wi-Fi)
- **Sensores de Sinais Vitais:** MAX30102, MLX90614
- **Broker MQTT (Aedes)**
- **Node.js + Express (API)**
- **MySQL (Banco de Dados)**
- **React.js (Frontend Web)**

---

## Objetivos do Projeto

- Promover um **monitoramento remoto** eficiente de parâmetros de saúde.
- Integrar diferentes tecnologias de rede, comunicação e programação.
- Demonstrar na prática os conceitos estudados durante o curso técnico.

O projeto reflete o compromisso do **Grupo7zipado** em aplicar soluções de **Internet das Coisas (IoT)** e **Redes de Computadores** para resolver problemas reais.
