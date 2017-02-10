var request = require('request');
var assert = require('chai').assert;
var fs = require("fs")

if (!process.env.XIRSYS_TEST) {
    console.log("** Please set XIRSYS_TEST **")
    process.exit(1)
}

if (fs.existsSync("tests.txt"))
    fs.unlinkSync("tests.txt")


function url() {
    return process.env.XIRSYS_TEST
}

function put(path, prm, cb) {

    var uri = url() + path

    var opt = {
        url: uri,
        json: true,
        body: prm
    }

    request.put(opt, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (!prm)
                cb(body, 'curl -s -H "Content-type: application/json" -XPUT ' + uri)
            else
                cb(body, 'curl -s -H "Content-type: application/json" -XPUT ' + uri + " -d '" + JSON.stringify(prm))
        }
    })
}


function post(path, prm, cb) {

    var uri = url() + path

    var opt = {
        url: uri,
        json: true,
        body: prm
    }

    request.post(opt, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(body, 'curl -s -H "Content-type: application/json" -XPOST ' + url() + path + " -d '" + JSON.stringify(prm))
        }
    })
}

function get(path, cb) {
    request.get(url() + path, function (error, response, body) {
        b = JSON.parse(body)
        if (!error && response.statusCode == 200) {
            cb(b, 'curl -s ' + url() + path)
        }
    })
}


function del(path, cb) {
    request.delete(url() + path, function (error, response, body) {
        b = JSON.parse(body)
        if (!error && response.statusCode == 200) {
            cb(b, 'curl -s -XDELETE ' + url() + path)
        }
    })
}


function add_test_account(ident, cb) {
    del("_acc/accounts?k=" + ident, function (res) {
        user = { k: ident, v: { "email": "ritchie@async.cl" } }
        put("_acc/accounts", user, function (res) {
            assert(res.s == "ok", "instead returns " + JSON.stringify(res))
            cb()
        })
    })
}


function report(val, curl) {
    fs.appendFileSync("tests.txt", '\n' + curl + '\n' + JSON.stringify(val, null, 2) + "\n==")
}


exports.put = put
exports.get = get
exports.del = del
exports.post = post
exports.add_test_account = add_test_account
exports.report = report