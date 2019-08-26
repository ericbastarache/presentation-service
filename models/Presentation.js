const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PresentationSchema = new Schema({
  title: String,
  userID: String,
  slides: [
    { data: Object, canvasDimensions: { height: Number, width: Number} }
  ],
  created_at: Date,
});

const PresentationModel = mongoose.model('Presentation', PresentationSchema);

module.exports = PresentationModel;