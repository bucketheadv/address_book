import React from 'react';
var Dimensions = require('Dimensions');

import {
  PixelRatio
} from 'react-native';

var Util = {
  pixel: 1 / PixelRatio.get(),

  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  get: function(url, callback, errorCallback) {
    var fetchOptions = {
      method: 'GET'
    };
    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
    }).catch((err) => errorCallback(err));
  },

  post: function(url, data, callback, errorCallback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    var status = 200;
    fetch(url, fetchOptions)
    .then((response) => {
      status = response.status;
      return response.text();
    }).then((responseText) => {
      callback(status, JSON.parse(responseText));
    }).catch((err) => {
      if (errorCallback) errorCallback(err);
    });
  },

  put: function(url, data, callback, errorCallback) {
    var fetchOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    var status = 200;
    fetch(url, fetchOptions)
    .then((response) => {
      status = response.status;
      return response.text();
    }).then((responseText) => {
      callback(status, JSON.parse(responseText));
    }).catch((err) => {
      if (errorCallback) errorCallback(err);
    });
  },
  delete: function(url, data, callback, errorCallback) {
    var fetchOptions = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    var status = 200;
    fetch(url, fetchOptions)
    .then((response) => {
      status = response.status;
      return response.text();
    }).then((responseText) => {
      callback(status, JSON.parse(responseText));
    }).catch((err) => {
      if (errorCallback) errorCallback(err);
    });
  },
  key: 'ABCDEFG-REACT-NATIVE'
};

module.exports = Util;
