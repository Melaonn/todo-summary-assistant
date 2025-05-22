import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [summaryMessage, setSummaryMessage] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error('Error loading todos:', err));
  }, []);

  const handleAddOrEdit = (newTodo) => {
    if (editingTodo) {
      setTodos(todos.map(todo => (todo.id === newTodo.id ? newTodo : todo)));
      setEditingTodo(null);
    } else {
      setTodos([newTodo, ...todos]);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const cancelEdit = () => {
    setEditingTodo(null);
  };

  const generateSummary = async () => {
    setLoadingSummary(true);
    setSummaryMessage('');
    try {
      const res = await axios.post('http://localhost:5000/summarize');
      if (res.data.success) {
        setSummaryMessage('✅ Summary sent to Slack:\n' + res.data.summary);
      } else {
        setSummaryMessage('❌ Failed: ' + (res.data.message || 'Unknown error'));
      }
    } catch (error) {
      setSummaryMessage('❌ Error generating summary: ' + error.message);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
  <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
    <h1 style={{ textAlign: 'center', marginBottom: 30 }}>📝 Todo Summary Assistant</h1>
    
    <TodoForm onAddOrEdit={handleAddOrEdit} editingTodo={editingTodo} cancelEdit={cancelEdit} />
    
    <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
    
    <button onClick={generateSummary} disabled={loadingSummary} style={styles.summaryButton}>
      {loadingSummary ? 'Generating...' : '📩 Generate & Send Summary to Slack'}
    </button>

    {summaryMessage && (
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{summaryMessage}</pre>
    )}
  </div>
);

}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '32px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '600px',
  },
  button: {
    marginTop: '20px',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  summary: {
    backgroundColor: '#f0f4f8',
    padding: '16px',
    marginTop: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    fontSize: '14px',
  },
  summaryButton: {
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};



export default App;
