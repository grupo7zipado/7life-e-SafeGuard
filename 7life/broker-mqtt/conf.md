# 🚀 Iniciando o Broker MQTT

Para iniciar o Broker MQTT deste projeto, é necessário configurar um arquivo `.env`.  
Esse arquivo contém as informações de conexão com o banco de dados MySQL e as portas usadas pelo Broker.

---

## 📄 Configuração do Arquivo `.env`

Crie um arquivo chamado `.env` na raiz do projeto com as seguintes variáveis:

### 🔗 Configurações do Banco de Dados (MySQL)

| Variável       | Descrição                             |
|----------------|---------------------------------------|
| `DB_HOST`      | Endereço do servidor MySQL (ex: `localhost`) |
| `DB_PORT`      | Porta de conexão do MySQL (ex: `3306`) |
| `DB_USER`      | Nome de usuário do banco de dados     |
| `DB_PASSWORD`  | Senha do banco de dados               |
| `DB_NAME`      | Nome do banco de dados utilizado      |

---

### 📡 Configurações do Broker MQTT

| Variável      | Descrição                              |
|---------------|----------------------------------------|
| `PORT_MQTT`   | Porta onde o Broker MQTT irá escutar conexões TCP (ex: `1883`) |
| `WS_PORT`     | Porta para conexões via WebSocket (ex: `8083`) |

---

## ✅ Exemplo de `.env`

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha123
DB_NAME=sistema7life

PORT_MQTT=1883
WS_PORT=8083

## 📥 Instalando as Dependências

Antes de iniciar o Broker MQTT, é necessário instalar as dependências do projeto.

Execute o seguinte comando no terminal, dentro da pasta do projeto:

```bash
npm install

Esse comando irá baixar todas as bibliotecas listadas no arquivo package.json.

## ▶️ Iniciando o Broker MQTT

Após a instalação das dependências e a configuração do arquivo .env, inicie o Broker executando:

```bash

npm start

Isso irá iniciar o serviço do Broker MQTT conforme as configurações definidas.
