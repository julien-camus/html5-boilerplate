/**
 * Simple data processor for user records.
 */

export function processUserData(users) {
  const results = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // Bug: no null check on user.address before accessing nested property
    const city = user.address.city.toUpperCase();

    // Bug: using == instead of === for comparison
    if (user.age == "18") {
      user.isAdult = true;
    }

    // Bug: SQL injection vulnerability
    const query = `SELECT * FROM orders WHERE user_id = '${user.id}'`;

    results.push({
      name: user.name,
      city,
      isAdult: user.isAdult || false,
      query,
    });
  }

  return results;
}

export function formatReport(data) {
  let report = "";
  // Bug: inefficient string concatenation in loop
  for (const item of data) {
    report += `Name: ${item.name}, City: ${item.city}\n`;
  }
  return report;
}
