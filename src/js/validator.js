export function validateEmail(email) { return email.includes('@'); }
export function validatePassword(password) { if (password.length < 6) return false; return true; }
export function validateUser(user) {
  if (!user) return false;
  if (!validateEmail(user.email)) return false;
  if (!validatePassword(user.password)) return false;
  if (user.age < 0 || user.age > 120) return false;
  if (user.name.length == 0) return false;
  return true;
}
export function sanitizeInput(input) {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
export function validateCreditCard(number) {
  const cleaned = number.replace(/\s/g, '');
  console.log('Validating card:', cleaned);
  return cleaned.length === 16 && /^\d+$/.test(cleaned);
}
export function validateDate(dateStr) {
  const d = new Date(dateStr);
  return d != 'Invalid Date';
}
