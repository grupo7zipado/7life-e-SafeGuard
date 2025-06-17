# 🌐 API – Conceito e Aplicação no Projeto

## 📘 O que é uma API?

API significa **Interface de Programação de Aplicações** (*Application Programming Interface*).  
É um conjunto de regras que permite que **diferentes sistemas se comuniquem entre si** de forma padronizada.

---

## 🎯 Para que serve uma API?

A API serve como **ponte entre diferentes sistemas**. Com ela, é possível:

- Solicitar ou enviar dados entre aplicativos  
- Conectar frontends com backends  
- Integrar serviços externos (como pagamento, mapas, notificações, etc.)

Ela facilita a troca de informações, **sem que um sistema precise conhecer a estrutura interna do outro**.

---

## ⚙️ Como funciona uma API?

Uma API geralmente funciona por meio de **requisições HTTP** (como `GET`, `POST`, `PUT`, `DELETE`), onde:

1. O **cliente** (ex: um site ou app) faz uma **requisição**  
2. O **servidor** processa essa solicitação  
3. O **servidor responde** com os dados ou resultado da ação  

Essa comunicação ocorre por meio de **endpoints**, como por exemplo:  
https://exemplo.com/api/usuarios

---

## 🔌 Como foi utilizada no projeto

No projeto, a API foi utilizada para **fazer a ponte entre o frontend e o banco de dados**.  
Por meio dela, foi possível:

- Buscar os dados recebidos do ESP32 (já armazenados no banco)  
- Exibir as informações atualizadas na interface web  
- Garantir uma separação entre a lógica do servidor e a exibição no navegador  

---