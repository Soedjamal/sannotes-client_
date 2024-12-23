export const isGoogleEmail = (email) => {
  const domainRegex = /^[^\s@]+@(gmail\.com|.+\.google\.com)$/;
  return domainRegex.test(email);
};
