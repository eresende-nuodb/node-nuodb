'use strict';

var nuodb = require('../');
var should = require('should');
var async = require('async');
var config = require('./config.js');
var helper = require('./typeHelper.js');

describe('23. typeDouble.js', function () {

  var connection = null;
  var tableName = "type_double";

  // See: DOUBLE @ http://doc.nuodb.com/Latest/Content/SQL-Numeric-Types.htm
  var data = [
    0,
    -2.2250738585072014E-308,
    1.7976931348623157E+308,
    -1.7976931348623157E+308,
    2.2250738585072014E-308,
  ];

  before('open connection', function (done) {
    nuodb.connect(config, function (err, conn) {
      should.not.exist(err);
      connection = conn;
      done();
    });
  });

  after('close connection', function (done) {
    connection.close(function (err) {
      should.not.exist(err);
      done();
    });
  });

  describe('23.1 testing DOUBLE data', function () {
    before('create table, insert data', function (done) {
      async.series([
        function (callback) {
          helper.createTable(connection, tableName, 'DOUBLE', callback);
        },
        function (callback) {
          helper.insertDataArray(connection, tableName, data, callback);
        }
      ], done);
    });

    after(function (done) {
      helper.dropTable(connection, tableName, done);
    });

    it('23.1.1 result set stores DOUBLE correctly', function (done) {
      connection.execute("SELECT * FROM " + tableName, [], function (err, results) {
        should.not.exist(err);
        results.should.be.ok();
        results.getRows(6, function (err, rows) {
          should.not.exist(err);
          console.log(rows);
          // todo: figure out how to compare rows to input values
          results.close(function (err) {
            should.not.exist(err);
            done();
          });
        });
      });
    });
  });

});