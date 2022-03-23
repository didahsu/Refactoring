import statement from "../statement";
import plays from './plays.json';
import invoice from './invoice.json'

describe('statement', function () {
  it('should be match snapshot', function () {
    expect(statement(invoice, plays)).toMatchSnapshot();
  });

  it('should be throw error', function () {
    const invoice = {
      customer: 'BigCo',
      performances: [{
        playID: 'ironman',
        audience: 30
      }]
    }

    const plays = {
      'ironman': {
        name: 'IronMan',
        type: 'Hero'
      }
    }
    expect(() => statement(invoice, plays)).toThrow('unknown type: Hero')
  });
});


