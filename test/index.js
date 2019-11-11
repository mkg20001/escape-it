'use strict'

const escape = require('..')

const assert = require('assert').strict
const equal = assert.strictEqual

/* eslint-env mocha */

const t = (esc, tests) => {
  for (const test in tests) { // eslint-disable-line guard-for-in
    it(JSON.stringify(tests[test]), async () => {
      equal(esc(...tests[test]), test)
    })
  }
}

describe('escape-it', () => {
  describe('win32', () => {
    const eWin = escape('win32')

    t(
      eWin,
      {
        "echo 'hello!' 'how are you doing $USER' '\"double\"' \\''single'\\'": ['echo', 'hello!', 'how are you doing $USER', '"double"', "'single'"],
        "curl -v -H 'Location;' -H 'User-Agent: dave#10' 'http://www.daveeddy.com/?name=dave&age=24'": ['curl', '-v', '-H', 'Location;', '-H', 'User-Agent: dave#10', 'http://www.daveeddy.com/?name=dave&age=24'],
        "echo 'hello\\nworld'": ['echo', 'hello\\nworld'],
        'echo hello:world': ['echo', 'hello:world'],
        'echo --hello=world': ['echo', '--hello=world'],
        "echo 'hello\\tworld'": ['echo', 'hello\\tworld'],
        "echo '\thello\nworld'\\'": ['echo', '\thello\nworld\''],
        "echo 'hello  world'": ['echo', 'hello  world'],
        'echo hello world': ['echo', 'hello', 'world'],
        "echo 'hello\\\\'\\' \\''\\\\'\\''world'": ['echo', "hello\\\\'", "'\\\\'world"],
        "echo hello 'world\\'": ['echo', 'hello', 'world\\']
      }
    )
  })

  describe('*nix', () => {
    const eNix = escape('linux')

    t(
      eNix,
      {
        "echo 'hello!' 'how are you doing $USER' '\"double\"' \\''single'\\'": ['echo', 'hello!', 'how are you doing $USER', '"double"', "'single'"],
        "curl -v -H 'Location;' -H 'User-Agent: dave#10' 'http://www.daveeddy.com/?name=dave&age=24'": ['curl', '-v', '-H', 'Location;', '-H', 'User-Agent: dave#10', 'http://www.daveeddy.com/?name=dave&age=24'],
        "echo 'hello\\nworld'": ['echo', 'hello\\nworld'],
        'echo hello:world': ['echo', 'hello:world'],
        'echo --hello=world': ['echo', '--hello=world'],
        "echo 'hello\\tworld'": ['echo', 'hello\\tworld'],
        "echo '\thello\nworld'\\'": ['echo', '\thello\nworld\''],
        "echo 'hello  world'": ['echo', 'hello  world'],
        'echo hello world': ['echo', 'hello', 'world'],
        "echo 'hello\\\\'\\' \\''\\\\'\\''world'": ['echo', "hello\\\\'", "'\\\\'world"],
        "echo hello 'world\\'": ['echo', 'hello', 'world\\']
      }
    )
  })
})
