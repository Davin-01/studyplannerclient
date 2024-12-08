import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Event {
  id: number;
  title: string;
  time: string; // Event time in ISO format
}

const EventPlanner: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ title: "", time: "" });
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  console.log(Cookies.get("access_token"));
  

  // Load saved events from the backend on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events/", 
          {
            headers: {
              "Authorization": `Bearer ${Cookies.get("access_token")}`
            },
            withCredentials: true
          }
        );
        // Format event times for `datetime-local` input
        setEvents(
          response.data.map((event: Event) => ({
            ...event,
            time: event.time.slice(0, 16),
          }))
        );
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Set reminders for events
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16); // Match `datetime-local` format
      events.forEach((event) => {
        if (event.time.slice(0, 16) === now) {
          notifyUser(event);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [events]);

  // Notification API function
  const notifyUser = (event: Event) => {
    if (Notification.permission === "granted") {
      new Notification(`Reminder: ${event.title}`, {
        body: `It's time for your ${event.title}!`,
      });
    } else {
      alert(`Reminder: ${event.title}`);
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.time) {
      try {
        const response = await axios.post("http://localhost:8000/api/events/", newEvent,
          {
            headers: {
              "Authorization": `Bearer ${Cookies.get("access_token")}`
            },
            withCredentials: true
        });
        setEvents([...events, response.data]); // Add the new event to the list
        setNewEvent({ title: "", time: "" }); // Clear input fields
      } catch (error) {
        console.error("Error adding event:", error);
        alert("Could not add the event. Please try again.");
      }
    } //else {
      //alert("Please fill in both the title and time for the event.");
    //}
  };

  const handleEditEvent = async () => {
    if (editingEvent) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/events/${editingEvent.id}`,
          editingEvent,
          {
            headers: {
              "Authorization": `Bearer ${Cookies.get("access_token")}`
            },
            withCredentials: true
          }
        );
        setEvents(
          events.map((event) =>
            event.id === response.data.id ? response.data : event
          )
        );
        setEditingEvent(null); // Exit edit mode
      } catch (error) {
        console.error("Error editing event:", error);
        alert("Could not edit the event. Please try again.");
      }
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/events/${id}`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("access_token")}`
        },
        withCredentials: true
      });
      setEvents(events.filter((event) => event.id !== id)); // Remove event from state
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Could not delete the event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-400 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Event Planner</h1>

      {/* Add Event Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Event Title"
            className="border rounded p-2"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            type="datetime-local"
            className="border rounded p-2"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Events</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) =>
              editingEvent?.id === event.id ? (
                <tr key={event.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={editingEvent.title}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, title: e.target.value })
                      }
                      className="border rounded p-2 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="datetime-local"
                      value={editingEvent.time}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, time: e.target.value })
                      }
                      className="border rounded p-2 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                      onClick={handleEditEvent}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => setEditingEvent(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={event.id}>
                  <td className="border border-gray-300 px-4 py-2">{event.title}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(event.time).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => setEditingEvent(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventPlanner;
