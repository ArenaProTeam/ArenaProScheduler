# Arena Pro - Sistema de Agendamento de Arena

## Descrição
Plataforma para agendamento de quadras de areia.

## Tecnologias
- **Front-end:** React
- **Back-end:** Node.js, Express.js
- **Banco de Dados:** MongoDB

## Estrutura do Projeto
```plaintext
beach-arena-scheduler/
├── backend/
│   ├── config/
│       └── db.js
│   ├── controllers/
│       └── arenaController.js
│   ├── models/
│       └── Arena.js
│   ├── routes/
│       └── arenaRoutes.js
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
├── package.json
└── README.md
