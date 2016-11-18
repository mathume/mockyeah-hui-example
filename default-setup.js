/**
 * Created by sebastian on 18/11/16.
 */
var mockyeah = require('mockyeah');
var mockdata = require('./mock_data');

var init_mock = function () {
    mockyeah.get(mockdata.usersGet.pattern, mockdata.usersGet.ok);
    mockyeah.get(mockdata.userGet.pattern, mockdata.userGet.ok);
    mockyeah.post(mockdata.userPost.pattern, mockdata.userPost.ok);
};

init_mock();

exports.init_mock = init_mock;
exports.mockyeah = mockyeah;
exports.mockdata = mockdata;