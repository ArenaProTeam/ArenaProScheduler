# Arena Pro - Sistema de Agendamento de Arena

## Descrição
Plataforma para agendamento de quadras de areia.

## Tecnologias
- **Front-end:** Javascript, React
- **Back-end:** Node.js, Express.js
- **Banco de Dados:** MongoDB

## Estrutura do Projeto
```plaintext
ArenaProScheduler/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── arenaController.js
│   ├── models/
│   │   └── Arena.js
│   ├── routes/
│   │   └── arenaRoutes.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── About.js
│       │   ├── Home.js
│       │   ├── Contact.js
│       │   ├── Structure.js
│       │   ├── Reserve.js
│       │   └── ReservationModal.js
│       ├── App.js
│       └── index.js
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── scripts.js
│   └── images/
│       └── logo.png
├── .gitignore
├── README.md
├── package.json
└── package-lock.json

# Sistema de Agendamento de Arena

## Índice
1. [Introdução](#introdução)
2. [Requisitos do Sistema](#requisitos-do-sistema)
3. [Acesso à Aplicação](#acesso-à-aplicação)
4. [Funcionalidades](#funcionalidades)
   - [Agendar um Horário](#agendar-um-horário)
   - [Visualizar Agendamentos](#visualizar-agendamentos)

---

## Introdução
Bem-vindo ao **Sistema de Agendamento de Arenas**! Esta aplicação foi desenvolvida para permitir que você agende horários para diversas atividades esportivas,
como beach volley e beach tennis, de maneira prática e intuitiva.

## Requisitos do Sistema
Para utilizar esta aplicação, você precisará dos seguintes requisitos:
- **Navegador web moderno**: Recomendado Google Chrome, Mozilla Firefox ou outro navegador atualizado.
- **Conexão com a internet**: A aplicação é acessada pela web e requer conexão ativa para funcionamento.

## Acesso à Aplicação
Para acessar o sistema de agendamento, siga estas instruções:
1. Abra o navegador web de sua preferência.
2. Acesse a aplicação pelo seguinte endereço:
   - [https://arenaproscheduler.vercel.app]

## Funcionalidades
A aplicação oferece as seguintes funcionalidades principais:

### Agendar um Horário
1. Preencha o formulário com os detalhes da sua reserva:
   - **Nome**: Informe seu nome.
   - **Data e Horário**: Selecione a data e o horário desejado para o agendamento.
   - **Telefone**: Insira seu telefone celular de contato.
2. Clique no botão **"RESERVAR"** para confirmar seu agendamento.

### Visualizar Agendamentos
Após fazer uma reserva, os agendamentos serão exibidos automaticamente abaixo do formulário. Você poderá visualizar a lista completa de horários reservados.

---

## Suporte
Caso encontre algum problema ou tenha dúvidas sobre a utilização, entre em contato com a equipe de desenvolvimento através da seção de [Issues](https://github.com/arenaproteam/ArenaProScheduler/issues) do repositório.




