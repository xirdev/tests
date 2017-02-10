var assert = require('chai').assert;
var base = require('./base')

before(function (done) {
    base.del("_ns/my/new/namespace", function (res) {
        done()
    })
})


describe('namespace', function () {
    describe('create', function () {
        it('should return ok', function (done) {
            base.put("_ns/my/new/namespace", null, function (res, curl) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                done()
                base.report(res, curl)
            })
        })
    })

    describe('list', function () {
        it('should return 1 item', function (done) {
            base.get("_ns?depth=10", function (res, curl) {
                assert.isArray(res.v, "getting ns should be array")
                assert(res.v[0] == "my/new/namespace", "didn't get required namespace returned in get, instead " + JSON.stringify(res))
                done()
                base.report(res, curl)
            })
        })
    })



    describe('delete', function () {
        it('should delete the test user', function (done) {
            base.del("_ns/my/new/namespace", function (res, curl) {
                assert(res.v == 1, "instead returns " + JSON.stringify(res))
                done()
                base.report(res, curl)
            })
        })
    })
})