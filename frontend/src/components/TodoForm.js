import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TodoForm({ onAddOrEdit, editingTodo, cancelEdit }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingTodo) setText(editingTodo.text);
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingTodo) {
      const res = await axios.put(`http://localhost:5000/todos/${editingTodo.id}`, { text });
      onAddOrEdit(res.data);
    } else {
      const res = await axios.post('http://localhost:5000/todos', { text });
      onAddOrEdit(res.data);
    }

    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter todo"
        style={styles.input}
      />
      <div style={styles.buttonGroup}>
        <button type="submit" style={styles.submitButton}>
          {editingTodo ? '✅ Update' : '➕ Add'}
        </button>
        {editingTodo && (
          <button type="button" onClick={cancelEdit} style={styles.cancelButton}>
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  submitButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  cancelButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
