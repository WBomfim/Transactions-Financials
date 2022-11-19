export const calcOfTransfer = (value: number, amountDebit: number, amountCredit: number) => {
  const newAmountDebit = (amountDebit - value).toFixed(2);
  const newAmountCredit = (amountCredit + value).toFixed(2);

  return { newAmountDebit, newAmountCredit };
};
