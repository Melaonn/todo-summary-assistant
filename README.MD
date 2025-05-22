# Todo Summary Assistant

## Features
- Manage personal to-dos
- Summarize all todos using OpenAI
- Send summary to a Slack channel

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- Database: Supabase
- LLM: OpenAI GPT-3.5
- Slack Webhook Integration

## Setup

1. Clone repo and install dependencies
2. Set up `.env` based on `.env.example`
3. Start backend: `npm run start` in `/backend`
4. Start frontend: `npm run dev` in `/frontend`

## Slack Setup
- Go to https://api.slack.com/messaging/webhooks
- Create a webhook URL
- Add it to your `.env`

## LLM Setup
- Get API key from https://platform.openai.com/account/api-keys
