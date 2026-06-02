const express = require('express');

const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');

const {
    userLogin,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

router.post('/login', userLogin);
router.get('/', authMiddleware, getAllUsers);
router.post('/create', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;