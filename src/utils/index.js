export function groupBy(arr, field) {
  return arr.reduce((grouped, item) => {
    if (!item || !item[field]) return grouped;
    grouped[item[field]] = grouped[item[field]] ? [...grouped[item[field]], item] : [item];
    return grouped;
  }, {});
}

export function getQueryString(field, url) {
  var href = url ? url : window.location.href;
  var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  var string = reg.exec(href);
  return string ? string[1] : null;
}
