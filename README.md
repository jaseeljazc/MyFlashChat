# MyFlashChat

A real-time chat application built with **React**, **TailwindCSS**, **Node.js**, **Express**, **MongoDB**, and **Socket.io**.

Live Backend: [my-flash-chat.vercel.app]((https://my-flash-chat.vercel.app/))

---

## About

**MyFlashChat** is a modern web chat app featuring real-time messaging, a clean React UI with TailwindCSS, robust backend with Express & MongoDB, and instant communication powered by Socket.io.

---

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Realtime:** Socket.io
- **Deployment:** Vercel (backend), other (frontend, if applicable)

---

## Features

- Real-time chat messaging (Socket.io)
- User-friendly, responsive design (TailwindCSS)
- User authentication & authorization
- Group and personal chat support
- Message persistence with MongoDB
- Fast backend API with Express
- Works on both desktop and mobile browsers

---

## Project Structure

MyFlashChat/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── socket/
│ ├── .env.example
│ └── package.json
│
├── frontend/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ ├── main.jsx
│ ├── assets/
│ └── styles/ (Tailwind)
│
├── README.md



---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- MongoDB (local or Cloud, e.g., Atlas)

### Installation

1. **Clone the repo**
git clone https://github.com/jaseeljazc/MyFlashChat.git
cd MyFlashChat



2. **Backend Setup**
cd backend
npm install

Copy .env.example to .env and fill out your MongoDB connection string, JWT secret, etc.
npm run dev



3. **Frontend Setup**
cd ../frontend
npm install
npm run dev



4. **Open in Browser**
- Frontend: http://localhost:5173 (or default Vite port)
- Backend API: http://localhost:5000

---

## Scripts

- `npm run dev` (backend): Start Express backend (nodemon)
- `npm run dev` (frontend): Start React + Vite frontend
- `npm run build` (frontend): Build frontend for production

---

## Customization

- Update UI/layout in `/frontend/src/components` (Tailwind classes)
- Edit chat logic and message handling as needed
- Adjust backend endpoints in `/backend/routes` and real-time events in `/backend/socket`

---

## Contributing

Contributions welcome!
- Fork the repository
- Create a feature branch
- Commit changes
- Open a Pull Request

---

## License

MIT

---

> Issues or suggestions? Open an issue on GitHub or reach out via the app!
