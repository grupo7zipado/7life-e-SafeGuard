# 🚀 Iniciando a Aplicação Web

Para iniciar a Aplicação Web deste projeto, é necessário configurar um arquivo `.env`.  
Esse arquivo contém as informações de conexão com o Broker MQTT via WebSocket e com a API.

---

## 📄 Configuração do Arquivo `.env`

Crie um arquivo chamado `.env` na raiz do projeto com as seguintes variáveis:

### 🌐 Configurações de Conexão

| Variável   | Descrição                                  |
|------------|--------------------------------------------|
| `WS_URL` | URL de conexão WebSocket com o Broker MQTT (ex: `ws://localhost:8083`) |
| `API_URL` | URL de acesso à API (ex: `http://localhost:3000`) |

---

## ✅ Exemplo de `.env`

```env
WS_URL=ws://localhost:8083
API_URL=http://localhost:3000
```

## 📥 Instalando as Dependências

Antes de iniciar a aplicação web, é necessário instalar as dependências do projeto.

Execute o seguinte comando no terminal, dentro da pasta do projeto:

```cmd
npm install
```

Esse comando irá baixar todas as bibliotecas listadas no arquivo `package.json`.

## ▶️ Iniciando a Aplicação Web

Após a instalação das dependências e a configuração do arquivo `.env`, inicie o projeto executando:

```cmd
npm run dev
```

Isso irá iniciar o servidor de desenvolvimento da aplicação web.

---

