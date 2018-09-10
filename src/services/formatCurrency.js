import numeral from 'numeral'

const formatCurrency = ({amount, currency, showFull = false}) => {
    if (currency === 'BONUS') {
        return `${numeral(amount).format('0,0').replace(/,/g, '.')} BP`;
    } else if (currency === 'CREDIT') {
        return `${numeral(amount).format('0,0').replace(/,/g, '.')} ${showFull ? 'Credit' : 'CR'}`;
    } else if (currency === 'MONEY') {
        return `${amount.toFixed(2).replace('.', ',')} €`;
    }
}

export default formatCurrency;
