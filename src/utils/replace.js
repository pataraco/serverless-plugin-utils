module.exports = ({ params }) => {
  if (params.length < 3) {
    throw new Error('Missing params for function replace. Expected: string, searchPattern, replacementString');
  }
  
  const [string, searchPattern, replacementString] = params;
  
  // Check if searchPattern is a regex (starts with / and ends with /flags)
  const regexMatch = searchPattern.match(/^\/(.+?)\/([gimsy]*)$/);
  if (regexMatch) {
    // It's a regex pattern, create RegExp object
    const pattern = regexMatch[1];
    const flags = regexMatch[2];
    const searchRegex = new RegExp(pattern, flags);
    return {
      value: `${string}`.replace(searchRegex, replacementString),
    };
  } else {
    // Treat as plain string - replaces first occurrence only (native JS behavior)
    return {
      value: `${string}`.replace(searchPattern, replacementString),
    };
  }
}; 