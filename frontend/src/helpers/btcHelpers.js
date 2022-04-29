const convertBTCtoSatoshi = (rates, amount) => {
  if (rates != null && amount != null) {
    return (parseFloat(amount) * rates["BTCEUR"].BTC) * 100000000;
  } else {
    return 0;
  }
}

export {convertBTCtoSatoshi};