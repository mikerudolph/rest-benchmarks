#!/usr/bin/env node

var argv = require('yargs')
  .usage('Usage $0 Url Filename')
  .demand(2)
  .argv

var wrk = require('wrk');
var async = require('async');
var iterations = 5;
var connections = [
  10,
  20,
  40,
  80,
  100
]

var json2csv = require('json2csv');
var fs = require('fs');
var rundata = [];
async.eachSeries(connections, prepareConnections, function(err, results) {
  json2csv({
    data: rundata,
    fields: [
      'transferPerSec',
      'requestsPerSec',
      'requestsTotal',
      'durationActual',
      'transferTotal',
      'latencyAvg',
      'latencyStdev',
      'latencyMax',
      'latencyStdevPerc',
      'rpsAvg',
      'rpsStdev',
      'rpsMax',
      'rpsStdevPerc',
      'latency50',
      'latency75',
      'latency90',
      'latency99',
      'attempt',
      'connectionAmount'
    ],
    fieldNames: [
      'Transfer Per Second',
      'Requests Per Second',
      'Total Requests',
      'Actual Duration',
      'Total Transfer',
      'Average Latency',
      'Latency Standard Deviation',
      'Maximum Latency',
      'Latency Standard Deviation Percent',
      'Average Requests Per Second',
      'Request Per Second Standard Deviation',
      'Maximum Requests Per Second',
      'Requests Per Second Standard Deviation Percent',
      'Latency 50 Percentile',
      'Latency 75 Percentile',
      'Latency 90 Percentile',
      'Latency 99 Percentile',
      'Attempt Number',
      'Number of Connections'
    ]
  }, function(err, csv) {
    if (err) console.log(err);
    fs.writeFile(argv._[1], csv, function(err) {
      if (err) console.log(err);
    });
  });
});

function prepareConnections(numConnections, callback) {
  console.log(numConnections);
  async.timesSeries(iterations, function(n, next) {
    console.log('n = %d', n);
    wrk({
      threads: 10,
      connections: numConnections,
      duration: "1m",
      printLatency: true,
      url: argv._[0]
    }, function(err, results) {
      results.attempt = n + 1;
      results.connectionAmount = numConnections;
      rundata.push(results); 
      next(err, results);
    });
  }, function(err, results) {
    callback(err, results);
  });
} 
