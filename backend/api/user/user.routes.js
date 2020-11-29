const express = require('express');
const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { getUser, getUsers, deleteUser, updateUser} = require('./user.controller');
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id',  requireAuth, updateUser); // only after login there is option to update a user.
router.delete('/:id',  requireAuth, deleteUser); // only after login there is option to delete auser.

module.exports = router;