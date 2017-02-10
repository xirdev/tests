var assert = require('chai').assert;
var _ = require("lodash")
var base = require('./base')

describe('subscriptions', function () {
    describe('list', function () {
        it('should return 1 item', function (done) {
            base.get("_subs/www.xirsys.com/default/default", function (res, curl) {
                assert.isArray(res.v, "should be an array of subs")
                assert(_.size(res.v, 1))
                done()
                base.report(res, curl)
            })
        })
    })

    describe('as values', function () {
        it('should return 1 item', function (done) {
            base.get("_subs/www.xirsys.com/default/default?as=values", function (res, curl) {
                assert.isArray(res.v, "should be an array of subs")
                assert(_.size(res.v, 1))
                done()
                base.report(res, curl)
            })
        })
    })

    describe('get single', function () {
        it('should get a single subscriber ', function (done) {
            base.get("_subs/www.xirsys.com/default/default?k=rt", function (res, curl) {
                assert(res.v.key == "rt")
                done()
                base.report(res, curl)
            })
        })
    })

    describe('kick', function () {
        it('should kick a single subscriber ', function (done) {
            base.del("_subs/www.xirsys.com/default/default?k=rt", function (res, curl) {
                assert(res.s == "ok")
                assert(res.v == 1)
                done()
                base.report(res, curl)
            })
        })
    })

})