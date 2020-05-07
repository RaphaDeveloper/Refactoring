'use strict';

const expect = require("chai").expect;
const statement = require('./Chapter1').statement;

describe('statement', function() {
  it('should create the report', function() {
    let expectedResult = 'Statement for BigCo\n';
    expectedResult += '  Hamlet: $650.00 (55 seats)\n';
    expectedResult += '  As You Like It: $580.00 (35 seats)\n';
    expectedResult += '  Othello: $400.00 (25 seats)\n';
    expectedResult += 'Amount owed is $1,630.00\n';
    expectedResult += 'You earned 37 credits\n';

    const plays = {
      "hamlet": {"name": "Hamlet", "type": "tragedy"},
      "as-like": {"name": "As You Like It", "type": "comedy"},
      "othello": {"name": "Othello", "type": "tragedy"}
    };

    const invoice = {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 25
        }
      ]
    };

    const result = statement(invoice, plays);

    expect(result).to.equal(expectedResult);
  });
});