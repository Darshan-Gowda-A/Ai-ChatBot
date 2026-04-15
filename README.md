#  AI ChatBot

Hey there! 👋
This is a simple AI ChatBot project that lets you chat with an AI, store conversations, and explore how modern AI apps are built.

It’s a great starting point if you're learning how to connect:

* a frontend chat UI 
* a backend server 
* an AI model 
* and a database 

---

##  Getting Started

Let’s get this running on your system step by step.

### 1. Clone the repo

Open your terminal and run:

```bash
git clone https://github.com/Darshan-Gowda-A/Ai-ChatBot.git
cd Ai-ChatBot
```

---

### 2. Install dependencies

Now install all required packages:

```bash
npm install
```

> If the project has separate frontend & backend folders, install inside both.

---

##  Environment Setup

Before running the app, you need to create a `.env` file.

In the root (or server folder), create a file named:

```
.env
```

Add this inside:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GROQ_API_KEY=your_groq_api_key
```

---

##  MongoDB Atlas Setup (Database)

If you’ve never used MongoDB Atlas, don’t worry — here’s the simple way:

1. Go to 👉 https://www.mongodb.com/atlas
2. Sign up and create a free cluster
3. Once created:
   * Click **Connect**
   * Choose **Drivers**
   * Copy the connection string
It will look like this:

```
mongodb+srv://username:password@cluster0.mongodb.net/chatbot
```

Replace:

* `username` with your DB username
* `password` with your password

Then paste it into your `.env`:

```
MONGO_URI=your_connection_string_here
```

Important:

* Go to **Network Access**
* Add IP: `0.0.0.0/0` (for testing)

---

## Groq API Setup (AI)

This project uses Groq for AI responses.

1. Go to  https://console.groq.com
2. Sign in
3. Generate your API key

Add it to your `.env`:

```
GROQ_API_KEY=your_api_key_here
```

---

## Run the App

Start the backend:

```bash
cd Backend
npm start
```

or

```bash
cd Backend
node server.js
```

for frontend frontend:

```bash
cd ..
cd Frontend
npm run dev
```

---

##  Open the App

Once everything is running, open:

```
 http://localhost:5173/
```

(or backend runs on `http://localhost:8080`)

---

##  How It Works (Simple Explanation)

* You type a message
* It goes to the backend
* Backend sends it to Groq AI
* AI generates a reply
* Chat gets stored in MongoDB
* Response comes back to your screen

That’s it 

---

##  Tech Used

* Node.js + Express
* MongoDB Atlas
* Groq API
* (Optional) React frontend

---

## Common Issues

**MongoDB not connecting?**

* Check your connection string
* Make sure IP is whitelisted

**Groq not responding?**

* Double-check API key

**Port already in use?**

```bash
kill -9 $(lsof -t -i:5000)
```

---

