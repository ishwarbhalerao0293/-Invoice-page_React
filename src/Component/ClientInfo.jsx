function ClientInfo({
    country,
    state,
    onCountryChange,
    onStateChange
}) {
    return (
        <div className="details">
            <label>
                Invoice Number
                <input
                    id="invoice-number"
                    type="text"
                    defaultValue="INV-001"
                />
            </label>

            <label>
                Invoice Date
                <input id="invoice-date" type="date" />
            </label>

            <label>
                Client Name
                <input
                    id="client-name"
                    type="text"
                    placeholder="Enter client name"
                />
            </label>

            <label>
                Client Email
                <input
                    id="client-email"
                    type="email"
                    placeholder="Enter email"
                />
            </label>

            <label>
                Country
                <select
                    id="client-country"
                    value={country}
                    onChange={(e) => onCountryChange(e.target.value)}
                >
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                </select>
            </label>

            <label>
                State
                <select
                    id="client-state"
                    value={state}
                    onChange={(e) => onStateChange(e.target.value)}
                    disabled={country !== "India"}
                >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Goa">Goa</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Other">Other State</option>
                </select>
            </label>

            <label className="full-width">
                Client Address
                <textarea
                    id="client-address"
                    placeholder="Enter client address"
                    rows="3"
                />
            </label>
        </div>
    );
}

export default ClientInfo;