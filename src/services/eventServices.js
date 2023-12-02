const { Event } = require("../../models");
const getAllEvents = async () => {
  const events = await Event.findAll();
  return events;
}

const getEventById = async (eventId)  =>{
  const event = await Event.findByPk(eventId);
  if (!event) {
    throw Error("Event Not Found")
  }
  return event;
}

const addEvent = async (newEventData) => {
  const event = await Event.create(newEventData);
  return event;
}

const editEvent = async (eventId, eventData) => {
  const event = await Event.update(eventData, {
    where: {
      id: eventId,
    }
  });
  if (!event) {
    throw Error('Failed Update')
  }
  const updated = getEventById(eventId);
  return updated;
}

const deleteEventById = async (eventId) => {
  await getEventById(eventId);
  const event = await News.destroy({
    where: {
      id: eventId
    }
  });
  if (!event) {
    throw Error('Failed Delete')
  }
  return event;
} 

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEventById
}