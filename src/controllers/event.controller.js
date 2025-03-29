import Event from "../models/event.model.js";
import { deleteImage } from "../libs/cloudinary.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const { title, description, location, date, images, isActive } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      location,
      date,
      images,
      isActive,
    });

    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Eliminar imágenes de Cloudinary en paralelo
    const deletePromises = event.images.map(img => 
      deleteImage(img.public_id)
        .then(() => console.log(`Imagen ${img.public_id} eliminada`))
        .catch(error => {
          console.error(`Error eliminando imagen ${img.public_id}:`, error);
          // Continuar aunque falle una imagen
        })
    );

    // Esperar que todas las eliminaciones terminen (éxito o error)
    await Promise.all(deletePromises);

    // Eliminar el evento de MongoDB
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    
    res.json({
      message: "Evento e imágenes eliminados",
      event: deletedEvent
    });

  } catch (error) {
    console.error("Error en deleteEvent:", error);
    res.status(500).json({ 
      message: "Error al eliminar el evento",
      error: error.message 
    });
  }
};

export const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  try {
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const upadatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(upadatedEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOneImage = async (req, res) => {
  const { img: public_id } = req.params;

  try {
    if (!public_id) {
      return res
        .status(400)
        .json({ message: "Falta el public_id de la imagen" });
    }

    await deleteImage(public_id);

    await Event.updateMany(
      { "images.public_id": public_id },
      { $pull: { images: { public_id: public_id } } }
    );

    return res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    console.error("Error al procesar la eliminación de la imagen:", error);
    return res.status(500).json({ message: "Error al eliminar la imagen" });
  }
};
