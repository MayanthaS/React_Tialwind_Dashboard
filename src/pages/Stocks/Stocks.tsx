import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

const MoreDotIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const Stocks = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Monthly');
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const stocks = [
    { symbol: 'AAPL', name: 'Apple, Inc', price: '$1,232.00', change: '+11.01%', up: true, color: 'bg-gray-900', icon: '🍎' },
    { symbol: 'PYPL', name: 'Paypal, Inc', price: '$965.00', change: '-9.05%', up: false, color: 'bg-blue-600', icon: 'P' },
    { symbol: 'TSLA', name: 'Tesla, Inc', price: '$1,232.00', change: '+11.01%', up: true, color: 'bg-red-600', icon: 'T' },
    { symbol: 'AMZN', name: 'Amazone.com, Inc', price: '$2,567.99', change: '+11.01%', up: true, color: 'bg-orange-500', icon: 'a' },
  ];

  const allTransactions = [
    { name: 'Bought PYPL', icon: 'P', iconBg: 'bg-blue-600', date: 'Nov 23, 01:00 PM', price: '$2,567.88', category: 'Finance', status: 'Success' },
    { name: 'Bought AAPL', icon: '🍎', iconBg: 'bg-gray-900', date: 'Nov 22, 09:00 PM', price: '$2,567.88', category: 'Technology', status: 'Pending' },
    { name: 'Sell KKST', icon: 'K', iconBg: 'bg-green-500', date: 'Oct 12, 03:54 PM', price: '$6,754.99', category: 'Finance', status: 'Success' },
    { name: 'Bought FB', icon: 'f', iconBg: 'bg-blue-500', date: 'Sep 09, 02:00 AM', price: '$1,445.41', category: 'Social media', status: 'Success' },
    { name: 'Sell AMZN', icon: 'a', iconBg: 'bg-orange-500', date: 'Feb 35, 08:00 PM', price: '$5,698.55', category: 'E-commerce', status: 'Failed' },
    { name: 'Bought TSLA', icon: 'T', iconBg: 'bg-red-600', date: 'Jan 15, 04:30 PM', price: '$3,234.56', category: 'Technology', status: 'Success' },
    { name: 'Sell GOOGL', icon: 'G', iconBg: 'bg-blue-500', date: 'Dec 28, 11:20 AM', price: '$4,567.89', category: 'Technology', status: 'Success' },
    { name: 'Bought MSFT', icon: 'M', iconBg: 'bg-blue-600', date: 'Dec 05, 02:15 PM', price: '$2,890.45', category: 'Technology', status: 'Pending' },
  ];

  const transactionsPerPage = 5;
  const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);

  const filteredTransactions = allTransactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const watchlist = [
    { symbol: 'AAPL', name: 'Apple, Inc', price: '$4,008.65', change: '+11.01%', up: true, color: 'bg-gray-900', icon: '🍎' },
    { symbol: 'SPOT', name: 'Spotify.com', price: '$11,689.00', change: '+9.48%', up: true, color: 'bg-green-500', icon: '♪' },
    { symbol: 'ABNB', name: 'Airbnb, Inc', price: '$32,227.00', change: '-0.29%', up: false, color: 'bg-red-500', icon: 'A' },
    { symbol: 'ENVT', name: 'Envato, Inc', price: '$13,895.00', change: '+3.79%', up: true, color: 'bg-green-400', icon: 'E' },
    { symbol: 'QIWI', name: 'qiwi.com, Inc', price: '$4,008.65', change: '+4.52%', up: true, color: 'bg-orange-500', icon: 'Q' },
  ];

  const allTrendingStocks = [
    { symbol: 'TSLA', name: 'Tesla, Inc', price: '$192.53', change: '+1.01%', up: true, color: 'bg-red-600', icon: 'T' },
    { symbol: 'AAPL', name: 'Apple, Inc', price: '$192.53', change: '+3.59%', up: true, color: 'bg-gray-900', icon: '🍎' },
    { symbol: 'SPOT', name: 'Spotify.com', price: '$192.53', change: '+2.15%', up: true, color: 'bg-green-500', icon: '♪' },
    { symbol: 'GOOGL', name: 'Google, Inc', price: '$2,845.67', change: '+5.23%', up: true, color: 'bg-blue-500', icon: 'G' },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: '$378.91', change: '+2.87%', up: true, color: 'bg-blue-600', icon: 'M' },
    { symbol: 'META', name: 'Meta Platforms', price: '$485.32', change: '+4.15%', up: true, color: 'bg-indigo-600', icon: 'f' },
  ];

  const trendingStocks = allTrendingStocks.slice(trendingIndex, trendingIndex + 3);

  const handlePrevTrending = () => {
    setTrendingIndex((prev) => (prev > 0 ? prev - 1 : allTrendingStocks.length - 3));
  };

  const handleNextTrending = () => {
    setTrendingIndex((prev) => (prev < allTrendingStocks.length - 3 ? prev + 1 : 0));
  };

  const handleRemoveFromWatchlist = (index) => {
    // In a real app, this would update state
    console.log('Remove stock at index:', index);
  };

  // Line Chart for Portfolio Performance
  useEffect(() => {
    if (!lineChartRef.current) return;
    const existingChart = ChartJS.getChart(lineChartRef.current);
    if (existingChart) existingChart.destroy();

    const months = ['Jun \'25', 'Jul \'25', 'Aug \'25', 'Sep \'25', 'Oct \'25', 'Nov \'25', 'Dec \'25', '2026', 'Feb \'26', 'Mar \'26', 'Apr'];
    
    // Generate more realistic fluctuating data points
    const dataPoints = [];
    let currentValue = 31;
    for (let i = 0; i < 180; i++) {
      const change = (Math.random() - 0.5) * 1.5;
      currentValue += change;
      currentValue = Math.max(29, Math.min(39, currentValue));
      dataPoints.push(currentValue);
    }

    new ChartJS(lineChartRef.current, {
      type: 'line',
      data: {
        labels: Array(180).fill('').map((_, i) => {
          const monthIndex = Math.floor(i / 16);
          return months[monthIndex] || '';
        }),
        datasets: [{
          data: dataPoints,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          y: {
            min: 28,
            max: 40,
            ticks: { 
              stepSize: 2,
              color: '#9ca3af',
              font: { size: 11 }
            },
            grid: { color: '#f3f4f6', drawBorder: false }
          },
          x: {
            ticks: {
              color: '#9ca3af',
              font: { size: 11 },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 11
            },
            grid: { display: false, drawBorder: false }
          }
        }
      },
    });
  }, []);

  // Bar Chart for Dividend
  useEffect(() => {
    if (!barChartRef.current) return;
    const existingChart = ChartJS.getChart(barChartRef.current);
    if (existingChart) existingChart.destroy();

    new ChartJS(barChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [150, 380, 200, 300, 180, 200],
          backgroundColor: '#6366f1',
          borderRadius: 8,
          barThickness: 40,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            min: 0,
            max: 400,
            ticks: { stepSize: 100 },
            grid: { color: '#f3f4f6' }
          },
          x: {
            grid: { display: false }
          }
        }
      },
    });
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      {/* Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stocks.map((stock, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full ${stock.color} flex items-center justify-center text-white text-xl font-bold`}>
                {stock.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{stock.symbol}</h3>
                <p className="text-sm text-gray-500">{stock.name}</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-900">{stock.price}</span>
              <span className={`text-sm font-semibold ${stock.up ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                {stock.up ? '↑' : '↓'} {stock.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Portfolio Performance */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Portfolio Performance</h3>
              <p className="text-sm text-gray-500 mt-1">Here is your performance stats of each month</p>
            </div>
            <div className="bg-gray-50 p-1 rounded-xl flex gap-1">
              {['Monthly', 'Quarterly', 'Annually'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <canvas ref={lineChartRef}></canvas>
          </div>
        </div>

        {/* Dividend */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Dividend</h3>
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <MoreDotIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          <div className="h-64">
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Latest Transactions</h3>
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr className="text-left">
                <th className="pb-4 font-semibold text-gray-500 text-sm">Name</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Date</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Price</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Category</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Status</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${transaction.iconBg} flex items-center justify-center text-white font-bold`}>
                        {transaction.icon}
                      </div>
                      <span className="font-medium text-gray-900">{transaction.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">{transaction.date}</td>
                  <td className="py-4 font-semibold text-gray-900">{transaction.price}</td>
                  <td className="py-4 text-gray-600">{transaction.category}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      transaction.status === 'Success' ? 'bg-green-50 text-green-600' :
                      transaction.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreDotIcon className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              // Show first page, last page, current page, and pages around current
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                return <span key={pageNum} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* My Watchlist and Trending Stocks - Same Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-4">
        {/* My Watchlist */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">My Watchlist</h3>
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <MoreDotIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {watchlist.map((stock, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 group">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${stock.color} flex items-center justify-center text-white text-xl font-bold`}>
                    {stock.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{stock.symbol}</h4>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{stock.price}</p>
                    <p className={`text-sm font-semibold ${stock.up ? 'text-green-600' : 'text-red-600'} flex items-center justify-end gap-1`}>
                      {stock.up ? '↑' : '↓'} {stock.change}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWatchlist(idx)}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-opacity"
                    title="Remove from watchlist"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Stocks */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm ">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Trending Stocks</h3>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevTrending}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNextTrending}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingStocks.map((stock, idx) => (
              <div key={idx} className="bg-gray-100 p-6 rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full ${stock.color} flex items-center justify-center text-white text-xl font-bold`}>
                    {stock.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{stock.symbol}</h4>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-gray-900">{stock.price}</span>
                  <span className={`text-sm font-semibold ${stock.up ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                    {stock.up ? '↑' : '↓'} {stock.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: allTrendingStocks.length - 2 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTrendingIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === trendingIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocks;