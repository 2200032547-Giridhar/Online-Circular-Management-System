const Event = require('../models/Event');

// Create event (Admin or Faculty)
const createEvent = async (req, res) => {
  try {
    const { title, description, department, eventDate, status } = req.body;

    if (!title || !department || !eventDate) {
      return res.status(400).json({ message: 'Title, department, and eventDate are required.' });
    }

    const event = new Event({
      title,
      description,
      department,
      eventDate,
      status: status || 'upcoming',
      createdBy: req.user.id,
    });

    await event.save();

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get events created by authenticated user (admin/faculty)
const getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ createdBy: userId }).populate('createdBy', 'name email role');
    res.json(events);
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all events with optional filters (all roles)
const getEvents = async (req, res) => {
  try {
    const { department, status, date } = req.query;
    let filter = {};

    if (department) filter.department = department;
    if (status) filter.status = status;

    if (date) {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      filter.eventDate = { $gte: dayStart, $lte: dayEnd };
    }

    const events = await Event.find(filter).populate('createdBy', 'name email role');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email role');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Ownership/role check - allow admin or event creator only
    if (req.user.role !== 'admin' && event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own events.' });
    }

    const { title, description, department, eventDate, status } = req.body;

    if (title) event.title = title;
    if (description) event.description = description;
    if (department) event.department = department;
    if (eventDate) event.eventDate = eventDate;
    if (status) event.status = status;

    await event.save();

    res.json({ message: 'Event updated successfully', event });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event by ID (Admin or Faculty)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createEvent,
  getUserEvents,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
