const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const users = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    if (users[username]) {
        return res.status(400).send('User already exists');
    }

    users[username] = { email, password };
    console.log('Users:', users);  
    res.status(201).send('User registered successfully');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username].password === password) {
        return res.send('Login successful');
    }

    res.status(400).send('Invalid username or password');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});