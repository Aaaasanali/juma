export function extractDigits(input) {
  return (input || '').replace(/\D/g, '');
}

// Formats to +7 (XXX) XXX XXXX for 10 digits after country code (Kazakhstan)
export function formatKzPhone(raw) {
  const digits = extractDigits(raw);
  // Ensure starts with 7 (we'll assume +7 country code)
  const national = digits.replace(/^7/, '').slice(0, 10);
  const p1 = national.slice(0, 3);
  const p2 = national.slice(3, 6);
  const p3 = national.slice(6, 10);
  let out = '+7';
  if (p1) out += ` (${p1}`;
  if (p1 && p1.length === 3) out += ')';
  if (p2) out += ` ${p2}`;
  if (p3) out += ` ${p3}`;
  return out;
}

export function isValidKzPhone(raw) {
  const digits = extractDigits(raw);
  // Accept either starting with 7xxxxxxxxxx or 8xxxxxxxxxx (user typed without +7)
  const normalized = digits.startsWith('8') ? `7${digits.slice(1)}` : digits;
  return /^7\d{10}$/.test(normalized);
}
