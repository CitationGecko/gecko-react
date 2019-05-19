export var zotero = {
  collections: [],
  totalCollections: 0,
  activeCollection: null,
  status: false
};

export function getCollections() {
  let url = '/services/zotero/getCollections';
  return fetch(url).then(resp => {
    console.log('response from Zotero!');
    resp.json().then(json => {
      zotero.totalCollections = json.data.length;
      zotero.status = true;
      zotero.collections = json.data;
    });
  });
}

export function parseCollectionTree(collections) {
  var tree = [];
  var parents = collections.filter(function(c) {
    return !c.data.parentCollection;
  });

  let getChildren = function(collections, ID) {
    let children = collections
      .filter(function(c) {
        return c.data.parentCollection == ID;
      })
      .map(function(c) {
        return {
          name: c.data.name,
          children: getChildren(collections, c.key),
          key: c.key
        };
      });
    return children;
  };
  for (var i = 0; i < parents.length; i++) {
    tree.push({
      name: parents[i].data.name,
      children: getChildren(collections, parents[i].key),
      key: parents[i].key
    });
  }
  return {
    name: 'All Collections',
    children: tree
  };
}

export function getItems(collectionID) {
  zotero.activeCollection = collectionID;
  let url = `/services/zotero/getItemsInCollection/?collectionId=${collectionID}`;
  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      var items = json.data.map(a => {
        let item = a.data;
        return {
          title: item.title,
          author: item.creators.length > 0 ? item.creators[0].lastName : 'n.a',
          year: new Date(item.date).getFullYear(),
          journal: item.journalAbbreviation || item.journal,
          doi: item.DOI
        };
      });
    });
}

export function addItems(papers, collection) {
  let url = `/services/zotero/addItems`;

  const data = {
    items: papers,
    collectionId: zotero.activeCollection
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(json => console.log(json));
}
