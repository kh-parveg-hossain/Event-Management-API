
## Tech Stack


**Server:** Node, Express,prisma

**DB:** neon db(postgracesql)

# Project Title

event-management-api



📂 Folder stracture
```bash
event-management-api/
├─ prisma
├─ src/
│  ├─ config/
│  │  ├─ config.js
│  ├─ controllers/
│  │  ├─ eventController.js
│  │  └─ userController.js
│  ├─ routes/
│  │  ├─ eventRoutes.js
│  │  └─ userRoutes.js
│  ├─ utils/
│  │  └─ validators.js
│  │  └─ db.js
│  └─ app.js
│  └─ index.js
├─ .env
├─ package.json
└─ README.md
```


    
## Event Apis

![App Screenshot](https://raw.githubusercontent.com/kh-parveg-hossain/Event-Management-API/refs/heads/main/event%20api.png)



## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

