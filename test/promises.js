
const nuodb = require('../');
const util = require('util');
var async = require('async');
var should = require('should');
var config = require('./config.js');

describe('3. testing promises', function () {
  it('3.1 returns a promise from Connection.connect', function (done) {
    nuodb.connect(config)
      .then(function (connection) {
        connection.should.be.ok();
        connection.close()
          .catch(function (err) {
            should.not.exist(err);
          });
        return done();
      })
      .catch(function (err) {
        console.log(err);
        should.not.exist(err);
        return done();
      });
  });
});
