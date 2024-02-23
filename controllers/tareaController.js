const Tarea = require("../models/tareaModel");

exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

exports.crearTarea = async (req, res) => {
  try {
    const nuevaTarea = await Tarea.create(req.body);
    res.json({ message: "Tarea creada correctamente", tarea: nuevaTarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const tareaId = req.params.id;
    const nuevaDataTarea = req.body;
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      tareaId,
      nuevaDataTarea,
      { new: true }
    );
    res.json({
      message: "Tarea actualizada correctamente",
      tarea: tareaActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const tareaId = req.params.id;
    await Tarea.findByIdAndDelete(tareaId);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
