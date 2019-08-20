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
    res.json({
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
    res.json({
      presentation: result
    });
  }).catch((err) => {
    res.json({
      error: err
    });
  })
}

exports.load_slides = (req, res) => {
  const {
    id
  } = req.body;
  try {
    Presentation.find({ _id: new ObjectId(id) }, (err, presentation) => {
      if (!!presentation) {
        const [ { slides } ] = presentation;
        res.json({ slides: slides });
      }
    })
  } catch (err) {
    if (err) {
      res.json({
        error: err
      });
    }
  }
}

exports.get_slide_by_id = (req, res) => {
  const {
    id
  } = req.params;
  const {
    presentationId
  } = req.body;
  try {
    Presentation.find({ _id: new ObjectId(presentationId) }, (err, presentation) => {
      if (presentation) {
        const [ { slides } ] = presentation;
        if (err) {
          res.json({
            error: err
          })
        } else {
          const foundSlide = slides
            .map(slide => slide)
            .filter(foundSlide => foundSlide._id == id);
          
          res.json({
            slides: foundSlide
          });
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}

exports.get_last_slide = (req, res) => {
  const {
    id
  } = req.body;
  try {
    Presentation.find({_id: new ObjectId(id)}, (err, presentation) => {
      if (presentation) {
        const [{ slides }] = presentation;
        if (err) {
          res.json({
            error: err
          })
        } else {
          res.json({
            slide: slides[slides.length - 1]
          });
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}

exports.create_slide = (req, res) => {
  const {
    id,
    data
  } = req.body;
  try {
    Presentation.find({_id: new ObjectId(id)}, (err, presentation) => {
      if (err) {
        res.json({
          error: err
        })
      } else {
        if (!!presentation) {
          const [id] = presentation;
          Presentation.updateOne({ "_id": id },
            {
              "$push" : { 
              "slides": { slide: JSON.stringify(data) },
            }}, (err, update) => {
              if (err) {
                res.json({
                  error: err
                });
              } else {
                res.json(update);
              }
            });
        }
      }
    })
  } catch (err) {
    res.json(err);
  }
}

exports.update_slide = (req, res) => {
  const { id } = req.params;
  const { presentation, data } = req.body;
  if (!!id && !!presentation && !!data) {
    try {
      Presentation.findOneAndUpdate({ _id: new ObjectId(presentation), "slides._id": id }, 
      {
        $set: {
          "slides.$.slide": JSON.stringify(data)
        }
      }, { upsert: true }, (err, doc) => {
        if (err) {
          res.json({
            error: err
          });
        } else {
          res.json(doc)
        }
      })
    } catch (err) {
      res.json({
        error: err
      });
    }
  }
}

exports.delete_slide = (req, res) => {
  const {
    id
  } = req.params;
  const {
    presentation
  } = req.body

  try {
    Presentation.findByIdAndUpdate({_id: new ObjectId(presentation)}, {
      '$pull': {
        "slides": {
          '_id': new ObjectId(id)
        }
      }
    }, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      } else {
        res.json({
          status: "200 OK"
        });
      }
    })
  } catch (err) {
    res.json({
      error: err
    });
  }

  Presentation.findOneAndDelete({"slides._id": id },
  {
    "$pull": {
      "slides": {
        _id: id
      }
    }
  }, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      res.json(doc);
    }
  })
};