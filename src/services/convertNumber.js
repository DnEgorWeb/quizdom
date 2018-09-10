import numeral from 'numeral'

const convertCurrency = (number, comma = true) => {
    if(!number) return 0
    let convertedNumber = number;
    if (comma) {
        convertedNumber = convertedNumber.toString().replace('.', ',');
    } else {
        convertedNumber = numeral(convertedNumber).format('0,0').replace(/,/g, '.');
    }

    return convertedNumber;
}

export default convertCurrency;
