
export default function statement (invoice, plays) {
  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case 'tragedy':
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break;
      case 'comedy':
        result = 30000;
        if (aPerformance.audience > 30) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`)
    }
    return result;
  }
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`
  function usd(aNumber) {
    return new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2

    }).format(aNumber);

  }
  function playFor(performance) {
    return plays[performance.playID];
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ('comedy' === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5)
    }
    return result
  }

  for (const performance of invoice.performances) {
    volumeCredits += volumeCreditsFor(performance);
    result += ` ${playFor(performance).name}: ${usd(amountFor(performance)/100)} (${performance.audience} seats)\n`
    totalAmount += amountFor(performance)
  }

  result += `Amount owed is ${usd(totalAmount/100)}\n`
  result +=`You earned ${volumeCredits} credits\n`
  return result;
}
