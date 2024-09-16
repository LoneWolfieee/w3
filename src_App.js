import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [merchandise, setMerchandise] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch events and merchandise from the backend
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data));

    fetch('/api/merchandise')
      .then(response => response.json())
      .then(data => setMerchandise(data));
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMerchandise = merchandise.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        <h1>College Festival 2023</h1>
        <nav>
          <button>Sign In</button>
          <button>Cart</button>
        </nav>
      </header>

      <input
        type="search"
        placeholder="Search events and merchandise..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="tabs">
        <button onClick={() => setActiveTab('events')} className={activeTab === 'events' ? 'active' : ''}>Events</button>
        <button onClick={() => setActiveTab('merchandise')} className={activeTab === 'merchandise' ? 'active' : ''}>Merchandise</button>
      </div>

      {activeTab === 'events' && (
        <div className="events">
          {filteredEvents.map(event => (
            <div key={event.id} className="card">
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>{event.date} at {event.time}</p>
              <p>{event.venue}</p>
              <button>Register</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'merchandise' && (
        <div className="merchandise">
          {filteredMerchandise.map(item => (
            <div key={item.id} className="card">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;