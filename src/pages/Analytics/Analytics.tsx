import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement,
  DoughnutController, // Added this
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register all required components including the DoughnutController
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement,
  DoughnutController, // Added this
  Tooltip,
  Legend
);

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('30 days');
  const chartRef = useRef<HTMLCanvasElement>(null);
  const acquisitionChartRef = useRef<HTMLCanvasElement>(null);
  const deviceChartRef = useRef<HTMLCanvasElement>(null);

  // Sample data for the main chart
  const chartData = {
    labels: Array.from({ length: 27 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        data: [160, 380, 190, 290, 180, 185, 280, 100, 210, 380, 270, 105, 120, 200, 260, 180, 300, 110, 80, 380, 105, 215, 280, 165, 270, 105, 110],
        backgroundColor: '#4f46e5',
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  };

  const acquisitionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      { label: 'Direct', data: [40, 50, 45, 55, 35, 42, 50, 48], backgroundColor: '#3730a3', stack: 'stack0' },
      { label: 'Referral', data: [20, 25, 22, 28, 20, 23, 25, 24], backgroundColor: '#4f46e5', stack: 'stack0' },
      { label: 'Organic Search', data: [15, 18, 20, 15, 18, 20, 22, 25], backgroundColor: '#818cf8', stack: 'stack0' },
      { label: 'Social', data: [15, 12, 13, 12, 10, 10, 13, 13], backgroundColor: '#c7d2fe', stack: 'stack0' },
    ],
  };

  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['#3730a3', '#818cf8', '#c7d2fe'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  // Helper to safely initialize charts and prevent "Canvas already in use" errors
  const initChart = (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    config: any
  ) => {
    if (!canvasRef.current) return;

    // Check if a chart already exists on this canvas and destroy it
    const existingChart = ChartJS.getChart(canvasRef.current);
    if (existingChart) {
      existingChart.destroy();
    }

    return new ChartJS(canvasRef.current, config);
  };

  // Main Analytics Chart Effect
  useEffect(() => {
    const chart = initChart(chartRef, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { beginAtZero: true, max: 400, ticks: { stepSize: 100 }, grid: { color: '#e5e7eb' }, border: { display: false } },
        },
      } as ChartOptions<'bar'>,
    });
    return () => chart?.destroy();
  }, [activeTab]);

  // Acquisition Chart Effect
  useEffect(() => {
    const chart = initChart(acquisitionChartRef, {
      type: 'bar',
      data: acquisitionData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'top', align: 'start' } },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, beginAtZero: true, max: 120 },
        },
      } as ChartOptions<'bar'>,
    });
    return () => chart?.destroy();
  }, []);

  // Device Chart Effect (The one that was crashing)
  useEffect(() => {
    const chart = initChart(deviceChartRef, {
      type: 'doughnut',
      data: deviceData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom' } },
      } as ChartOptions<'doughnut'>,
    });
    return () => chart?.destroy();
  }, []);

  const stats = [
    { title: 'Unique Visitors', value: '24.7K', change: '+20%', isPositive: true, subtitle: 'Vs last month' },
    { title: 'Total Pageviews', value: '55.9K', change: '+4%', isPositive: true, subtitle: 'Vs last month' },
    { title: 'Bounce Rate', value: '54%', change: '-1.59%', isPositive: false, subtitle: 'Vs last month' },
    { title: 'Visit Duration', value: '2m 56s', change: '+7%', isPositive: true, subtitle: 'Vs last month' },
  ];

  const tabs = ['12 months', '30 days', '7 days', '24 hours'];
  const topChannels = [
    { source: 'Google', visitors: '4.7K' },
    { source: 'Facebook', visitors: '3.4K' },
    { source: 'Threads', visitors: '2.9K' },
    { source: 'Bing', visitors: '1.5K' },
  ];

  const topPages = [
    { source: 'tailadmin.com', pageviews: '4.7K' },
    { source: 'preview.tailadmin.com', pageviews: '3.4K' },
    { source: 'docs.tailadmin.com', pageviews: '2.9K' },
    { source: 'tailadmin.com/components', pageviews: '1.5K' },
  ];

  const activeUsersData = [450, 480, 460, 490, 470, 440, 460, 480, 465, 455, 475, 490, 470, 450, 480, 500, 485, 470, 490, 510];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{stat.title}</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <div className="flex flex-col items-end">
                <span className={`text-sm font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.subtitle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Analytics</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visitor analytics of last 30 days</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? 'bg-gray-900 dark:bg-gray-700 text-white' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 h-[400px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Middle Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Channels</h3>
          <div className="space-y-4">
            {topChannels.map((c, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300">{c.source}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{c.visitors}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Pages</h3>
          <div className="space-y-4">
            {topPages.map((p, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{p.source}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{p.pageviews}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Active Users</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">478</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Live visitors</span>
          </div>
          <div className="h-24">
            {/* Simplified SVG Path for Active Users visualization */}
            <svg viewBox="0 0 400 120" className="w-full h-full">
              <path
                d={`M 0 100 ${activeUsersData.map((v, i) => `L ${(i * 400) / 19} ${120 - (v / 5)}`).join(' ')}`}
                fill="none" stroke="#4f46e5" strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>


      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Acquisition Channels</h3>
          <div className="h-[300px]"><canvas ref={acquisitionChartRef}></canvas></div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Sessions By Device</h3>
          <div className="h-[300px]"><canvas ref={deviceChartRef}></canvas></div>
        </div>
      </div>

      {/* Demographic and Orders Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* Customers Demographic - 1 Column */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Customers Demographic</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Number of customer based on country</p>
            </div>
            <button className="text-gray-400">•••</button>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 flex items-center justify-center min-h-[180px]">
            <div className="relative w-full opacity-60">
              {/* You can replace this with a real vector map library like react-simple-maps later */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" alt="World Map" className="w-full h-auto dark:invert" />
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.8)]"></div>
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.8)]"></div>
            </div>
          </div>

          {/* Country Stats */}
          <div className="space-y-4 mt-5">
            {[
              { name: 'USA', count: '2,379 Customers', percent: 79, color: 'bg-indigo-600' },
              { name: 'France', count: '589 Customers', percent: 23, color: 'bg-indigo-400' }
            ].map((country, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {/* Simple circle placeholder for flags */}
                  <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">{country.name.slice(0, 2)}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold dark:text-white">{country.name}</span>
                    <span className="text-sm font-medium dark:text-gray-300">{country.percent}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{country.count}</p>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                    <div className={`${country.color} h-1.5 rounded-full`} style={{ width: `${country.percent}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders - 2 Columns */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Filter
              </button>
              <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50">See all</button>
            </div>
          </div>

          <div className="overflow-x-auto mt-5">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Products</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Country</th>
                  <th className="px-6 py-3">CR</th>
                  <th className="px-6 py-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {[
                  { name: 'TailGrids', cat: 'UI Kit', value: '$12,499', color: 'text-green-500' },
                  { name: 'GrayGrids', cat: 'Templates', value: '$5,498', color: 'text-green-500' },
                  { name: 'Uideck', cat: 'Templates', value: '$4,521', color: 'text-green-500' },
                  { name: 'FormBold', cat: 'SaaS', value: '$13,843', color: 'text-green-500' },
                  { name: 'NextAdmin', cat: 'Dashboard', value: '$7,523', color: 'text-green-500' },
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{order.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{order.cat}</td>
                    <td className="px-6 py-4"><div className="w-6 h-4 bg-gray-200 rounded-sm"></div></td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Dashboard</td>
                    <td className={`px-6 py-4 text-sm font-bold text-right ${order.color}`}>{order.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;