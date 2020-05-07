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
        return `  ${performance.name}: ${this.formatValue(performance.calculateAmount())} (${performance.audience} seats)\n`;
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
        this.performances = invoiceData.performances.map(p => PerformanceFactory.create(p, plays));
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

class PerformanceFactory {
    static create(performance, plays) {
        const play = plays[performance.playID];

        switch (play.type) {
            case "tragedy":
                return new TragedyPerformance(performance, play);
            case "comedy":
                return new ComedyPerformance(performance, play);
            default:
                throw new Error(`unknown type: ${play.type}`);    
        } 
    }
}

class TragedyPerformance {
    constructor(performance, play) {
        this.name = play.name;
        this.audience = performance.audience;
    }

    calculateAmount() {
        let amount = 400;

        if (this.audience > 30)
            amount += 10 * (this.audience - 30);

        return amount;
    }

    calculateVolumeCredits() {
        return Math.max(this.audience - 30, 0);
    }
}

class ComedyPerformance {
    constructor(performance, play) {
        this.name = play.name;
        this.audience = performance.audience;
    }

    calculateAmount() {
        let amount = 300 + 3 * this.audience;
        
        if (this.audience > 20)
            amount += 100 + 5 * (this.audience - 20);

        return amount;
    }

    calculateVolumeCredits() {
        return Math.max(this.audience - 30, 0) + Math.floor(this.audience / 5);
    }
}

module.exports = { InvoiceReportGenerator };