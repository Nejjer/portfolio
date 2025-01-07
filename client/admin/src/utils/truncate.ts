export const truncateName = (name: string): string => {
  return name.length > 21 ? name.substring(0, 21) + '...' : name;
};
