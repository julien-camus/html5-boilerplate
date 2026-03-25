/**
 * Simple data processor for user records.
 */

export function processUserData(users) {
  const results = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // Safely access nested property with optional chaining
    const city = user.address?.city?.toUpperCase() ?? "UNKNOWN";

    const isAdult = user.age >= 18;

    results.push({
      name: user.name,
      city,
      isAdult,
      userId: user.id,
    });
  }

  return results;
}

export function formatReport(data) {
  const lines = data.map(
    (item) => `Name: ${item.name}, City: ${item.city}`,
  );
  return lines.join("\n") + "\n";
}
