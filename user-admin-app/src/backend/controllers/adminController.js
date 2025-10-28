const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../../data/users.json');

// Function to add a new user
exports.addUser = (req, res) => {
    const newUser = req.body;

    // Read existing users
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading users data' });
        }

        const users = JSON.parse(data);
        users.push(newUser);

        // Write updated users back to the file
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user data' });
            }
            res.status(201).json({ message: 'User added successfully', user: newUser });
        });
    });
};

// Function to get all users
exports.getUsers = (req, res) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading users data' });
        }

        const users = JSON.parse(data);
        res.status(200).json(users);
    });
};