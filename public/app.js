document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the cryptocurrency data from the server
        const response = await fetch('/get-crypto');
        const data = await response.json();

        // Log the data to the console for debugging
        console.log(data);

        // Select the container to display the data
        const container = document.getElementById('crypto-data');

        // Check if data is available
        if (data.length === 0) {
            container.innerHTML = 'No data available.';
            return;
        }

        // Add table headers
        let tableHTML = '<table><thead><tr><th>Name</th><th>Last Price</th><th>Buy</th><th>Sell</th><th>Volume</th></tr></thead><tbody>';

        // Append each cryptocurrency's data to the table
        data.forEach(crypto => {
            tableHTML += `
                <tr>
                    <td>${crypto.name}</td>
                    <td>${crypto.last}</td>
                    <td>${crypto.buy}</td>
                    <td>${crypto.sell}</td>
                    <td>${crypto.volume}</td>
                </tr>
            `;
        });

        tableHTML += '</tbody></table>';

        // Insert the table into the container
        container.innerHTML = tableHTML;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
