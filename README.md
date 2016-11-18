Sample implementation of mocking backend for rapid frontend development in JavaScript of implementation of [Hermetic User Interface (HUI) tests](https://testing.googleblog.com/2015/03/android-ui-automated-testing.html) with [mockyeah](https://github.com/ryanricard/mockyeah).

# Rapid Frontend Development with JavaScript and HUI tests

## Rapid frontend development

In order to be independent from a real backend instance during frontend development we'll organize our expected responses and add them to a default setup.
We'll then configure your frontend to point to the mockyeah instance, run `node default-setup.js`, run your project and develop!

### Organizing the mock data

Organizing our mock data we'll have later easy access in your test definitions:

```
// mock-data.js
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
```

### Define a default setup

```
//default-setup.js

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
```

## Hermetic User Interface (HUI) testing

Frontend by itself is a subsystem of your application. HUI tests strive to have more stable and maintainable tests by mocking out any dependency to a service.
This means you would normally implement system level tests with [Selenium WebDriver](https://github.com/SeleniumHQ/selenium) or [Protractor](http://www.protractortest.org/#/).

### Starting mockyeah for testing

As `mockyeah` is automatically started as configured in `.mockyeah` when required, your test suite must simply import your default setup as defined above.

```
var setup = require('./../default-setup');

describe('Handle users', function () {
    describe('Users view', function () {
        beforeAll(setup.init_mock);
        afterAll(setup.mockyeah.close);

```

### Changing mockyeah behaviour during test definition

Simply set the response in the test definition itself. Notice that we re-use the mockyeah exported by the default setup.

```
describe('Handle users', function () {
    describe('Users view', function () {
        // ...
        
        it('should load the users list', function () {
            return usersPage.navigateToUsersView().then(function () {
                expect(usersPage.getUserList()).toContain({id: 1, username: 'user1'});
                expect(usersPage.getMessage()).toEqual("SUCCESS");
            });
        });

        it('should show the error code if list cannot be loaded', function () {
            setup.mockyeah.get(setup.mockdata.usersGet.pattern, setup.mockdata.usersGet.ko);
            return usersPage.navigateToUsersView().then(function () {
                expect(usersPage.getMessage()).toEqual("UnexpectedException");
            });
        });


```

### Request verification

During test development we'll want to inspect the received requests when something doesn't come out as expected. We can do this by setting

```
{
    journal: true
}
```

and

TODO: missing code sample

```

```

If our application code composes a complex request from several sources sometime we find it useful to verify the sent request:

```
it('should send the correct request', function() {
    return usersPage.navigateToUsersView().then(function () {
        usersPage.enterNewUserDetails("user1", "user1@email.com");
        var expectation = setup.mockyeah.post(setup.mockdata.userPost.pattern, setup.mockdata.userPost.ok)
            .expect()
            .body({
                username: 'user1',
                email: 'user1@email.com'
            })
            .once();
        return usersPage.confirm().then(function () {
            expectation.verify();
        });
    });
});

```

## Logging

The standard configuration of mockyeah will write a standard request log which is very helpful during test development.

```
[21:59:59] I/local - Selenium standalone server started at http://192.168.0.155:48608/wd/hub
Spec started
[mockyeah][SERVE] Listening at http://127.0.0.1:4001
[mockyeah][REQUEST][GET] /users (2ms)

  Handle users

    Users view
      ✓ should load the users list
[mockyeah][REQUEST][GET] /users (1ms)
      ✓ should show the error code if list cannot be loaded
[mockyeah][REQUEST][GET] /users (1ms)
[mockyeah][REQUEST][POST] /users (1ms)
      ✓ should load user details when created successfully

Executed 3 of 3 specs SUCCESS in 0.062 sec.
[mockyeah][SERVE][EXIT] Goodbye.
[22:00:00] I/local - Shutting down selenium standalone server.
```

However, for test reporting you might prefer to switch logging of by setting

```
{ ...
  "output": false,
  "verbose": false
}
```

which will give the following less cluttered output.

```
[21:59:59] I/local - Selenium standalone server started at http://192.168.0.155:48608/wd/hub
Spec started

  Handle users

    Users view
      ✓ should load the users list
      ✓ should show the error code if list cannot be loaded
      ✓ should load user details when created successfully

Executed 3 of 3 specs SUCCESS in 0.062 sec.
[22:00:00] I/local - Shutting down selenium standalone server.
```
