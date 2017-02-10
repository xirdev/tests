var assert = require('chai').assert;
var base = require('./base')
var _ = require("lodash")


describe('data', function () {

    before(function (done) {
        base.del("_data/my/data/path", function (d) {
            done()
        })
    })

    after(function (done) {
        base.del("_data/my/data/path", function (d) {
            done()
        })
    })


    describe('put 1', function () {
        it("should add user data at path", function (done) {
            key_data = { k: "key", v: { z: 1, y: "s" } }
            base.put("_data/my/data/path", key_data, function (res, curl) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                done()
                base.report(res, curl)
            })
        })
    })


    describe('get', function () {
        it("should get a value", function (done) {
            base.get("_data/my/data/path?k=key", function (res, curl) {
                assert(res.s == "ok")
                assert.isObject(res.v)
                assert.isString(res.v.y, "should be a string")
                assert.isNumber(res.v.z, "should be a number")
                done()
                base.report(res, curl)
            })
        })
    })


    describe('put 2', function () {
        it("should add user data at path", function (done) {
            key_data = { k: "key2", v: { z: 1, y: "s" } }
            base.put("_data/my/data/path", key_data, function (res, curl) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                done()
                base.report(res, curl)
            })
        })
    })

    describe('list', function () {
        it("should list two elements at same path", function (done) {
            base.get("_data/my/data/path", function (res, curl) {
                assert(res.s == "ok")
                assert.isArray(res.v)
                assert.lengthOf(res.v, 2)
                done()
                base.report(res, curl)
            })
        })
    })

    describe('delete', function () {
        it("should delete 1 element", function (done) {
            base.del("_data/my/data/path?k=key", function (res, curl) {
                assert(res.s == "ok")
                assert(res.v == 1)
                done()
                base.report(res, curl)
            })
        })
        it("should delete 2nd element", function (done) {
            base.del("_data/my/data/path?k=key2", function (res, curl) {
                assert(res.s == "ok")
                assert(res.v == 1)
                done()
                base.report(res, curl)
            })
        })
    })

    describe('list', function () {
        it("should list 0 elements at same path", function (done) {
            base.get("_data/my/data/path", function (res, curl) {
                assert(res.s == "ok")
                assert.isArray(res.v)
                assert.lengthOf(res.v, 0)
                done()
                base.report(res, curl)
            })
        })
    })


    describe('time series', function () {
        it("should return all action at this path", function (done) {
            base.get("_data/my/data/path?time_series=1&k=key", function (res, curl) {
                assert(res.s == "ok")
                assert.isArray(res.v)
                assert(_.size(res.v) > 0)
                done()
                base.report(res, curl)
            })
        })
    })


    describe("update", function () {
        it("should update data", function (done) {
            key_data = { k: "key3", v: { z: 1, y: "s" } }
            base.put("_data/my/data/path", key_data, function (res) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                base.get("_data/my/data/path?k=key3", function (res) {
                    assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                    assert(_.has(res.v, '_ver_'))
                    res.v.z = 2
                    base.post("_data/my/data/path", { k: "key3", v: res.v }, function (res, curl) {
                        assert(res.s == "ok", JSON.stringify(res))
                        done()
                        base.report(res, curl)
                    })
                })
            })
        })
        it("should return 2", function (done) {
            base.get("_data/my/data/path?k=key3", function (res, curl) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                assert(_.has(res.v, '_ver_'))
                assert(res.v.z == 2, "instead returns " + JSON.stringify(res))
                done()
                base.report(res, curl)
            })
        })
        after(function (done) {
            base.del("_data/my/data/path", function () {
                done()
            })
        })
    })

    describe('delete', function () {
        it("path", function (done) {
            base.put("_data/my/data/path", { k: "key", v: { z: 1 } }, function (res, curl1) {
                assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                base.put("_data/my/data/path", { k: "key2", v: { z: 2 } }, function (res, curl2) {
                    assert(res.s == "ok", "instead returns " + JSON.stringify(res))
                    base.del("_data/my/data/path", function (d, curl3) {
                        assert(d.s == "ok")
                        assert(d.v == 2, "instead returns " + JSON.stringify(d))
                        base.get("_data/my/data/path", function (res) {
                            assert(res.s == "ok")
                            assert.isArray(res.v)
                            assert.lengthOf(res.v, 0)
                            done()
                            curl = curl1 + '\n' + curl2 + '\n' + curl3
                            base.report(d, curl)
                        })
                    })
                })
            })
        })
    })
})
