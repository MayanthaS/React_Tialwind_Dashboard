import React, { useState } from 'react';

const SaasOverview = () => {
  const [activeFilter, setActiveFilter] = useState('Weekly');

  const filters = ['Weekly', 'Monthly', 'Yearly'];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$200,45.87',
      change: '+2.5%',
      isPositive: true,
    },
    {
      title: 'Active Users',
      value: '9,528',
      change: '+9.5%',
      isPositive: true,
    },
    {
      title: 'Customer Lifetime Value',
      value: '$849.54',
      change: '-1.6%',
      isPositive: false,
    },
    {
      title: 'Customer Acquisition Cost',
      value: '9,528',
      change: '+3.5%',
      isPositive: true,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
        
        {/* Filter Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === filter
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              {stat.title}
            </h3>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <span
                className={`text-sm font-semibold ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaasOverview;