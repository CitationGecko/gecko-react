export function addItems(papers, collection) {
  let url = `/services/zotero/addItems`;
  const data = {
    items: papers,
    collectionId: collection
  };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(resp => resp.json());
}
