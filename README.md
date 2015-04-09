#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

> Hooking into Node.js writable stream


Based on [this](https://gist.github.com/pguillory/729616) gist. Useful when you need to test Node writable streams such as stdout.


## Install

```sh
$ npm install --save-dev hook-writable-stream
```


## Usage

### Use a callback

```js
var hookWritableStream = require('hook-writable-stream');
var hook = hookWritableStream(process.stdout, false, function(string) {
  //=> string === 'hooked!\n'
});

console.log('hooked!');
hook.unhook();
console.log('unhooked!');
//=> 'unhooked!' is shown on your console
```

### Use as a stream

```js
var hookWritableStream = require('hook-writable-stream');
var through = require('through2');

var hook = hookWritableStream(process.stdout, false);
var stream = hook.stream;
stream.pipe(through(function(chunk, enc, cb) {
  //=> chunk.toString() === 'hooked!\n'
  cb(chunk);
}));

console.log('hooked!');
hook.unhook();
console.log('unhooked!');
//=> 'unhooked!' is shown on your console
```


## API

### hookWritableStream(writableStream, [keepOriginal], [callback])

Returns an object.

##### unhook

Type: `function`

Call to unhook the writable stream.

##### stream

A stream that you can consume. The data that was going to written to the original stream is written to this stream.

#### writableStream

A node writable stream such as `process.stdout`.

#### keepOriginal

`true` to keep writing to the original stream.

#### callback(obj)

##### obj

Whatever is written to the original stream.


## License

MIT © [Steve Mao](https://github.com/stevemao)


[npm-image]: https://badge.fury.io/js/hook-writable-stream.svg
[npm-url]: https://npmjs.org/package/hook-writable-stream
[travis-image]: https://travis-ci.org/stevemao/hook-writable-stream.svg?branch=master
[travis-url]: https://travis-ci.org/stevemao/hook-writable-stream
[daviddm-image]: https://david-dm.org/stevemao/hook-writable-stream.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/stevemao/hook-writable-stream
[coveralls-image]: https://coveralls.io/repos/stevemao/hook-writable-stream/badge.svg
[coveralls-url]: https://coveralls.io/r/stevemao/hook-writable-stream
