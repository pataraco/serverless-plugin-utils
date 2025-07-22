[Home](https://github.com/icarus-sullivan/serverless-plugin-utils/blob/master/README.md)

# replace
Replaces occurrences of a search pattern with a replacement string in a given string. Supports both plain strings and regular expression patterns.

### Usage
```
varName: ${replace(string, searchPattern, replacementString)}
```

The `searchPattern` can be either:
- A plain string (replaces first occurrence only - native JavaScript behavior)
- A regex pattern using Node.js syntax like `/pattern/flags` (for global replacement, use `/pattern/g`)

### Examples

#### Plain String Replacement:
```
service: MyApp

provider:
  stage: ${opt:stage, 'dev'}

custom:
  serviceName: ${replace(${self:service}, 'App', 'Service')}
  # Note: For multiple slashes, use regex: ${replace(${opt:branch, 'main'}, '/\//g', '-')}
  cleanBranch: ${replace(${opt:branch, 'main'}, '/', '-')}
```

#### Regular Expression Patterns:
```
custom:
  # Case-insensitive replacement
  normalizedName: ${replace('Hello WORLD and world', '/world/gi', 'serverless')}
  
  # Replace only first occurrence
  firstOnly: ${replace('test-test-test', '/test/', 'demo')}
  
  # Global replacement with regex
  allMatches: ${replace('foo123bar456', '/[0-9]+/g', 'XXX')}
```

### Outputs:

| Example | Input | Pattern | Replacement | Output |
|--|--|--|--|--|
| Plain string | MyApp | 'App' | 'Service' | MyService |
| Plain string (first only) | foo-bar-foo | 'foo' | 'baz' | baz-bar-foo |
| Regex (case-insensitive) | Hello WORLD and world | '/world/gi' | 'serverless' | Hello serverless and serverless |
| Regex (first only) | test-test-test | '/test/' | 'demo' | demo-test-test |
| Regex (global) | test-test-test | '/test/g' | 'demo' | demo-demo-demo |
| Regex (global numbers) | foo123bar456 | '/[0-9]+/g' | 'XXX' | fooXXXbarXXX |