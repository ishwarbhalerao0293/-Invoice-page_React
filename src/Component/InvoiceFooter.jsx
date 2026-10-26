import { useState } from "react";

function InvoiceFooter({ subtotal, country, state }) {
    const [gstRate, setGstRate] = useState(18);
    const [igstRate, setIgstRate] = useState(18);

    const isIndia = country === "India";
    const isMaharashtra = state === "Maharashtra";

    const money = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);

    const totalGST = (subtotal * gstRate) / 100;
    const cgst = Math.round((totalGST / 2) * 100) / 100;
    const sgst = totalGST - cgst;
    const igst = (subtotal * igstRate) / 100;

    const grandTotal = subtotal + (
        !isIndia ? 0 : isMaharashtra ? cgst + sgst : igst
    );

    function taxOptions(value, setter) {
        return (
            <select
                value={value}
                onChange={(e) => setter(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((rate) => (
                    <option key={rate} value={rate}>
                        {rate}%
                    </option>
                ))}
            </select>
        );
    }

    return (
        <>
            <section className="tax-settings no-print">
                <h3>Tax Settings</h3>

                {isIndia && isMaharashtra && (
                    <label>
                        GST Rate (%) — CGST + SGST
                        {taxOptions(gstRate, setGstRate)}
                    </label>
                )}

                {isIndia && !isMaharashtra && (
                    <label>
                        IGST Rate (%)
                        {taxOptions(igstRate, setIgstRate)}
                    </label>
                )}

                <p>
                    Tax type: {!isIndia
                        ? "GST not calculated in this demo"
                        : isMaharashtra
                            ? "CGST + SGST"
                            : "IGST"}
                </p>
            </section>

            <section className="totals">
                <p>
                    <span>Subtotal</span>
                    <strong>{money(subtotal)}</strong>
                </p>

                {isIndia && isMaharashtra && (
                    <>
                        <p>
                            <span>CGST ({gstRate / 2}%)</span>
                            <strong>{money(cgst)}</strong>
                        </p>
                        <p>
                            <span>SGST ({gstRate / 2}%)</span>
                            <strong>{money(sgst)}</strong>
                        </p>
                    </>
                )}

                {isIndia && !isMaharashtra && (
                    <p>
                        <span>IGST ({igstRate}%)</span>
                        <strong>{money(igst)}</strong>
                    </p>
                )}

                <p className="grand-total">
                    <span>Grand Total</span>
                    <strong>{money(grandTotal)}</strong>
                </p>
            </section>
        </>
    );
}

export default InvoiceFooter;