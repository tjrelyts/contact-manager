# Contact Manager

This project was inspired by [this video](https://www.youtube.com/watch?v=PppslXOR7TA). I followed the tutorial to understand the workflow, but I rebuilt the project to **practice my own tech stack**, which includes:

- **Frontend:** Next.js + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** SQLite  
- **Containerization:** Docker

![](https://github.com/tjrelyts/contact-manager/blob/main/asset/msedge_QboipZ74Z1.gif)

# Docker Setup

This project uses **Docker** to containerize both the backend (Node.js + Express) and frontend (Next.js), allowing you to run the entire application locally or in production without worrying about environment setup.

## How it Works

- **Server**: Runs on Node.js and exposes port `5000`.  
- **Client**: Runs on Next.js and exposes port `3000`.  
- Both containers are orchestrated using `docker-compose`, which sets up networking so the frontend can communicate with the backend seamlessly.

## Setup Instructions

1. **Ensure Docker Desktop is running** on your machine.  
2. Open a terminal in the project root:
    ```bash
    cd "Contact Manager"
    ```
3. Build and start all containers:
    ```bash
    docker compose up --build
    ```
4. Access the app:
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:5000

5. Stop the containers:
    ```bash
    docker compose down
    ```
