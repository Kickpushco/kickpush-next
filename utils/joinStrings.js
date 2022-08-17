export function joinStrings(array) {
  if (array.length === 1) return array[0];

  if (array.length === 2) return array.join(" and ");

  let string = "";
  const arrayLength = array.length;

  array.forEach((item, index) => {
    if (index === 0) {
      string += item;
    } else if (index === arrayLength - 1) {
      string += ` and ${item}`;
    } else {
      string += `, ${item}`;
    }
  });

  return string;
}
