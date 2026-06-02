require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    const Port = process.env.PORT;
    console.log(`Server is running on Port ${Port}`);
});