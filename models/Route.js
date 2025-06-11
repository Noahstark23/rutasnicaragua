const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  horarios: [{ type: String }],
  paradas: [{ type: String }],
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
