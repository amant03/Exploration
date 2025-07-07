import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  const fetchTodos = async () => {
    const response = await axios.get(`${API_URL}/api/todos`);
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (task.trim() === "") return;
    await axios.post(`${API_URL}/api/todos`, { task, completed: false });
    setTask("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API_URL}/api/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/api/todos/${id}`);
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingTask(todo.task);
  };

  const saveEdit = async (todo) => {
    if (editingTask.trim() === "") return;
    await axios.put(`${API_URL}/api/todos/${todo.id}`, {
      ...todo,
      task: editingTask,
    });
    setEditingId(null);
    setEditingTask("");
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>📝 TODO List</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="card-container">
        {todos.map((todo) => (
          <div key={todo.id} className={`card ${todo.completed ? "completed" : ""}`}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTask}
                  onChange={(e) => setEditingTask(e.target.value)}
                />
                <button onClick={() => saveEdit(todo)}>💾 Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTodo(todo)}>{todo.task}</span>
                <div className="card-actions">
                  <button onClick={() => startEdit(todo)}>✏️ Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>❌ Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
