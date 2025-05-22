📝 Todo Summary Assistant

------------------------------------------------------------------------------
🔧 Backend Setup

1.Navigate to the backend folder:
-cd backend

2.Install dependencies:
-npm install

3.Create a .env file from .env.example:
-cp .env.example .env

4.Fill in your actual keys: also create database
for supabase db url make sure to create a db table  in sql editor
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL
);

SUPABASE_URL=yoursupabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=your_db_url


replace everything with your supabase 

5.Start the server:
node index.js

-------------------------------------------------------------------------------
🖥️ Frontend Setup

1.Navigate to the frontend folder:
-cd frontend

2.Install dependencies:
npm install

3.Start the React app:
npm start

4.The app will open at: http://localhost:3000

---------------------------------------------------------------------------------
📤 Slack Setup

Go to: https://api.slack.com/messaging/webhooks

Click "Create a Slack App"

Select "Incoming Webhooks"

Enable Webhooks and add a new Webhook URL to a channel

Copy the generated Webhook URL

Paste it into your backend .env:

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ

-------------------------------------------------------------------------------------
🤖 LLM (Cohere) Setup
Sign up at https://dashboard.cohere.com/

Go to your API Keys section and generate a new API key.

In your backend .env file, add:

COHERE_API_KEY=your_cohere_api_key_here


-------------------------------------------------------------------------------------

















