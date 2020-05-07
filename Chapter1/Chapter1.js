class InvoiceReportGenerator {
    generateReport(invoiceData, plays) {
        const invoice = new Invoice(invoiceData, plays);
        
        let report = this.renderCustomer(invoice);
        report += this.renderPerformances(invoice);
        report += this.renderTotalAmount(invoice);
        report += this.renderVolumeCredits(invoice);
        
        return report;
    }

    renderCustomer(invoice) {
        return `Statement for ${invoice.customer}\n`;
    }

    renderPerformances(invoice) {
        let performances = '';

        for (let performance of invoice.performances)
            performances += this.renderPerformance(performance);

        return performances;
    }

    renderPerformance(performance) {
        return `  ${performance.play.name}: ${this.formatValue(performance.calculateAmount())} (${performance.audience} seats)\n`;
    }

    renderTotalAmount(invoice) {
        return `Amount owed is ${this.formatValue(invoice.calculateTotalAmount())}\n`;
    }

    renderVolumeCredits(invoice) {
        return `You earned ${invoice.calculateVolumeCredits()} credits\n`;
    }

    formatValue(value) {
        const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

        return format(value);
    }
}

class Invoice {
    constructor(invoiceData, plays) {
        this.customer = invoiceData.customer;
        this.performances = invoiceData.performances.map(p => new Performance(p, plays));
    }

    calculateTotalAmount() {
        let totalAmount = 0;

        for (let performance of this.performances)
            totalAmount += performance.calculateAmount();

        return totalAmount;
    }

    calculateVolumeCredits() {
        let volumeCredits = 0;

        for (let performance of this.performances)
            volumeCredits += performance.calculateVolumeCredits();

        return volumeCredits;
    }
}

class Performance {
    constructor(performance, plays) {
        this.play = plays[performance.playID];
        this.audience = performance.audience;
    }

    calculateAmount() {
        let amount = 0;

        if (this.play.type === 'tragedy') {
            amount = 400;
            if (this.audience > 30) {
                amount += 10 * (this.audience - 30);
            }
        } else if (this.play.type === 'comedy') {
            amount = 300 + 3 * this.audience;
            if (this.audience > 20) {
                amount += 100 + 5 * (this.audience - 20);
            }
        }

        return amount;
    }

    calculateVolumeCredits() {
        let volumeCredits = Math.max(this.audience - 30, 0);
        
        if ("comedy" === this.play.type)
            volumeCredits += Math.floor(this.audience / 5);

        return volumeCredits;
    }
}

module.exports = { InvoiceReportGenerator };