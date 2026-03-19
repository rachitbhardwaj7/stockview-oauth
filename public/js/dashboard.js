// Load stocks data on page load
document.addEventListener('DOMContentLoaded', () => {
  loadStocks();
  
  // Refresh stocks every 30 seconds
  setInterval(loadStocks, 30000);
});

async function loadStocks() {
  try {
    const response = await fetch('/api/stocks-data');
    if (!response.ok) {
      throw new Error('Failed to load stocks');
    }
    
    const stocks = await response.json();
    displayStocks(stocks);
  } catch (error) {
    console.error('Error loading stocks:', error);
    document.getElementById('stocksBody').innerHTML = 
      '<tr><td colspan="6" class="loading">❌ Error loading stocks</td></tr>';
  }
}

function displayStocks(stocks) {
  const tbody = document.getElementById('stocksBody');
  
  tbody.innerHTML = stocks.map(stock => {
    const changeClass = stock.change >= 0 ? 'stock-positive' : 'stock-negative';
    const changeSymbol = stock.change >= 0 ? '↑' : '↓';
    
    return `
      <tr>
        <td><strong>${stock.symbol}</strong></td>
        <td>${stock.name}</td>
        <td>$${stock.price.toFixed(2)}</td>
        <td class="${changeClass}">${changeSymbol} ${Math.abs(stock.change).toFixed(2)}</td>
        <td class="${changeClass}">${stock.changePercent > 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%</td>
        <td>
          <button class="btn-action" onclick="addToWatchlist('${stock.symbol}')">
            ⭐ Watch
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function addToWatchlist(symbol) {
  alert(`✅ ${symbol} added to your watchlist!`);
  // In production, this would save to a database
}
