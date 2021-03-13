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

var containerElements = ['svg', 'g'];
var relevantStyles = {
  rect: ['fill', 'stroke', 'stroke-width'],
  path: ['fill', 'stroke', 'stroke-width'],
  circle: ['fill', 'stroke', 'stroke-width'],
  line: ['stroke', 'stroke-width'],
  text: ['fill', 'font-size', 'text-anchor']
};

function replaceStyles(clone, original) {
  var children = clone.childNodes;
  var originalChildren = original.childNodes;

  for (var cd = 0; cd < children.length; cd++) {
    var child = children[cd];

    var tagName = child.tagName;
    if (containerElements.indexOf(tagName) !== -1) {
      replaceStyles(child, originalChildren[cd]);
    } else if (tagName in relevantStyles) {
      var styleDef = window.getComputedStyle(originalChildren[cd]);

      var styleString = '';
      for (var st = 0; st < relevantStyles[tagName].length; st++) {
        styleString +=
          relevantStyles[tagName][st] +
          ':' +
          styleDef.getPropertyValue(relevantStyles[tagName][st]) +
          '; ';
      }

      child.setAttribute('style', styleString);
    }
  }
}

export function saveSVG(id) {
  var svgElem = document.getElementById(id);
  var clonedNode = svgElem.cloneNode(true);
  replaceStyles(clonedNode, svgElem);
  var svgData = clonedNode.outerHTML;
  var cleanSvg = svgData.replaceAll('&nbsp', '&#160');
  var svgBlob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
  var svgUrl = URL.createObjectURL(svgBlob);
  var downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = 'citation_network.svg';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
