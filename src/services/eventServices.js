const { Event, DonorLocation } = require("../../models");
const { uploadFile } = require("../middlewares/uploadFile");
const { addDonorLocation } = require("./locationServices");

const getAllEvents = async () => {
  const events = await Event.findAll();
  return events;
};

const getEventById = async (eventId) => {
  const event = await Event.findByPk(eventId);
  if (!event) {
    throw Error("Event Not Found");
  }
  return event;
};

const addEvent = async (newEventData, file) => {
  const pathName = "image/donorLocation";
  const { publicUrl } = await uploadFile(file, pathName);
  const image = publicUrl;
  const status = 1;
  const event = await Event.create({
    ...newEventData,
    image,
    status,
  });
  const donorLocation = await DonorLocation.create({
    ...newEventData, 
    status,
    image
  });
  return event;
};

const editEvent = async (eventId, eventData, status) => {
  const event = await Event.update(
    { eventData, status: status },
    {
      where: {
        id: eventId,
      },
    }
  );
  // const event = await Event.update(eventData , {
  //   where: {
  //     id: eventId,
  //   }
  // });
  if (!event) {
    throw Error("Failed Update");
  }
  const updated = getEventById(eventId);
  return updated;
};

const deleteEventById = async (eventId) => {
  await getEventById(eventId);
  const event = await News.destroy({
    where: {
      id: eventId,
    },
  });
  if (!event) {
    throw Error("Failed Delete");
  }
  return event;
};

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEventById,
};
