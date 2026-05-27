# Task Manager SIA — Original System

A simple RESTful Task Manager API built with Node.js and Express.
This is the **original system** before microservice integration.

## Live Deployment
🔗 https://task-manager-sia-1.onrender.com

## Tech Stack
- Node.js
- Express.js
- CORS middleware
- JSON file storage (data.json)

## Project Structure
task-manager-sia/
├── server.js       # Main Express server + all routes
├── data.json       # Persistent JSON data store
├── package.json    # Project manifest
└── README.md       # This file

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Health check |
| GET | /api/tasks | Get all tasks |
| GET | /api/categories | Get all categories |
| POST | /api/tasks | Create a task |
| PATCH | /api/tasks/:id/toggle | Toggle completion |
| PATCH | /api/tasks/:id | Edit task |
| DELETE | /api/tasks/:id | Delete a task |

## How to Run Locally
```bash
git clone https://github.com/jydhan15/Task-Manager-SIA.git
cd Task-Manager-SIA
npm install
npm start
```
Server runs on http://localhost:3000

## Author
jydhan15 — Systems Integration & Architecture
