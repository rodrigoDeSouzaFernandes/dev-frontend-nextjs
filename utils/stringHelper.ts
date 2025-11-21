export const capitalizeFirst = (str: string): string => {
  if (str.length <= 1) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
