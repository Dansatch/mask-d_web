export default (people: string[] | number) => {
  let count;

  if (typeof people === "number") count = people;
  else count = people?.length;

  if (count < 10000) {
    return count.toString();
  } else if (count >= 10000 && count < 1000000) {
    const kCount = count / 1000;
    return Math.floor(kCount * 10) / 10 + "k";
  } else {
    const mCount = count / 1000000;
    return Math.floor(mCount * 10) / 10 + "m";
  }
};
