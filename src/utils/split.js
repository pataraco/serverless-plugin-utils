module.exports = ({ params }) => {
  const [value, delimiter, index] = params;
  const splitArray = value.split(delimiter);

  return {
    value: index !== undefined ? splitArray[index] : splitArray,
  };
};
