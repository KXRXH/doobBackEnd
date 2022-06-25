export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const getIndexesOfMaxValues = (arr) => {
  const sortedArr = arr.slice().sort().reverse();
  const [firstMax, secondMax] = [sortedArr[0], sortedArr[1]];
  const [indF, indS] = [
    arr.indexOf(firstMax),
    arr.lastIndexOf(secondMax)].sort();
  return `${indF}${indS}`;
};