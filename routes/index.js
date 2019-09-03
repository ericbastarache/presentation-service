const express = require('express');
const PresentationController = require('../controllers/PresentationController');
const router = express.Router();


router.get('/presentations/:id', PresentationController.load_presentations);
router.post('/presentations/create', PresentationController.create_presentation);
router.get('/slides', PresentationController.load_slides);
router.get('/slides/:id', PresentationController.get_slide_by_id);
router.post('/slides/create', PresentationController.create_slide);
router.put('/slides/update/:id', PresentationController.update_slide);
router.delete('/slides/delete/:id', PresentationController.delete_slide);
router.post('/last_slide', PresentationController.get_last_slide);

router.post('/presentations/load_temp_presentations', PresentationController.load_temp_presentations);
router.post('/presentations/save_temp_presentations', PresentationController.save_temp_presentations)

module.exports = router;