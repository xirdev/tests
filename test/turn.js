var assert = require('chai').assert;
var _ = require("lodash")
var base = require('./base')

describe('turn', function() {
    describe("create ice string", function() {
        it('should return {ok,token}', function(done) {
            base.put("_turn/", null, function(res, curl) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                assert.isObject(res.v, "is not a string" + JSON.stringify(res))
                done()
                base.report(res, curl)
            })
        })
    })
})