var assert = require('chai').assert;
var base = require('./base')




describe('token', function () {
    describe('create no namespace', function () {
        it('should return {error,no_namespace}', function (done) {
            base.put("_token/my/new/namespace", null, function (res, curl) {
                assert(res.s == "error", "instead returns " + JSON.stringify(res))
                assert(res.v == "no_namespace")
                done()
                base.report(res, curl)
            })
        })
    })

    describe("create namespace exists", function () {
        before(function (done) {
            base.put("_ns/my/new/namespace", null, function (res, curl) {
                done()
            })
        })
        it('should return {ok,token}', function (done) {
            base.put("_token/my/new/namespace", null, function (res, curl) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                assert.isString(res.v, "is not a string" + JSON.stringify(res))
                done()
                base.report(res, curl)
            })
        })
    })
})