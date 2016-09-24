var CookieManager = require('react-native-cookies');
var Service = require('../service');

CookieManager.writeCookie = function(callback) {
  CookieManager.get(Service.host, (err, res) => {
    callback(res);
  });
};

module.exports = CookieManager;
