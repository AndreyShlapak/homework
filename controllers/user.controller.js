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
    dropUserById: async (req, res) => {
        const {userId} = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);

        res.json(deletedUser).status(204);
    },
    createUser: async (req, res) => {
        const createdUser = await User.create(req.body);

        res.status(201).json(createdUser);
    },
    updateUser: async (req, res) => {
        const {userId} = req.params;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body);

        res.json(updatedUser).status(204);
    }
}