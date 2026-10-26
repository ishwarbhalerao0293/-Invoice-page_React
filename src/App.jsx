import { useState } from "react";
import "./App.css";

import CompanyHeader from "./Component/CompanyHeader.jsx";
import ClientInfo from "./Component/ClientInfo.jsx";
import InvoiceTable from "./Component/InvoiceTable.jsx";
import InvoiceFooter from "./Component/InvoiceFooter.jsx";

function App() {
  const [subtotal, setSubtotal] = useState(17000);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");

  return (
    <main className="invoice">
      <CompanyHeader />

      <h2 className="invoice-title">Client Invoice</h2>

      <div className="invoice-actions no-print">
        <button onClick={() => window.print()}>
          Print Invoice
        </button>

        <button onClick={() => window.print()}>
          Download PDF
        </button>
      </div>

      <ClientInfo
        country={country}
        state={state}
        onCountryChange={setCountry}
        onStateChange={setState}
      />

      <InvoiceTable onSubtotalChange={setSubtotal} />

      <InvoiceFooter
        subtotal={subtotal}
        country={country}
        state={state}
      />

      <footer className="invoice-note">
        <p>Thank you for your business!</p>
      </footer>
    </main>
  );
}

export default App;