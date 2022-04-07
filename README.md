# Atelier Questions and Answers API

System Design Capstone || Atelier API
The purpose of this project is to migrate data from an existing API to a new database and then horizontally scale the server with AWS EC2 instances that would interact with the database. I chose to use PostgreSQL for this project. 

I additionally added an EC2 instance which utilized NginX to act as a load balancer. I used the least-connected technique to distribute requests to my server instances.

The first leg of this sprint was to populate a PostgreSQL database with entries from a CSV. Complex nested SQL queries were created to return the data in the same structure as it was delivered to us in the FEC project (Project Catwalk, please see my resume for a link). Local Machine testing was perfomed using K6, once acceptable metrics were achieved I moved to the second leg.

The second leg of the sprint was to upload my database to the cloud using AWS, as well as create a server that could interact with that database. Once that was achieved, I created an image of my server instance, and cloned it four additional times. I frequently used loader.io to test my server and database with increasing amounts of requests per second. I achieved a satisfactory 2500 Requests Per Second with a 2ms latency time and 0% error rate once I created three instances of my server and set up load balancing.


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
