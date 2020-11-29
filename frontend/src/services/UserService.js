import HttpService from './HttpService';

const authEndpoint = 'auth';
const endpoint = 'user';

const login = (credentials) => {
  const user =  HttpService.post(`${authEndpoint}/login`, credentials);
  return _handleLogin(user);
}
const signup = (credentials) => {
  const user = HttpService.post(`${authEndpoint}/signup`, credentials);
  return _handleLogin(user);
}

const logout = () => {  
  HttpService.post(`${authEndpoint}/logout`);
  sessionStorage.clear();  
}

const _handleLogin = (user) => {
  sessionStorage.setItem(endpoint, JSON.stringify(user));
  
  return user;
}

const getById = (id) => {
  const user = HttpService.get(`${endpoint}/${id}`);
  return user;
}

const getUserLoggedIn = () => {
  return sessionStorage.getItem('user');
}

const checkConnection = () => {
  const currentUser = getUserLoggedIn();
  if (currentUser) {
    return true;
  }
  return false;
}

export default {
  login,
  signup,
  logout,
  getById,
  checkConnection,
  getUserLoggedIn,
};