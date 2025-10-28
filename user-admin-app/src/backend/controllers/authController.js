const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const usersDataPath = path.join(__dirname, '../../data/users.json');

// Load users from JSON file
const loadUsers = () => {
    const data = fs.readFileSync(usersDataPath);
    return JSON.parse(data);
};

// Save users to JSON file
const saveUsers = (users) => {
    fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));
};

// Handle user login
exports.login = (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users.find(user => user.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
};

// Handle user logout
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};