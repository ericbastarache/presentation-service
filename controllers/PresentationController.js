const Presentation = require('../models/Presentation');
const ObjectId = require('mongoose').Types.ObjectId;

exports.load_temp_presentations = (req, res) => {
  const { userID } = req.body;
  try {
    Presentation.find({ userID }, (err, presentations) => {
      if (presentations) {
        if (err) {
          res.json({
            error: err
          })
        } else {
          res.json(presentations);
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
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
    userID,
    slides
  } = req.body;
  Presentation.create({ title, userID, slides, created_at: Date.now()}).then((result) => {
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
    data,
    thumbnail,
    canvasDimensions
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
              "slides": {data: JSON.stringify(data), thumbnail, canvasDimensions},
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
  const { presentation, data, canvasDimensions } = req.body;
  if (!!id && !!presentation && !!data) {
    try {
      Presentation.findById(presentation, function (error, result) {
        if (error) console.log(error);
        result.slides.id(id).data = JSON.stringify(data);
        result.slides.id(id).canvasDimensions = canvasDimensions
        result.save();
    });
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