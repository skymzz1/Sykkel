const fs = require('fs');

const userSchema = {
    id: Number,
    username: String,
    password: String,
    role: String // e.g., 'admin' or 'user'
};

class User {
    constructor(id, username, password, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    static getAllUsers() {
        const usersData = fs.readFileSync('data/users.json');
        return JSON.parse(usersData);
    }

    static addUser(newUser) {
        const users = User.getAllUsers();
        users.push(newUser);
        fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
    }

    static findUserById(id) {
        const users = User.getAllUsers();
        return users.find(user => user.id === id);
    }

    static findUserByUsername(username) {
        const users = User.getAllUsers();
        return users.find(user => user.username === username);
    }
}

module.exports = User;