const convertBTCtoSatoshi = (rates, paymentInfo) => {
  const amount = paymentInfo.amount;
  const localCurrency = paymentInfo.currency;
  if (amount === "") return 0;
  if (rates != null && amount != null && !isNaN(amount))
    return (parseFloat(amount) * rates[`BTC${localCurrency}`].BTC) * 100000000;

  return 0;
}

export {convertBTCtoSatoshi};