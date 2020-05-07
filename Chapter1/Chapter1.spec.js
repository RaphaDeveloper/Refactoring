'use strict';

const expect = require("chai").expect;
const InvoiceReportGenerator = require('./Chapter1').InvoiceReportGenerator;

describe('statement', function() {
  it('should create the report', function() {
    let expectedReport = 'Statement for BigCo\n';
    expectedReport += '  Hamlet: $650.00 (55 seats)\n';
    expectedReport += '  As You Like It: $580.00 (35 seats)\n';
    expectedReport += '  Othello: $400.00 (25 seats)\n';
    expectedReport += 'Amount owed is $1,630.00\n';
    expectedReport += 'You earned 37 credits\n';

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

    const report = InvoiceReportGenerator.generateReport(invoice, plays);

    expect(report).to.equal(expectedReport);
  });
});