/**
 * Created by sebastian on 18/11/16.
 */
var rp = require('request-promise');
var config = require('./front-config.json');
exports.usersPage = function (mockyeah) {
    var self = this;
    var url = config.url;
    var message;
    var userList;
    var currentUserDetail;
    var currentUsername;
    var currentEmail;
    this.clear = function () {
        this.message = null;
        this.currentUserDetail = null;
        this.currentEmail = null;
        this.currentUsername = null;

    }
    this.navigateToUsersView = function () {
        return rp({
                uri: url + '/users',
                json: true
            }).then(function (result) {
                self.userList = result.map(function (user) {
                    return {id: user.id, username: user.username}
                });
                self.message = "SUCCESS";
            }).catch(function (err) {
                self.userList = [];
                self.message = err.error.errorCode;
            });
    };

    this.getUserList = function () {
        return self.userList;
    };

    this.enterNewUserDetails = function (username, email) {
        self.currentUsername = username;
        self.currentEmail = email;
    };

    this.confirm = function () {
        return rp({
                uri: url + "/users",
                method: "POST",
                body: {
                    username: self.currentUsername,
                    email: self.currentEmail
                },
                json: true
            }).then(function (result) {
                self.currentUserDetail = result;
                self.message = "SUCCESS";
            }).catch(function (err) {
                self.currentUserDetail = {};
                self.message = err.error.errorCode;
            });
    };

    this.selectUser = function (position) {
        return rp({
                uri: url + '/users/' + this.usersList[position].id,
                json: true
            }).then(function (result) {
                this.currentUserDetail = result;
                this.message = "SUCCESS";
            }).catch(function (err) {
                this.message = err.error.errorCode;
            });
    };

    this.getMessage = function () {
        return self.message;
    };

    this.getCurrentUser = function () {
        return self.currentUserDetail;
    };
};