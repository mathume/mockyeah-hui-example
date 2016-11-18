Describes how to mock backend for rapid frontend development in JavaScript and how to implement [Hermetic User Interface (HUI) tests](https://testing.googleblog.com/2015/03/android-ui-automated-testing.html) with [mockyeah](https://github.com/ryanricard/mockyeah).

# Default Setup

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

## Rapid frontend development

In order to be independent from a real backend instance during frontend development you just add the expected behaviour (responses) to your default setup.
Then configure your frontend to point to the mockyeah instance, run `node default-setup.js`, run your project and develop!

## Hermetic User Interface (HUI) testing

Frontend by itself is a subsystem of your application. HUI tests strive to have more stable and maintainable tests by mocking out any dependency to a service.
This means you would normally implement system level tests with  with [Selenium WebDriver](https://github.com/SeleniumHQ/selenium) or [Protractor](http://www.protractortest.org/#/).

### Starting mockyeah for testing

As `mockyeah` is automatically started as configured in `.mockyeah` when required, your test suite must simply import your default setup as defined above.

### Changing mockyeah behaviour during test definition

TODO: sample and motivation, caveats about sync/async

# Logging

The standard configuration of mockyeah will write a standard request log which is very helpful when developing test.

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

However, for test reporting you might prefer to switch logging of by
TODO: waiting for pull request