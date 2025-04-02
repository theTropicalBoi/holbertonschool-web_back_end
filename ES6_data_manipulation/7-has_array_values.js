export default function hasValuesFromArray(set, array) {
  return array.every((values) => set.has(values));
}