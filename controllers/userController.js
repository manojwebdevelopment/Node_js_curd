const  users = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.userLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const findUser = await users.findOne({email});

        if(!findUser){
            res.status(404).json({message: "Your are Not Registred User", success: false});
        }

        const isPasswordMatch = await bcrypt.compare(password, findUser.password);
        if(!isPasswordMatch){
            res.status(404).json({message: "Invalid Password", success: false});
        }

        const token = jwt.sign({id:findUser._id},process.env.JWT_SECRET, {expiresIn:'1d'});
        
        res.status(201).json({message:"Login Successfully", token, success:true});

    } catch(error) {
        res.status(404).json({message: "Error Login user", success: false});
    }
}

exports.profile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await users.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getAllUsers = async (req, res) =>{
    try {
        const usersList = await users.find();
        res.status(200).json({message: 'Users fetched successfully', users: usersList, success: true});
    } catch (error) {
        res.status(500).json({message: 'Error fetching users', success: false});
    }
};


exports.createUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: 'Please provide all required fields'});
        }

        const existingUser = await users.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new users({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({message: 'User created successfully', success: true});
        
    } catch (error) {
        res.status(500).json({message: 'Error creating user'});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await users.findByIdAndUpdate(id, req.body, { new: true });
        if(!user){
            return res.status(404).json({message:"User not found", success: false})
        }
        res.status(200).json({message:"User updated successfully", success: true});

    }
    catch(error){
        res.status(500).json({message:"Error updating user", success: false});
    }
}

exports.deleteUser = async (req, res) =>{
    try {
        const {id} = req.params;
        const user = await users.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.json({message: 'User deleted successfully'});
    }
    catch (error) {
        res.status(500).json({message: 'Error deleting user'});
    }
};



