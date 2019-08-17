const Presentation = require('../models/Presentation');
const ObjectId = require('mongoose').Types.ObjectId;

exports.load_presentations = (req, res) => {
  // code to load presentations goes here
  res.send('Hello Presentations');
}

exports.load_presentation = (req, res) => {
  // code to load single presentation goes here
  const { id } = req.params;
  Presentation.findById(id).then((presentation) => {
    if (presentation) {
      res.json();
    }
  }).catch((err) => {
    res.send({
      err,
      errData: 'Presentation not found'
    });
  })
}

exports.create_presentation = (req, res) => {
  const {
    title,
    slides
  } = req.body;
  Presentation.create({ title, slides, created_at: Date.now()}).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.json(err);
  })
}

exports.load_slides = (req, res) => {
  // code to load slides goes here
  const {
    id
  } = req.body;
  try {
    Presentation.find({ _id: new ObjectId(id) }, (err, presentation) => {
      if (!!presentation) {
        const [ slides ] = presentation;
        res.json({slides: slides});
      }
    })
  } catch (err) {
    if (err) {
      res.json(err);
    }
  }
}

exports.get_slide_by_id = (req, res) => {
  //code for getting slides by id goes here
  res.send('Hello slide by id');
}

exports.create_slide = (req, res) => {
  const {
    id,
    data
  } = req.body;
  // code for creating a slide goes here
  try {
    Presentation.find({_id: new ObjectId(id)}, (err, presentation) => {
      if (!!presentation) {
        const [id] = presentation;
        Presentation.updateOne({ "_id": id },
          {
            "$push" : { 
            "slides": { slide: JSON.stringify(data) },
          }}, (err, update) => {
            const [ slides ] = presentation;
            if (err) {
              res.send(err);
            } else {
              res.send({
                status: update,
                presentation: slides
              });
            }
          });
      }
    })
  } catch (err) {
    res.json(err);
  }
}

exports.update_slide = (req, res) => {
  const { slide } = req.params;
  if (!!slide && slide.id) {
    Presentation.findOne({ slides: slide.id }).then((foundSlides) => {
      if (foundSlides) {
        foundSlides.map((foundSlide) => {
          if (foundSlide === slide.id) {
            Presentation.update(foundSlide.id, {
              $set: {
                data: slide.data
              }
            });
          }
        });
      }
    }).catch((err) => {
      res.send({
        err,
        errData: "Could not update slide"
      });
    });
  }
}

exports.delete_slide = (req, res) => {
  // code for deleting a slide goes here
  res.send('hello delete slide');
};