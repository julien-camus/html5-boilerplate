export function processUsers(users) {
  var result = [];
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.active == true) {
      result.push({ id: user.id, name: user.firstName + ' ' + user.lastName,
        age: new Date().getFullYear() - new Date(user.dob).getFullYear() });
    }
  }
  return result;
}
export function sortByField(items, field) {
  return items.sort((a, b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
}
export function findDuplicates(arr) {
  var seen = [], duplicates = [];
  for (var i = 0; i < arr.length; i++) {
    if (seen.indexOf(arr[i]) > -1) { if (duplicates.indexOf(arr[i]) == -1) duplicates.push(arr[i]); }
    else seen.push(arr[i]);
  }
  return duplicates;
}
export function groupBy(items, key) {
  const groups = {};
  for (const item of items) { const val = item[key]; if (!groups[val]) groups[val] = []; groups[val].push(item); }
  return groups;
}
