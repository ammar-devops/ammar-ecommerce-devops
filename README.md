# 🛒 E-Commerce DevOps Project

A production-ready E-Commerce application demonstrating a complete DevOps CI/CD workflow using Docker, Jenkins, GitHub Webhooks, and AWS EC2.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Nginx

### Backend
- Node.js
- Express

### Database
- PostgreSQL

### DevOps
- Docker
- Docker Compose
- Jenkins
- GitHub
- GitHub Webhooks
- AWS EC2
- Linux
- SSH

---

# Architecture

```
                 Git Push
                     │
                     ▼
                GitHub Repository
                     │
                     ▼
              GitHub Webhook
                     │
                     ▼
                  Jenkins
                     │
        Checkout Latest Code
                     │
                     ▼
             Docker Compose
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
  Frontend       Backend        PostgreSQL
   (React)       (Node.js)         DB
```

---

# Features

- CI/CD Pipeline
- Automatic Deployment
- Dockerized Application
- Health Checks
- Production Docker Compose
- GitHub SSH Authentication
- GitHub Webhooks
- Multi-Container Architecture

---

# Project Structure

```
ammar-ecommerce-devops
│
├── backend
├── frontend
├── Jenkinsfile
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

# CI/CD Flow

1. Developer pushes code to GitHub
2. GitHub Webhook triggers Jenkins
3. Jenkins checks out latest code
4. Docker images are built
5. Docker Compose deploys containers
6. Health check validates deployment

---

# Running Services

- Frontend
- Backend
- PostgreSQL
- Jenkins

---

# Commands

Start

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Stop

```bash
docker compose -f docker-compose.prod.yml down
```

Logs

```bash
docker compose -f docker-compose.prod.yml logs
```

---

# Future Improvements

- Kubernetes
- Terraform
- AWS ECR
- Prometheus
- Grafana
- HTTPS
- Nginx Reverse Proxy
- Blue-Green Deployment

---

# Author

Ammar Ganja

