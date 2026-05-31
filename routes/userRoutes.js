const express = require('express');

const router = express.Router();

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;