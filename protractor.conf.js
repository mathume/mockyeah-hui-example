/**
 * Created by sebastian on 18/11/16.
 */
exports.config = {
    seleniumAddres: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName' : 'chrome'
    },
    specs: ['test/*_spec.js'],
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        print: function() {}
    },
    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    }
};