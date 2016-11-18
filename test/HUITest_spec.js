/**
 * Created by sebastian on 18/11/16.
 */
var setup = require('./../default-setup');
var pageFile = require('./../users-page');
var usersPage = new pageFile.usersPage();

describe('Handle users', function () {
    describe('Users view', function () {
        beforeAll(setup.init_mock);
        afterAll(setup.mockyeah.close);

        beforeEach(usersPage.clear);

        it('should load the users list', function () {
            return usersPage.navigateToUsersView().then(function () {
                expect(usersPage.getUserList()).toContain({id: 1, username: 'user1'});
                expect(usersPage.getMessage()).toEqual("SUCCESS");
            });
        });

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

        it('should show the error code if list cannot be loaded', function () {
            setup.mockyeah.get(setup.mockdata.usersGet.pattern, setup.mockdata.usersGet.ko);
            return usersPage.navigateToUsersView().then(function () {
                expect(usersPage.getMessage()).toEqual("UnexpectedException");
            });
        });

        it('should load user details when created successfully', function () {
            return usersPage.navigateToUsersView().then(function () {
                usersPage.enterNewUserDetails("user1", "user1@email.com");
                return usersPage.confirm().then(function () {
                    expect(usersPage.getMessage()).toEqual("SUCCESS");
                    expect(usersPage.getCurrentUser()).toEqual({id: 1, username: 'user1', email: 'user1@email.com'});
                });
            });
        });
    })
});