const bcrypt = require('bcrypt');
const userService = require('../user/user.service');

const saltRounds = 10

const login = async (email, password) => {
    if (!email || !password)
        return Promise.reject('email and password are required!');
    const user = await userService.getByEmail(email);
    if (!user) 
        return Promise.reject('Invalid email or password');
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

const signup = async (fullName, password, email, phone)  => {
    if (!email || !password ) 
        return Promise.reject('email, username and password are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({fullName,password:hash,email,phone })
}

module.exports = {
    signup,
    login,
}