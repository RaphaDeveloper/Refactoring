class InvoiceReportGenerator {
    static generateReport(invoice, plays) {
        let totalAmount = 0;
        let volumeCredits = 0;
        let report = `Statement for ${invoice.customer}\n`;
        const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

        for (let performance of invoice.performances) {
            const play = plays[performance.playID];
            let performanceAmount = 0;

            switch (play.type) {
                case "tragedy":
                    performanceAmount = 40000;
                    if (performance.audience > 30) {
                        performanceAmount += 1000 * (performance.audience - 30);
                    }
                    break;
                case "comedy":
                    performanceAmount = 30000;
                    if (performance.audience > 20) {
                        performanceAmount += 10000 + 500 * (performance.audience - 20);
                    }
                    performanceAmount += 300 * performance.audience;
                    break;
                default:
                    throw new Error(`unknown type: ${play.type}`);
            }

            // add volume credits    
            volumeCredits += Math.max(performance.audience - 30, 0);
            // add extra credit for every ten comedy attendees    
            if ("comedy" === play.type)
                volumeCredits += Math.floor(performance.audience / 5);

            // print line for this order    
            report += `  ${play.name}: ${format(performanceAmount / 100)} (${performance.audience} seats)\n`;
            totalAmount += performanceAmount;
        }
        report += `Amount owed is ${format(totalAmount / 100)}\n`;
        report += `You earned ${volumeCredits} credits\n`;
        return report;
    }
}

module.exports = { InvoiceReportGenerator };