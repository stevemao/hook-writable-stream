'use strict';
var assert = require('assert');
var hookWritableStream = require('./');
var through = require('through2');

it('should work with a string using a callback', function(done) {
  var hook = hookWritableStream(process.stdout, false, function(string) {
    assert.equal(string, 'hooked!\n');
    done();
  });

  console.log('hooked!');
  hook.unhook();
  console.log('unhooked!');
});

it('should work with an object using a callback', function(done) {
  var hook = hookWritableStream(process.stdout, false, function(string) {
    assert.equal(string, '{ hooked: true }\n');
    done();
  });

  console.log({
    hooked: true
  });
  hook.unhook();
  console.log({
    unhooked: true
  });
});

it('should work as a stream', function(done) {
  var hook = hookWritableStream(process.stdout, false);
  var stream = hook.stream;
  stream.pipe(through(function(chunk) {
    assert.equal(chunk, 'hooked!\n');
    done();
  }));

  console.log('hooked!');
  hook.unhook();
  console.log('unhooked!');
});

it('you should also see hooked!', function() {
  var hook = hookWritableStream(process.stdout, true);

  console.log('hooked!');
  hook.unhook();
  console.log('unhooked!');
});
