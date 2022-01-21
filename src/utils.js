export const roundOverThousand = number => {
  if (number >= 1000) {
    return `${Math.round(number / 100) / 10}k`;
  }
  return number;
};
