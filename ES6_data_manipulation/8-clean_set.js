export default function cleanSet(set, startString) {
  if (!startString || typeof startString !== 'string' || startString === '') {
    return '';
  }
  const values = [...set]
    .filter((value) => value.startsWith(startString))
    .map((value) => value.slice(startString.length))
    .join('-');

  return values;
}
