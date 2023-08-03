const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
} = require('../../controllers/thoughtController');


router.route('/').get(getUser).post(createUser);


router.route('/:userId').get(getSingleUser).delete(deleteUser);


router.route('/:userId/thoughts').post(addThought);


router.route('/:userId/thoughts/:thoughtsId').delete(removeThought);

module.exports = router;