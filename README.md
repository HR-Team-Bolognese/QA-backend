# Atelier Questions and Answers API

Lightweight, scalable microservice serving a growing ecommerce front-end

## Contents

- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)

---

### Tech Stack

![node](https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg)

- Node.js provides an asynchronous event-driven runtime environment for building scalable network applications

![express](https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg)

- Express was chosen for it's minimal interface and flexible HTTP routing methods

![postgres](https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg)

- PostreSQL is used here as a robust and stable open source database

![nginx](https://www.vectorlogo.zone/logos/nginx/nginx-ar21.svg)

- NGINX enables load balancing HTTP traffic between between many routers

---

### 🚀 Installation and Setup
```
$ git clone https://github.com/HR-Team-Birch/FEC-project-catwalk
$ npm install
$ npm start
```
Set up a config.js with the following:

*  password for database

### System Architecture
NGINX is used with the method least connected to distribute requests between three servers.
![](https://i.imgur.com/4gPvHHH.png)