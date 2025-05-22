# 📝 Todo Summary Assistant

A full-stack application to manage your todos, summarize them using a Large Language Model (LLM), and send the summaries to a Slack channel.

---

## 🔧 Backend Setup

1. **Navigate to the backend folder**:  
   `cd backend`

2. **Install dependencies**:  
   `npm install`

3. **Create a `.env` file**:  
   `cp .env.example .env`

4. **Set up Supabase**:  
   - Create a database table in Supabase SQL Editor:
     ```
     CREATE TABLE todos (
       id SERIAL PRIMARY KEY,
       text TEXT NOT NULL
     );
     ```
   - Fill in your actual Supabase credentials in the `.env` file:
     ```
     SUPABASE_URL=your_supabase_url  
     SUPABASE_ANON_KEY=your_anon_key  
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  
     SUPABASE_DB_URL=your_db_connection_url  
     ```

5. **Start the backend server**:  
   `node index.js`

---

## 🖥️ Frontend Setup

1. **Navigate to the frontend folder**:  
   `cd frontend`

2. **Install dependencies**:  
   `npm install`

3. **Start the React app**:  
   `npm start`

4. **Access the app**:  
   Open `http://localhost:3000` in your browser

---

## 📤 Slack Setup

1. Go to https://api.slack.com/messaging/webhooks  
2. Click "Create a Slack App"  
3. Select "Incoming Webhooks"  
4. Enable Webhooks and create a Webhook URL for your desired channel  
5. Copy the Webhook URL and add it to your `.env` file:  
   `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ`

---

## 🤖 LLM (Cohere) Setup

1. Sign up at https://dashboard.cohere.com/  
2. Go to API Keys and generate a new API key  
3. Add the API key to your `.env` file:  
   `COHERE_API_KEY=your_cohere_api_key_here`

---

## 📌 Features

- Add and manage todo items  
- Summarize todos using Cohere LLM  
- Send summaries to a Slack channel  
- Supabase as backend database

---

## 📂 Project Structure

```
root/
├── backend/       # Node.js backend with Express and Supabase
│   ├── index.js
│   └── .env
├── frontend/      # React frontend
│   └── src/
│       └── App.js
└── README.md
```

---

## 🚀 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- Cohere (https://cohere.com/)  
- Supabase (https://supabase.io/)  
- Slack (https://slack.com/)
