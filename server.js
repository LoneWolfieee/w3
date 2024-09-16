const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Sample data (replace with database in production)
const events = [
  { id: 1, name: 'Music Concert', description: 'Live performances by local bands', date: '2023-09-15', time: '19:00', venue: 'Main Auditorium' },
  { id: 2, name: 'Hackathon', description: '24-hour coding competition', date: '2023-09-16', time: '09:00', venue: 'Computer Science Building' },
  { id: 3, name: 'Art Exhibition', description: 'Showcase of student artwork', date: '2023-09-17', time: '10:00', venue: 'Art Gallery' },
];

const merchandise = [
  { id: 1, name: 'Festival T-Shirt', description: 'Comfortable cotton t-shirt with festival logo', price: 20 },
  { id: 2, name: 'Festival Cap', description: 'Adjustable cap with embroidered festival logo', price: 15 },
  { id: 3, name: 'Festival Mug', description: 'Ceramic mug with festival design', price: 10 },
];

// API routes
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.get('/api/merchandise', (req, res) => {
  res.json(merchandise);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});