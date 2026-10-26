import { useState } from "react";

const initialItems = [
    { name: "Wheat Seeds", qty: 10, rate: 500 },
    { name: "Organic Fertilizer", qty: 5, rate: 800 },
    { name: "Neem Oil", qty: 4, rate: 350 },
    { name: "Drip Irrigation Pipe", qty: 3, rate: 1200 },
    { name: "Agriculture Sprayer", qty: 2, rate: 1500 }
];

const rates = [
    0, 50, 100, 200, 250, 300, 350, 400, 500,
    600, 700, 800, 900, 1000, 1200, 1500, 2000,
    2500, 3000, 5000, 10000, 15000, 20000
];

function InvoiceTable({ onSubtotalChange }) {
    const [items, setItems] = useState(initialItems);

    function updateItem(index, field, value) {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );

        setItems(updatedItems);

        const subtotal = updatedItems.reduce(
            (sum, item) => sum + item.qty * item.rate,
            0
        );

        onSubtotalChange(subtotal);
    }

    const money = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2
        }).format(amount);

    return (
        <>
            <h3>Invoice Items</h3>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Rate (₹)</th>
                            <th>Amount (₹)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className="item-name"
                                        aria-label="Item name"
                                        value={item.name}
                                        onChange={(e) =>
                                            updateItem(index, "name", e.target.value)
                                        }
                                    />
                                </td>

                                <td>
                                    <select
                                        className="qty"
                                        aria-label="Quantity"
                                        value={item.qty}
                                        onChange={(e) =>
                                            updateItem(index, "qty", Number(e.target.value))
                                        }
                                    >
                                        {Array.from({ length: 101 }, (_, i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>
                                </td>

                                <td>
                                    <select
                                        className="rate"
                                        aria-label="Rate"
                                        value={item.rate}
                                        onChange={(e) =>
                                            updateItem(index, "rate", Number(e.target.value))
                                        }
                                    >
                                        {rates.map((rate) => (
                                            <option key={rate} value={rate}>
                                                {money(rate)}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="amount">
                                    {money(item.qty * item.rate)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default InvoiceTable;