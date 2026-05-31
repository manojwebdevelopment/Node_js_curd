const express = require('express');

const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World! Home Page');
})

app.post('/login', (req, res) => {
    res.send('Login Page');
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Update Page for ID: ${id}`);
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Delete Page for ID: ${id}`);
})

app.listen(3000, () => {
    const Port = 3000;
    console.log(`Server is running on Port ${Port}`);
});