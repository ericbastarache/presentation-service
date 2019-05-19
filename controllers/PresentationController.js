const Presentation = require('../models/Presentation');

exports.load_presentations = (req, res) => {
  // code to load presentations goes here
  res.send('Hello Presentations');
}

exports.load_presentation = (req, res) => {
  // code to load single presentation goes here
  res.send('Hello Presentation (singular)');
}

exports.create_presentation = (req, res) => {
  // code for creating presentations goes here
  res.send('Hello Create Presentation');
}

/**
 * After thinking about this more, this should also really go into it's own service
 * but it's going to live here for now for demonstration purposes
 */

exports.load_slides = (req, res) => {
  // code to load slides goes here
  res.send('Hello Load Slide');
}

exports.get_slide_by_id = (req, res) => {
  //code for getting slides by id goes here
  res.send('Hello slide by id');
}

exports.create_slide = (req, res) => {
  // code for creating a slide goes here
  res.send('hello create slide');
}

exports.update_slide = (req, res) => {
  // code for updating a slide goes here
  res.send('hello update slide');
}

exports.delete_slide = (req, res) => {
  // code for deleting a slide goes here
  res.send('hello delete slide');
};