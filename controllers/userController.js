const users = require('../model/userModel');

exports.getAllUsers = (req, res) =>{
    res.json(users);
};

exports.createUser = (req, res) => {
    const newUser = {
        id: users.lenght + 1,
        name: req.body.name,
        email: req.body.email,
    }
    users.push(newUser);

    res.status(201).json(newUser, {message: 'User created successfully'});
};

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);

    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    const {name, email} = req.body;

    user.name = name;
    user.email = email;

    res.json({message: 'User updated successfully'}, user);

};

exports.deleteUser = (req, res) => {
    const id =parseInt(req.params.id);
    const user=users.findIndex(user =>user.id ===id);

    if(user === -1) {
        return res.status(404).json({message: 'User not found'});
    }
    users.splice(user, 1);
    res.json({message: 'User deleted successfully'});
}

