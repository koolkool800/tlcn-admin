export function formatNumberWithCommas(number: number | string) {
  let numStr = String(number);
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numStr;
}
