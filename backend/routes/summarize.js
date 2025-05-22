const express = require('express');
const router = express.Router();
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const COHERE_API_KEY = process.env.COHERE_API_KEY;
const COHERE_URL = 'https://api.cohere.ai/v1/summarize';
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

router.post('/summarize', async (req, res) => {
  try {
    const { data: todos, error } = await supabase
      .from('todos')
      .select('text')
      .order('id', { ascending: false });

    if (error) throw error;
    if (!todos || todos.length === 0) {
      return res.status(400).json({ message: 'No todos to summarize' });
    }

    const todoText = todos.map(t => t.text).join('. ') + '.';

    let summary = '';
    if (todoText.length >= 250) {
      // Use Cohere summarization
      const cohereResponse = await axios.post(
        COHERE_URL,
        {
          text: todoText,
          length: 'short',
          format: 'bullets',
          model: 'command',
          additional_command: 'Summarize this to-do list without adding anything fictional.',
        },
        {
          headers: {
            Authorization: `Bearer ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      summary = cohereResponse.data?.summary;
      if (!summary) {
        return res.status(500).json({ message: 'No summary returned from Cohere' });
      }
    } else {
      // Manual fallback summary
      summary = 'To-Do Items:\n' + todos.map(t => `• ${t.text}`).join('\n');
    }

    const slackResponse = await axios.post(SLACK_WEBHOOK_URL, {
      text: `*To-Do Summary:*\n${summary}`,
    });

    if (slackResponse.status === 200) {
      return res.json({ success: true, summary });
    } else {
      return res.status(500).json({ message: 'Failed to send to Slack' });
    }
  } catch (error) {
    console.error('Error in /summarize:', error.response?.data || error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

module.exports = router;
