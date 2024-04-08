// App.js

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', isCompleted: false, assignee: '' });

  // Function to fetch all tasks from the server
  const getAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to add a new task
  const addTask = async () => {
    try {
      await axios.post('http://localhost:3001/todos', newTask);
      getAllTasks(); // Fetch all tasks again to update the list
      setNewTask({ title: '', isCompleted: false, assignee: '' }); // Reset form
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Function to update an existing task
  const updateTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`http://localhost:3001/todos/${taskId}`, updatedTask);
      getAllTasks(); // Fetch all tasks again to update the list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${taskId}`);
      getAllTasks(); // Fetch all tasks again to update the list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {/* Form to add new task */}
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Assignee"
        value={newTask.assignee}
        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
      />
      <button onClick={addTask}>Add Task</button>

      {/* Button to get all tasks */}
      <button onClick={getAllTasks}>Get All Tasks</button>

      {/* Display all tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.assignee} - {task.isCompleted ? 'Completed' : 'Incomplete'}
            <button onClick={() => updateTask(task.id, { ...task, isCompleted: !task.isCompleted })}>
              {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
