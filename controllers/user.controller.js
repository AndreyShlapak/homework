const users = require('../DB/users.json');
const write = require('../services/jsonChange');
const {UserPathDB} = require('../config/config');

module.exports = {
    showAllUsers: (req, res) => {
        res.render('users', {users});
    },
    getUserById: (req, res) => {
        const {userId} = req.params

        for (const currentUser of users) {
            if (currentUser.id == userId) {
                res.json(currentUser);
            }
        }
    },
    dropUserById: (req, res) => {
        const {userId} = req.params;
        const newUsers = [];

        for (const currentUserIndex in users) {
            if (users[currentUserIndex].id === userId) {
                delete users[currentUserIndex];
                continue;
            }
            newUsers.push(users[currentUserIndex]);
        }
        write(UserPathDB, newUsers);

        res.redirect('http://localhost:5000/');
    },
    createUser: (req, res) => {
        users.push(req.body);

        write(UserPathDB, users);

        res.redirect('http://localhost:5000/');
    },
    updateUser: (req, res) => {
        const {userId} = req.params;

        for (const currentUserIndex in users) {
            const currentUser = users[currentUserIndex];

            if (currentUser.id == userId) {
                currentUser.name = req.body.name;
            }
        }
        write(UserPathDB, users);

        res.redirect('http://localhost:5000/');
    }
}