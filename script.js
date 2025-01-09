const backendUrl = "https://your-backend-url/api"; // Cambia esto por tu backend

// Actualizar el balance
function updateBalance(balance) {
    document.getElementById('balance').textContent = `${balance} BTC`;
}

// Generar una factura Lightning
document.getElementById('generateInvoice').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('buyAmount').value);
    if (!amount || amount <= 0) {
        displayMessage("Enter a valid amount.", "red");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/create-invoice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
        });
        const data = await response.json();
        if (data.invoice) {
            document.getElementById('invoiceMessage').textContent = `Invoice created: ${data.invoice}`;
        } else {
            throw new Error("Failed to create invoice");
        }
    } catch (error) {
        displayMessage(error.message, "red");
    }
});

// Vender Bitcoin
document.getElementById('sellBitcoin').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('sellAmount').value);
    if (!amount || amount <= 0) {
        displayMessage("Enter a valid amount.", "red");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/sell-bitcoin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
        });
        const data = await response.json();
        if (data.success) {
            updateBalance(data.newBalance);
            document.getElementById('sellMessage').textContent = "Bitcoin sold successfully!";
        } else {
            throw new Error("Failed to sell Bitcoin");
        }
    } catch (error) {
        displayMessage(error.message, "red");
    }
});

function displayMessage(message, color) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.color = color;
    messageDiv.textContent = message;
}
