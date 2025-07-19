module.exports = ({ params }) => {
  if (params.length < 3) {
    throw new Error('Missing params for function replace. Expected: string, searchPattern, replacementSubString');
  }
  
  const [string, searchPattern, replacementSubString] = params;
  
  // Check if searchPattern is a regex pattern (starts and ends with /)
  if (typeof searchPattern === 'string' && searchPattern.startsWith('/') && searchPattern.lastIndexOf('/') > 0) {
    // Parse regex pattern like '/foo/g' or '/foo/ig'
    const lastSlashIndex = searchPattern.lastIndexOf('/');
    const pattern = searchPattern.slice(1, lastSlashIndex);
    const flags = searchPattern.slice(lastSlashIndex + 1);
    const searchRegex = new RegExp(pattern, flags);
    return {
      value: `${string}`.replace(searchRegex, replacementSubString),
    };
  } else {
    // Treat as plain string - replaces first occurrence only (native JS behavior)
    return {
      value: `${string}`.replace(searchPattern, replacementSubString),
    };
  }
}; 