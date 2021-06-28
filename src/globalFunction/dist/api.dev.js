"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteData = exports.updateData = exports.addData = exports.getData = exports.getLocal = exports.saveLocal = exports.globalUrlBase = exports.globalUrl = void 0;
var globalUrl = 'https://haithamdev.com/api/';
exports.globalUrl = globalUrl;
var globalUrlBase = 'https://haithamdev.com';
exports.globalUrlBase = globalUrlBase;

var saveLocal = function saveLocal(itemName, data) {
  var jsonData = JSON.stringify(data);
  localStorage.setItem(itemName, jsonData);
  return true;
};

exports.saveLocal = saveLocal;

var getLocal = function getLocal(itemName) {
  var data = localStorage.getItem(itemName);
  var parsedData = JSON.parse(data);
  return parsedData;
};

exports.getLocal = getLocal;

var getData = function getData(name, callback) {
  fetch(globalUrl + name).then(function (resp) {
    return resp.json();
  }).then(function (jsonData) {
    return callback(jsonData);
  }).catch(function (err) {
    return console.log(err);
  });
};

exports.getData = getData;

var addData = function addData(name, data, callback) {
  var options = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  fetch(globalUrl + name, options).then(function (resp) {
    return resp.json();
  }).then(function (jsonData) {
    return callback(null, jsonData);
  }).catch(function (err) {
    return callback(err.message, null);
  });
};

exports.addData = addData;

var updateData = function updateData(name, data, callback) {
  var options = {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  fetch(globalUrl + name, options).then(function (resp) {
    return resp.json();
  }).then(function (jsonData) {
    return callback(null, jsonData);
  }).catch(function (err) {
    return callback(err.message, null);
  });
};

exports.updateData = updateData;

var deleteData = function deleteData(name, id, callback) {
  var options = {
    method: "delete",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([id])
  };
  fetch(globalUrl + name, options).then(function (resp) {
    return resp.json();
  }).then(function (jsonData) {
    return callback(null, jsonData);
  }).catch(function (err) {
    return callback(err.message, null);
  });
};

exports.deleteData = deleteData;