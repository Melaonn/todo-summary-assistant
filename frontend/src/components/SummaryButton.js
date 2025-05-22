import React, { useState } from 'react';
import axios from 'axios';

export default function SummaryButton() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.post('http://localhost:5000/summarize');
      setMessage('✅ Sent to Slack!');
    } catch {
      setMessage('❌ Failed to send to Slack.');
    }
  };

  return (
    <>
      <button onClick={handleClick}>Summarize & Send to Slack</button>
      <p>{message}</p>
    </>
  );
}


