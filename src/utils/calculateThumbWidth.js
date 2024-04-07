export const calculateThumbWidth = (amount, totalAmount) =>
  Math.round((amount / totalAmount) * 100) + 1 + '%';
