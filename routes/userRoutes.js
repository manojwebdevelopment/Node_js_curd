const express = require('express');

const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');

const {
    userLogin,
    profile,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

router.post('/login', userLogin);
router.get('/profile', authMiddleware, profile);
router.get('/', getAllUsers);
router.post('/create', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;