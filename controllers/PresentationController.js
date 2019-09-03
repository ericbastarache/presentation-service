const Presentation = require('../models/Presentation');
const ObjectId = require('mongoose').Types.ObjectId;
const helper = require('../helpers');
const { INITIAL_SLIDE } = require('../constants/canvas_starter')


exports.load_temp_presentations = async (req, res) => {
  const { token } = req.body;
  if (token) {
    const result = await helper.verifyToken(token)
    if (result.valid) {
      try {
        Presentation.find({ userID: token }, (err, presentations) => {
          //if presentations exist
          if (presentations.length > 0) {
            if (err) {
              res.json({
                error: err
              })
            } else {
              res.json(presentations);
            }
            //if presentations do not exist
          } else {
            Presentation.create({ title: 'Title', userID: token, slides: INITIAL_SLIDE, created_at: Date.now()}).then((presentations) => {
              res.json([presentations]);
            }).catch((err) => {
              res.json({
                error: err
              });
            })
          }
        })
      } catch (err) {
        res.json({
          error: err
        })
      }
    } else {
      res.json({
        error: 'Invalid token'
      })
    }
  }
}

exports.save_temp_presentations = async (req, res) => {
  const { tempUserToken, token } = req.body
  if (!!tempUserToken && !!token) {
    const resultOne = await helper.verifyToken(tempUserToken)
    const resultTwo = await helper.verifyToken(token)

    if (resultOne.valid && resultTwo.valid) {
      try {
        const result = await helper.verifyToken(token)
        if (result.valid) {
          Presentation.updateMany({userID: tempUserToken}, {$set: {userID: token}}).then(resp => res.json({status: 200}))
        }
      }
      catch (err) {
        res.json({
          error: err
        });
      }
    } else {
      res.json({
        error: 'Invalid token provided'
      })
    }
  }
}

exports.load_presentations = async (req, res) => {
  // code to load single presentation goes here
  const { token } = req.params;
  if (!!token) {
    const result = await helper.verifyToken(token)
    if (result.valid) {
      Presentations.find({userID: token}).then((presentations) => {
        if (presentation) {
          res.json(presentations);
        }
      }).catch((err) => {
        res.json({
          err,
          errData: 'Presentations not found'
        });
      })
    } else {
      res.json({error: 'Invalid token provided'})
    }
  } else {
    res.json({
      error: 'No token provided'
    })
  }
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

exports.update_slide = async (req, res) => {
  const { id } = req.params;
  const { token, presentation, data, canvasDimensions } = req.body;
  if (!!id && !!presentation && !!data && !!token) {
    const result = await helper.verifyToken(token)
      if (result.valid) {
        try {
          Presentation.findById(presentation, function (error, result) {
            if (error) console.log(error);
            result.slides.id(id).data = JSON.stringify(data);
            result.slides.id(id).canvasDimensions = canvasDimensions
            result.save();
            res.json({
              status: 200
            });
        });
        } catch (err) {
          res.json({
            error: err
          });
        }
      } else {
        res.json({error: 'Invalid token'})
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