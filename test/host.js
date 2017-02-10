var assert = require('chai').assert;
var _ = require("lodash")
var base = require('./base')



describe("host", function () {
    it('query signals successfully', function (done) {
        base.get("_host?type=signal", function (res, curl) {
            assert(res.s == "ok", "instead returns " + JSON.stringify(res))
            assert.isString(res.v, "is not a string" + JSON.stringify(res))
            assert(_.startsWith(res.v, "wss://"))
            done()
            base.report(res, curl)
        })
    })

    it('fails to provide type param', function (done) {
        base.get("_host", function (res, curl) {
            assert(res.s == "error", "instead returns " + JSON.stringify(res))
            assert(res.v == "require_type_param")
            done()
            base.report(res, curl)
        })
    })

    it('fails to provide known type param', function (done) {
        base.get("_host?type=woot", function (res, curl) {
            assert(res.s == "error", "instead returns " + JSON.stringify(res))
            assert(res.v == "unrecognized_type_param", "instead returns " + JSON.stringify(res))
            done()
            base.report(res, curl)
        })
    })
})
