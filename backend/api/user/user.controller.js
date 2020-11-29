const userService = require('./user.service')

const getUser = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        res.send(user);
    }
    catch(e) {
        console.error(e);
    }
}
  
const getUsers = async (req, res) => {
    try {
        const users = await userService.query(req.query);
        res.send(users);
    }
    catch(e) {
        console.error(e);
    }
}

const deleteUser = async (req, res) => {
    try {
        await userService.remove(req.params.id);
        res.end();
    }
    catch(e) {
        console.error(e);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.body;
        await userService.update(user);
        res.send(user);
    }
    catch(e) {
        console.error(e);
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}