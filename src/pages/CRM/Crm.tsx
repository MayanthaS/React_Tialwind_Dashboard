import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const Dropdown = ({ isOpen, children, className }) => 
  isOpen ? <div className={`absolute right-0 mt-2 bg-white shadow-lg border rounded-xl z-10 ${className}`}>{children}</div> : null;

const DropdownItem = ({ children, onItemClick, className }) => 
  <button onClick={onItemClick} className={className}>{children}</button>;

const MoreDotIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const Crm = () => {
  const lineChartRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Gauge configuration for Monthly Target
  const gaugePercentage = 75;
  const radius = 90;
  const strokeWidth = 16;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (gaugePercentage / 100) * circumference;

  useEffect(() => {
    if (!lineChartRef.current) return;
    const existingChart = ChartJS.getChart(lineChartRef.current);
    if (existingChart) existingChart.destroy();

    new ChartJS(lineChartRef.current, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          { 
            label: 'Current Year', 
            data: [180, 190, 170, 160, 175, 165, 200, 230, 220, 190, 210, 205], 
            borderColor: '#4f46e5', 
            backgroundColor: 'rgba(79, 70, 229, 0.1)', 
            fill: true, 
            tension: 0.4, 
            pointRadius: 0 
          },
          { 
            label: 'Last Year', 
            data: [40, 30, 35, 20, 30, 45, 70, 80, 95, 110, 100, 90], 
            borderColor: '#818cf8', 
            borderDash: [5, 5], 
            tension: 0.4, 
            pointRadius: 0 
          },
        ],
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } } 
      },
    });
  }, []);

  return (
    <div className="p-8 bg-[#f8fafd] min-h-screen font-sans text-slate-800">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Active Deal', value: '$120,369', change: '+20%', color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Revenue Total', value: '$234,210', change: '+9.0%', color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Closed Deals', value: '874', change: '-4.5%', color: 'text-red-500', bg: 'bg-red-50' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-4xl font-bold mb-4">{card.value}</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">{card.label}</span>
              <span className={`${card.color} ${card.bg} px-2 py-1 rounded-lg text-sm font-bold`}>
                {card.change} <span className="text-gray-400 font-normal text-xs ml-1">From last month</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: Statistics & Monthly Target */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold">Statistics</h3>
              <p className="text-gray-400 text-sm">Target you've set for each month</p>
            </div>
            <div className="bg-gray-50 p-1 rounded-xl flex gap-1">
              {['Monthly', 'Quarterly', 'Annually'].map((t) => (
                <button 
                  key={t} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${t === 'Monthly' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-12 mb-8">
            <div>
              <span className="text-2xl font-bold">$212,142.12</span>
              <p className="text-gray-400 text-xs mt-1">Avg. Yearly Profit</p>
            </div>
            <div>
              <span className="text-2xl font-bold">$30,321.23</span>
              <p className="text-gray-400 text-xs mt-1">Avg. Yearly Profit</p>
            </div>
          </div>
          <div className="h-64">
            <canvas ref={lineChartRef}></canvas>
          </div>
        </div>

        {/* Monthly Target Card with Custom SVG Gauge */}
        <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 pt-6 pb-8 bg-white">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Monthly Target</h3>
                <p className="mt-1 text-xs text-gray-500">Target you've set for each month</p>
              </div>
              <div className="relative">
                <button onClick={toggleDropdown}>
                  <MoreDotIcon className="text-gray-400 hover:text-gray-700 w-6 h-6" />
                </button>
                <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
                  <DropdownItem 
                    onItemClick={closeDropdown} 
                    className="flex w-full p-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg"
                  >
                    View More
                  </DropdownItem>
                  <DropdownItem 
                    onItemClick={closeDropdown} 
                    className="flex w-full p-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    Delete
                  </DropdownItem>
                </Dropdown>
              </div>
            </div>

            {/* Custom SVG Gauge */}
            <div className="relative flex justify-center mt-4">
              <svg width="240" height="160" viewBox="0 0 240 160" className="overflow-visible">
                {/* Background arc */}
                <path
                  d="M 28 120 A 92 92 0 0 1 212 120"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                {/* Progress arc */}
                <path
                  d="M 28 120 A 92 92 0 0 1 212 120"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: 'stroke-dashoffset 1s ease-out',
                    transformOrigin: 'center',
                  }}
                />
                {/* Center text */}
                <text 
                  x="120" 
                  y="90" 
                  textAnchor="middle" 
                  fontSize="16" 
                  fill="#64748b" 
                  fontWeight="400"
                >
                  June Goals
                </text>
                <text 
                  x="120" 
                  y="120" 
                  textAnchor="middle" 
                  fontSize="30" 
                  fill="#1e293b" 
                  fontWeight="700"
                >
                  $90
                </text>
              </svg>
              <span className="absolute bottom-0 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                +10%
              </span>
            </div>
            
            <p className="mx-auto mt-6 text-center text-sm text-gray-500 leading-relaxed">
              You earn $3287 today, it's higher than last month. Keep up your good work!
            </p>
          </div>

          <div className="mt-auto border-t border-gray-50 flex items-center justify-center gap-8 py-5">
            {[
              { l: 'Target', v: '$20K', up: false }, 
              { l: 'Revenue', v: '$20K', up: true }, 
              { l: 'Today', v: '$20K', up: true }
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="text-center">
                  <p className="mb-1 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                    {item.l}
                  </p>
                  <p className="flex items-center justify-center gap-1 text-lg font-bold">
                    {item.v}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path 
                        d={item.up ? "M8 2L13 7H3L8 2Z" : "M8 14L3 9H13L8 14Z"} 
                        fill={item.up ? "#039855" : "#D92D20"} 
                      />
                    </svg>
                  </p>
                </div>
                {idx < 2 && <div className="w-px bg-gray-100 h-6"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Sales Category, Upcoming Schedule & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Category */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xl font-bold">Sales Category</h3>
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <MoreDotIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          
          <div className="flex items-center gap-12">
            {/* Donut Chart */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                {/* Background circle */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="30" />
                {/* Affiliate Program - 48% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#4f46e5" strokeWidth="30"
                  strokeDasharray={`${48 * 5.03} ${100 * 5.03}`} strokeDashoffset="0" />
                {/* Direct Buy - 33% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#818cf8" strokeWidth="30"
                  strokeDasharray={`${33 * 5.03} ${100 * 5.03}`} strokeDashoffset={`${-48 * 5.03}`} />
                {/* Adsense - 19% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#c7d2fe" strokeWidth="30"
                  strokeDasharray={`${19 * 5.03} ${100 * 5.03}`} strokeDashoffset={`${-(48 + 33) * 5.03}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-gray-500 text-sm font-medium">Total</span>
                <span className="text-3xl font-bold">2450</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {[
                { name: 'Affiliate Program', percent: '48%', products: '2,040 Products', color: '#4f46e5' },
                { name: 'Direct Buy', percent: '33%', products: '1,402 Products', color: '#818cf8' },
                { name: 'Adsense', percent: '19%', products: '510 Products', color: '#c7d2fe' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-1" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.percent} <span className="text-gray-400">• {item.products}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xl font-bold">Upcoming Schedule</h3>
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <MoreDotIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            {[
              { date: 'Wed, 11 jan', time: '09:20 AM', title: 'Business Analytics Press', desc: 'Exploring the Future of Data-Driven +6 more' },
              { date: 'Fri, 15 feb', time: '10:35 AM', title: 'Business Sprint', desc: 'Techniques from Business Sprint +2 more' },
              { date: 'Thu, 18 mar', time: '1:15 AM', title: 'Customer Review Meeting', desc: 'Insights from the Customer Review Meeting +8 more' }
            ].map((event, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <p className="text-sm font-semibold text-gray-900">{event.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{event.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Recent Orders</h3>
          <div className="flex gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr className="text-left">
                <th className="pb-4 font-semibold text-gray-500 text-sm">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                </th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Deal ID</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Customer</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Product/Service</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Deal Value</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Close Date</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Status</th>
                <th className="pb-4 font-semibold text-gray-500 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'DE124321', name: 'John Doe', email: 'johndoe@gmail.com', product: 'Software License', value: '$18,50.34', date: '2024-06-15', status: 'Complete' },
                { id: 'DE124322', name: 'Jane Smith', email: 'janesmith@gmail.com', product: 'Consulting Service', value: '$25,00.00', date: '2024-06-18', status: 'Pending' },
                { id: 'DE124323', name: 'Bob Johnson', email: 'bobjohnson@gmail.com', product: 'Cloud Storage', value: '$12,99.99', date: '2024-06-20', status: 'Complete' }
              ].map((order, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  </td>
                  <td className="py-4 font-medium">{order.id}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                        {order.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{order.name}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">{order.product}</td>
                  <td className="py-4 font-semibold">{order.value}</td>
                  <td className="py-4 text-gray-600">{order.date}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      order.status === 'Complete' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Crm;