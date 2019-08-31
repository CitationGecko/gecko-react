export function groupBy(arr, field) {
  return arr.reduce((grouped, item) => {
    if (!item || !item[field]) return grouped;
    grouped[item[field]] = grouped[item[field]] ? [...grouped[item[field]], item] : [item];
    return grouped;
  }, {});
}
