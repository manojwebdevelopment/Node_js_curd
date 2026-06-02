const express = require('express');

const router = express.Router();

const {
    userLogin,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

router.post('/login', userLogin);
router.get('/', getAllUsers);
router.post('/create', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;