📝 Todo Summary Assistant


🔧 Backend Setup

1.Navigate to the backend folder:
-cd backend

2.Install dependencies:
-npm install

3.Create a .env file from .env.example:
-cp .env.example .env

4.Fill in your actual keys: also create database
PORT=5000
SUPABASE_URL=yoursupabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=your_db_url
COHERE_API_KEY=your_cohere_api
SLACK_WEBHOOK_URL=yourslackchannel
