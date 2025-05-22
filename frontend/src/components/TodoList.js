import React from 'react';
import axios from 'axios';

export default function TodoList({ todos, onDelete }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    onDelete(id);
  };

  return (
    <ul style={styles.list}>
      {todos.map(todo => (
        <li key={todo.id} style={styles.item}>
          <span>{todo.text}</span>
          <button onClick={() => handleDelete(todo.id)} style={styles.deleteButton}>
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    background: '#f8f9fa',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};
