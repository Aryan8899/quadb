# HODLINFO Website

A simple, responsive cryptocurrency tracking webpage layout built using **HTML**, **CSS**, and **JavaScript**. The website displays essential cryptocurrency data and includes features such as a trading price section, a currency selection section, and a dynamic data table for tracking cryptocurrency platforms and prices.

## Features

- **Responsive Design**: The page is designed to be fully responsive and adapts to different screen sizes, including desktop, tablet, and mobile devices.
- **Currency Buttons**: Users can view different currency options (INR and BTC) with an interactive dropdown.
- **Telegram Integration Button**: A `Connect Telegram` button is available for future Telegram bot integration.
- **Best Price to Trade Section**: Displays the best trading prices, along with different time-based percentage changes (5 mins, 1 hour, 1 day, and 7 days).
- **Dynamic Cryptocurrency Table**: The table structure is prepared for dynamic cryptocurrency data injection, allowing users to view platform prices, buy/sell prices, differences, and savings.

## File Structure

- **index.html**: The main HTML file containing the structure of the webpage, including the header, price section, and table structure.
- **style.css**: The main stylesheet for styling the webpage and making it responsive. Contains media queries for adjusting the layout for different screen sizes.
- **app.js**: A placeholder for future JavaScript code that will fetch and dynamically inject cryptocurrency data into the table.

## Sections Breakdown

### 1. Header Section
This section includes:
- The title of the page (`HODLINFO`).
- Currency buttons for `INR` and `BTC`.
- A button to buy Bitcoin.
- A Telegram connect button for integrating messaging services.
- A toggle switch for potential future theme or feature toggles.

### 2. Best Price to Trade Section
Displays the best prices for trading Bitcoin. The section shows percentage price changes for different time intervals:
- **5 Mins**
- **1 Hour**
- **1 Day**
- **7 Days**

The main price in INR is highlighted in the center.

### 3. Data Table
A table is structured to display platform-specific cryptocurrency data. It includes columns for:
- Platform name.
- Last traded price.
- Buy/Sell price.
- Price difference.
- Savings.

The data for this table is meant to be dynamically injected via JavaScript.

## Technologies Used

- **HTML5**: Provides the structure of the webpage.
- **CSS3**: Used for styling, layout, and responsiveness.
- **JavaScript**: Placeholder in `app.js` for adding dynamic functionality in the future.

## Responsive Design

The website layout is designed to be fully responsive. The key adjustments include:
- Flex wrapping and column adjustments for the header and table.
- Scalable font sizes and adaptable buttons for different screen sizes.
- Table overflow handling for small devices.

## How to Run

1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/hodlinfo.git
    ```

2. Open the `index.html` file in your browser to view the webpage.

3. (Optional) Add functionality to the JavaScript file (`app.js`) for fetching real-time cryptocurrency data.

## Future Enhancements

- **API Integration**: Use a cryptocurrency API like CoinGecko or CoinCap to fetch real-time data for the table.
- **Interactive Features**: Implement the dropdown functionality for currency selection.
- **Telegram Bot Integration**: Connect the Telegram button to a bot that can send price alerts.

## License

This project is open-source and available under the [MIT License](LICENSE).
