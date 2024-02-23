const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
});

module.exports = mongoose.model("Tarea", tareaSchema);
