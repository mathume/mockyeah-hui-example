/**
 * Created by sebastian on 18/11/16.
 */
var usersGet = {
    pattern: /users$/,
    ok: {
        status: 200,
        json: [
            {
                id: 1,
                username: 'user1',
                email: 'user1@email.com'
            },
            {
                id: 2,
                username: 'user2',
                email: 'user2@email.com'
            }
            ,
            {
                id: 3,
                username: 'user3',
                email: 'user3@email.com'
            }
        ]
    },
    ko: {
        status: 500,
        json: {errorCode: "UnexpectedException"}
    }
};
var userGet = {
    pattern: /users\/[0-9]+/,
    ok: {
        status: 200,
        json: {
            id: 1,
            username: 'user1',
            email: 'user1@email.com'
        }
    },
    ko: {
        status: 500,
        json: {errorCode: "UnexpectedException"}
    }
};
var userPost = {
    pattern: /users$/,
    ok: {
        status: 200,
        json: {
            id: 1,
            username: 'user1',
            email: 'user1@email.com'
        }
    },
    ko: {
    status: 422,
        json: {errorCode: "missing required field 'username'" }
    }
};

exports.userGet = userGet;
exports.usersGet = usersGet;
exports.userPost = userPost;