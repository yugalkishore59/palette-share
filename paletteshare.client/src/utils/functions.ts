export const formatNumber = (num: number, decimals: number = 1) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(decimals) + "B"; // Billion
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(decimals) + "M"; // Million
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(decimals) + "K"; // Thousand
  } else {
    return num.toString();
  }
};
