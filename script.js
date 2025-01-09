document.getElementById('swapButton').addEventListener('click', function () {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const fromAmount = parseFloat(document.getElementById('fromAmount').value);

    if (!fromAmount || fromAmount <= 0) {
        displayMessage("Please enter a valid amount.", "red");
        return;
    }

    if (fromCurrency === toCurrency) {
        displayMessage("Choose different currencies to swap.", "red");
        return;
    }

    // Mock conversion rate (this could be fetched from an API in real implementation)
    const conversionRates = {
        "USDT-USDC": 1,
        "USDT-MATIC": 0.75,
        "USDC-MATIC": 0.8,
        "USDC-USDT": 1,
        "MATIC-USDT": 1.25,
        "MATIC-USDC": 1.2
    };

    const conversionKey = `${fromCurrency}-${toCurrency}`;
    const rate = conversionRates[conversionKey] || 1; // Default to 1:1 if rate not found
    const toAmount = (fromAmount * rate).toFixed(2);

    // Display the converted amount
    document.getElementById('toAmount').value = toAmount;

    // Display a success message
    displayMessage(`Successfully swapped ${fromAmount} ${fromCurrency} to ${toAmount} ${toCurrency}`, "green");
});

function displayMessage(msg, color) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.color = color;
    messageDiv.textContent = msg;
}
