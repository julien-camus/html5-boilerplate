// retrigger Mon Mar 30 16:25:56 CEST 2026

function getUserData(userId) {
  var userData = null;
  // S1854: useless assignment — userData is reassigned immediately below
  userData = fetchFromCache(userId);
  if (!userData) {
    userData = null; // S1854: another useless assignment
  }
  // S3358: ternary nested in ternary
  var label = userData ? (userData.active ? "active" : "inactive") : userData ? "unknown" : "missing";
  console.log(label);
}
