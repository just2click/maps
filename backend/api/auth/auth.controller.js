const authService = require('./auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.login(email, password);
    req.session.user = user;
    
    res.json(user);
  } catch (e) {
    res.status(401).send({ error: e });
  }
}

const signup = async (req, res) => {
  try {
    const { fullName, password, email, phone } = req.body;
    const account = await authService.signup(fullName, password, email, phone);
    const user = await authService.login(email, password);
    req.session.user = user;
    res.json(user);
  } catch (e) {
    res.status(500).send({ error: 'could not signup, please try later' });
  }
}

const logout = async (req, res) => {
  try {
    req.session.destroy();
    console.log('logged out successfully')
    res.send({ message: 'logged out successfully' });
  } catch (e) {
    res.status(500).send({ error: e });
  }
}

module.exports = {
  login,
  signup,
  logout,
};