# 🚀 Iniciando a API

Para iniciar a API deste projeto, é necessário configurar um arquivo `.env`.  
Esse arquivo contém as informações de conexão com o banco de dados MySQL e a porta utilizada pela API.

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

### 🌐 Configuração da Porta da API

| Variável   | Descrição                        |
|------------|----------------------------------|
| `PORT`     | Porta onde a API irá escutar requisições HTTP (ex: `3000`) |

---

## ✅ Exemplo de `.env`

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha123
DB_NAME=sistema7life

PORT=3000
```

## 📥 Instalando as Dependências

Antes de iniciar a API, é necessário instalar as dependências do projeto.

Execute o seguinte comando no terminal, dentro da pasta do projeto:

```cmd
npm install
```

Esse comando irá baixar todas as bibliotecas listadas no arquivo `package.json`.

## ▶️ Iniciando a API

Após a instalação das dependências e a configuração do arquivo `.env`, inicie a API executando:

```cmd
npm start
```

Isso irá iniciar o serviço da API conforme as configurações definidas.
