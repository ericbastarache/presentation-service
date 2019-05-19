const express = require('express');
const PresentationController = require('../controllers/PresentationController');
const router = express.Router();


router.get('/presentations', PresentationController.load_presentations);
router.get('/presentations/:id', PresentationController.load_presentation);
router.get('/slides', PresentationController.load_slides);
router.get('/slides/:id', PresentationController.get_slide_by_id);
router.post('/slides/create', PresentationController.create_slide);
router.put('/slides/update', PresentationController.update_slide);
router.post('/slides/delete', PresentationController.delete_slide);

module.exports = router;