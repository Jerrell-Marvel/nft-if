export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

const publicDomains = new Set(["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "proton.me", "protonmail.com", "zoho.com", "yandex.com", "gmx.com", "mail.com"]);
export function isValidEnterpriseEmail(email: string) {
  if (!isValidEmail(email)) {
    return false;
  }

  const domain = email.split("@")[1].toLowerCase();

  return !publicDomains.has(domain);
}
