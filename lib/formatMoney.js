export default function formatMoney(amount = 0) {
  // set to 0 for it doesnt break if nothing is passed
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // check if its a clean dollar amount, if so, remove the decimals
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  // configures numbers into money decimals, $ sign and commas based on given location
  const formatter = Intl.NumberFormat('en-US', options); // can write the options here directly as well

  return formatter.format(amount / 100);
}
