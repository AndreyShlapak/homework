const User = require('../DB/User.model');

module.exports = {
    showAllUsers: async (req, res) => {
        const users = await User.find({}).lean();

        res.render('users', {users});
    },
    getUserById: async (req, res) => {
        const {userId} = req.params;
        const user = await User.findById(userId);

        res.json(user);
    },
    dropUserById: (req, res) => {
        const {userId} = req.params;

        User.findByIdAndDelete(userId)
            .then(user => {
                res.redirect('http://localhost:5000/users');
            });
    },
    createUser: (req, res) => {
        User.create(req.body)
            .then(createdUser => {
                res.status(201).json(createdUser);
            })
            .catch((err) => console.error(err));
    },
    updateUser: (req, res) => {
        const {userId} = req.params;

        User.findByIdAndUpdate(userId, req.body)
            .then((user) => {
                res.redirect('http://localhost:5000/users');
            });
    }
}