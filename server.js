const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = './data.json';

app.use(cors());
app.use(express.json());

// Helper: read data
function readData() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

// Helper: write data
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Root route — confirms API is alive
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' });
});

// ============================================================
// GET — Read all tasks
// ============================================================
app.get('/api/tasks', (req, res) => {
  try {
    const data = readData();
    res.json(data.tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load tasks' });
  }
});

// GET — Read all categories (Feature #19)
app.get('/api/categories', (req, res) => {
  try {
    const data = readData();
    res.json(data.categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

// ============================================================
// POST — Create a new task (Feature #1)
// ============================================================
app.post('/api/tasks', (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const data = readData();
    const newTask = {
      id: Date.now(),
      title,
      category: category || 'Personal',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    data.tasks.push(newTask);
    writeData(data);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// ============================================================
// PUT — Toggle complete — MUST be before /api/tasks/:id (Feature #3)
// ============================================================
app.put('/api/tasks/:id/toggle', (req, res) => {
  try {
    const data = readData();
    const task = data.tasks.find((t) => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.completed = !task.completed;
    writeData(data);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle task' });
  }
});

// PUT — Fully update a task (Feature #9)
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { title, category, completed } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const data = readData();
    const index = data.tasks.findIndex((t) => t.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    data.tasks[index] = {
      id: Number(req.params.id),
      title,
      category: category || 'Personal',
      completed: completed ?? data.tasks[index].completed,
      createdAt: data.tasks[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    writeData(data);
    res.json(data.tasks[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// ============================================================
// DELETE — Remove a task (Feature #2)
// ============================================================
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const data = readData();
    const index = data.tasks.findIndex((t) => t.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    data.tasks.splice(index, 1);
    writeData(data);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));