var assert = require('chai').assert;
var base = require('./base')


describe('account create', function () {
    beforeEach(function (done) {
        base.del("_acc/accounts?k=testuser", function (res) {
            done()
        })
    })

    after(function (done) {
        base.del("_acc/accounts?k=testuser", function (res) {
            done()
        })
    })


    it("fail on no account details", function (done) {
        user = { k: "testuser", v: "value" }
        base.put("_acc/accounts", user, function (res, curl) {
            assert(res.s == "error", "instead returns " + JSON.stringify(res))
            assert(res.v == "require_account_details", "error message should be " + JSON.stringify(res))
            done()
            base.report(res, curl)
        })
    })


    it("check for missing email", function (done) {
        user = { k: "testuser", v: { "hello": "there" } }
        base.put("_acc/accounts", user, function (res, curl) {
            assert(res.s == "error", "instead returns " + JSON.stringify(res))
            assert(res.v == "bad_email", "error message should be " + JSON.stringify(res))
            done()
            base.report(res, curl)
        })
    })


    it("successful creation", function (done) {
        user = { k: "testuser", v: { "email": "ritchie@async.cl", "company": "woot" } }
        base.put("_acc/accounts", user, function (res, curl) {
            assert(res.s == "ok", "instead returns " + JSON.stringify(res))
            done()
            base.report(res, curl)
        })
    })



})