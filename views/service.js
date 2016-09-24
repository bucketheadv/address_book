var host = 'http://localhost:3000';
var v1_paths = {
  regist: '/user/regist',
  login: '/user/login',
  loginByToken: '/user/login/token',
  users: '/users',
  messages: '/messages',
  user: '/user'
};
var v1_apis = {};
for(var i in v1_paths) {
  v1_apis[i] = host + "/api/v1" + v1_paths[i];
}
var Service = {
  v1: v1_apis,
  host: host
};

module.exports = Service;
