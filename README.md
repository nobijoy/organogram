# Employee Hierarchy API

## Overview

This project is a NestJS-based backend API that returns all employee information under a given position in an organizational hierarchy.

---

## Features

- 🌐 REST API to fetch employees under any given employee (e.g., position)
- 🧪 Unit tested services
- 📦 Docker-based setup for easy deployment

---

## Tech Stack

- **NestJS**
- **TypeScript**
- **JWT Authentication**
- **PostgreSQL** (via Docker)
- **Jest** (for testing)

---

## How to Run

### Prerequisites

- Docker
- Node.js and npm/yarn

### Docker (Recommended)

```bash
docker-compose up --build
```

### Local Development

```bash
npm install
npm run start:dev
```

---

## API Endpoints

### Authentication

**POST** `/auth/login`

**Body:**
```json
{ "username": "your_username", "password": "your_password" }
```

**Returns:**
```json
{ "access_token": "JWT_TOKEN" }
```

### Employees

**GET** `/employees/:id`

**Header:**  
`Authorization: Bearer <JWT_TOKEN>`

Returns all employees under the given employee ID in the hierarchy.

---

## Example Scenario

Given:

- **Employee ID 1:** CTO
- **Employee ID 2:** Senior Software Engineer (reports to ID 1)
- **Employee ID 3:** Software Engineer (reports to ID 2)

**Request:**
```
GET /employees/1
```

**Response:**  
Includes both Employee 2 and 3 (all levels below ID 1)

---

## Scaling Strategy

To support 5000+ concurrent requests:

- ✅ This application is asynchronous and non-blocking by default, using Node.js so it can handle this much load
- ✅ With proper deployment (PM2 or Docker + load balancing), 5000 concurrent requests is feasible

---

## Logging & Monitoring

- ✅ Used nestjs-pino for JSON logs
- ✅ Wanted to integrate Prometheus + Grafana to monitor performance metrics  

---

## Tests

To run unit tests:

```bash
npm run test
```

**Covers:**

- Auth service 
- Employee service 

---

## Deployment

### Docker (Recommended)

```bash
docker-compose up --build
```

Ensure you set up your `.env` file with the necessary environment variables (DB credentials, JWT secrets, etc.).

---

## Incomplete 

- [ ] Add rate-limiting to avoid abuse
- [ ] UI enhancements: loading states, filters, pagination
- [ ] Add Swagger/OpenAPI documentation
- [ ] Integration tests with real DB and auth flow
- [ ] Include metrics endpoint for Prometheus