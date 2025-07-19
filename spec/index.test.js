const join = require('../src/utils/join');
const split = require('../src/utils/split');
const ternary = require('../src/utils/ternary');
const lower = require('../src/utils/lower');
const upper = require('../src/utils/upper');
const capitalize = require('../src/utils/capitalize');
const switchFn = require('../src/utils/switch');
const replace = require('../src/utils/replace');

test('join', () => {
  const result = join({
    params: ['one', 'two', 'three', '-'],
  });
  expect(result).toMatchObject({
    value: 'one-two-three',
  });
});

test('split', () => {
  const result = split({
    params: ['foo-bar-example', '-'],
  });
  expect(result).toMatchObject({
    value: ['foo', 'bar', 'example'],
  });

  const result2 = split({
    params: ['foo-bar-example', '-', 0],
  });
  expect(result2).toMatchObject({
    value: 'foo',
  });
});

test('ternary', () => {
  const result = ternary({
    params: ['prod', 'prod', true, false],
  });
  expect(result).toMatchObject({
    value: true,
  });

  const result2 = ternary({
    params: ['prod', 'beta', true, false],
  });
  expect(result2).toMatchObject({
    value: false,
  });
});

test('lower', () => {
  const result = lower({
    params: ['DTesjf3'],
  });
  expect(result).toMatchObject({
    value: 'dtesjf3',
  });
});

test('upper', () => {
  const result = upper({
    params: ['l38gt1'],
  });
  expect(result).toMatchObject({
    value: 'L38GT1',
  });
});

test('capitalize', () => {
  const result = capitalize({
    params: ['l38gt1'],
  });
  expect(result).toMatchObject({
    value: 'L38gt1',
  });
});

test('switch', () => {
  const cases = {
    foo: 'awesome',
    '*': 'nope',
  };
  const result = switchFn({
    params: ['foo', cases],
  });
  expect(result).toMatchObject({
    value: 'awesome',
  });

  const result2 = switchFn({
    params: ['bar', cases],
  });
  expect(result2).toMatchObject({
    value: 'nope',
  });
});

test('replace', () => {
  // Test with plain string (replaces first occurrence only - native JS behavior)
  const result = replace({
    params: ['Hello world!', 'world', 'serverless'],
  });
  expect(result).toMatchObject({
    value: 'Hello serverless!',
  });

  const result2 = replace({
    params: ['foo-bar-foo', 'foo', 'baz'],
  });
  expect(result2).toMatchObject({
    value: 'baz-bar-foo', // Only first 'foo' is replaced
  });

  // Test with regex pattern - global flag
  const result3 = replace({
    params: ['Hello World and WORLD!', '/world/gi', 'serverless'],
  });
  expect(result3).toMatchObject({
    value: 'Hello serverless and serverless!',
  });

  // Test with regex pattern - case sensitive, first occurrence only
  const result4 = replace({
    params: ['foo-bar-foo-BAR', '/foo/g', 'baz'],
  });
  expect(result4).toMatchObject({
    value: 'baz-bar-baz-BAR',
  });

  // Test with regex pattern - case insensitive
  const result5 = replace({
    params: ['foo-bar-foo-BAR', '/foo/gi', 'baz'],
  });
  expect(result5).toMatchObject({
    value: 'baz-bar-baz-baz',
  });
});
