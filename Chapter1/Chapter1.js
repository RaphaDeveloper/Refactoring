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
                    performanceAmount = 400;
                    if (performance.audience > 30) {
                        performanceAmount += 10 * (performance.audience - 30);
                    }
                    break;
                case "comedy":
                    performanceAmount = 300 + 3 * performance.audience;
                    if (performance.audience > 20) {
                        performanceAmount += 100 + 5 * (performance.audience - 20);
                    }
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
            report += `  ${play.name}: ${format(performanceAmount)} (${performance.audience} seats)\n`;
            totalAmount += performanceAmount;
        }
        report += `Amount owed is ${format(totalAmount)}\n`;
        report += `You earned ${volumeCredits} credits\n`;
        return report;
    }
}

module.exports = { InvoiceReportGenerator };