const User = require('../DB/User.model');

module.exports = {
    showAllUsers: async (req, res, next) => {
        try {
            const { limit = 20, page = 1 } = req.query;
            const skip = (page - 1) * limit;

            const users = await User.find().limit(limit).skip(skip).lean();
            const count = await User.count({}).lean();

            res.render('users', {
                page,
                perPage: limit,
                data: users,
                count
            });
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = req.user || await User.findById(userId);

            res.json(user);

        } catch (e) {
            next(e);
        }
    },
    dropUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const deletedUser = await User.findByIdAndDelete(userId);

            res.json(deletedUser).status(204);

        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const createdUser = await User.create(req.body);

            res.status(201).json(createdUser);

        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const updatedUser = await User.findByIdAndUpdate(userId, req.body);

            res.json(updatedUser).status(204);

        } catch (e) {
            next(e);
        }
    }
}