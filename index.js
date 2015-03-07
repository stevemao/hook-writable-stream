'use strict';
var through = require('through2');

var hookWritableStream = function(stream, keepOriginal, cb) {
  var originalWrite = stream.write;
  var duplex = through();
  cb = cb || function() {};

  stream.write = (function(write) {
    return function() {
      var args = arguments;
      if (keepOriginal) {
        write.apply(stream, args);
      }

      duplex.write.apply(duplex, args);
      setTimeout(function() {
        cb.apply(null, args);
      }, 10);
    };
  }(stream.write));

  var unhook = function() {
    stream.write = originalWrite;
  };

  return {
    unhook: unhook,
    stream: duplex
  };
};

module.exports = hookWritableStream;
