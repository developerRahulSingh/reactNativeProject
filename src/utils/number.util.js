const numberUtil = {
  returnIgnoredRoundedValues: (number: number | string, decimalPoints: number = 2) => {
    if (!number) {
      return number;
    }

    let regex = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimalPoints || -1) + '})?');

    // null check
    if (!number.toString().match(regex)) {
      return number;
    }
    return parseFloat(number.toString().match(regex)[0]);
  },

  truncateToDecimals: (num, dec = 2) => {
    let n = num - Math.pow(10, -dec) / 2;
    n += n / Math.pow(2, 53);
    return n.toFixed(dec);
  },
};

export default numberUtil;
