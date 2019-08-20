const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PresentationSchema = new Schema({
  title: String,
  slides: [
    { data: Object, thumbnail: Object }
  ],
  created_at: Date,
});

const PresentationModel = mongoose.model('Presentation', PresentationSchema);

module.exports = PresentationModel;