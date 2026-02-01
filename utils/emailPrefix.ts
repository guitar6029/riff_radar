export const emailPrefix = (email: string): string => {
  return email.split("@")[0];
};
