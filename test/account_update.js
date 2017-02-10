var assert = require('chai').assert;
var base = require('./base')


describe('account update', function () {
    before(function (done) {
        base.add_test_account("testuser", done)
    })


    it("tries to update username", function (done) {
        user = { k: "testuser", v: { "username": "ha", "company": "woot" } }
        base.post("_acc/accounts", user, function (res) {
            assert(res.s == "error", "instead returns " + JSON.stringify(res))
            assert(res.v == "username_is_immutable", "bad return")
            done()
            base.report(res)
        })
    })

    it("updates company", function (done) {
        user = { k: "testuser", v: { "company": "woot" } }
        base.post("_acc/accounts", user, function (res, curl) {
            assert(res.s == "ok", "instead returns " + JSON.stringify(res))
            base.get("_acc/accounts?k=testuser", function (res) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                assert(res.v.company == "woot")
                done()
                base.report(res, curl)
            })
        })
    })

    after(function (done) {
        done()
        base.report(res)
    })
})