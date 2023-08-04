const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
  
  } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought).delete(deleteThought);

router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  router.route('/:thoughtId/reactions').post(addReaction);
  
  router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;