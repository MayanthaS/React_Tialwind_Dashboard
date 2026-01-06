import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip);

const Saaschartoverview = () => {
  const [activeTab, setActiveTab] = useState('Daily Sales');
  const conversionChartRef = useRef<HTMLCanvasElement>(null);
  const productChartRef = useRef<HTMLCanvasElement>(null);
  const conversionChartInstance = useRef<ChartJS | null>(null);
  const productChartInstance = useRef<ChartJS | null>(null);

  const tabs = ['Daily Sales', 'Online Sales', 'New Users'];

  // Conversion Funnel Chart Data
  useEffect(() => {
    if (!conversionChartRef.current) return;

    const ctx = conversionChartRef.current.getContext('2d');
    if (!ctx) return;

    if (conversionChartInstance.current) {
      conversionChartInstance.current.destroy();
      conversionChartInstance.current = null;
    }

    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Ad Impression',
          data: [45, 52, 60, 65, 30, 42, 60, 62],
          backgroundColor: '#1e40af',
          stack: 'stack0',
        },
        {
          label: 'Website Session',
          data: [20, 25, 18, 22, 20, 28, 22, 25],
          backgroundColor: '#3b82f6',
          stack: 'stack0',
        },
        {
          label: 'App Download',
          data: [15, 18, 15, 18, 15, 20, 18, 20],
          backgroundColor: '#60a5fa',
          stack: 'stack0',
        },
        {
          label: 'New Users',
          data: [12, 15, 12, 15, 10, 15, 15, 18],
          backgroundColor: '#93c5fd',
          stack: 'stack0',
        },
      ],
    };

    conversionChartInstance.current = new ChartJS(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#111827',
            bodyColor: '#4f46e5',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 12,
              },
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 120,
            ticks: {
              stepSize: 20,
              color: '#6b7280',
              font: {
                size: 12,
              },
            },
            grid: {
              color: '#e5e7eb',
            },
            border: {
              display: false,
            },
          },
        },
      } as ChartOptions<'bar'>,
    });

    return () => {
      if (conversionChartInstance.current) {
        conversionChartInstance.current.destroy();
        conversionChartInstance.current = null;
      }
    };
  }, []);

  // Product Performance Chart Data
  useEffect(() => {
    if (!productChartRef.current) return;

    const ctx = productChartRef.current.getContext('2d');
    if (!ctx) return;

    if (productChartInstance.current) {
      productChartInstance.current.destroy();
      productChartInstance.current = null;
    }

    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [150, 380, 200, 280, 170, 180, 170],
          backgroundColor: '#4f46e5',
          borderRadius: 4,
          maxBarThickness: 40,
        },
      ],
    };

    productChartInstance.current = new ChartJS(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#111827',
            bodyColor: '#4f46e5',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            max: 400,
            ticks: {
              stepSize: 100,
              color: '#6b7280',
              font: {
                size: 12,
              },
            },
            grid: {
              color: '#e5e7eb',
            },
            border: {
              display: false,
            },
          },
        },
      } as ChartOptions<'bar'>,
    });

    return () => {
      if (productChartInstance.current) {
        productChartInstance.current.destroy();
        productChartInstance.current = null;
      }
    };
  }, [activeTab]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Row - Churn Rate and User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Churn Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Churn Rate</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Downgrade to Free plan</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4.26%</p>
              <p className="text-sm text-red-600 font-medium">0.31% than last Week</p>
            </div>
            <div className="w-32 h-16">
              <svg viewBox="0 0 120 60" className="w-full h-full">
                <path
                  d="M 0 40 Q 20 35 40 30 T 80 38 T 120 45"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">User Growth</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">New signups website + mobile</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3,768</p>
              <p className="text-sm text-green-600 font-medium">+3.85% than last Week</p>
            </div>
            <div className="w-32 h-16">
              <svg viewBox="0 0 120 60" className="w-full h-full">
                <path
                  d="M 0 50 Q 20 45 40 40 T 80 25 T 120 15"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Conversion Funnel and Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Conversion Funnel</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1e40af]"></span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Ad Impression</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Website Session</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#60a5fa]"></span>
              <span className="text-xs text-gray-600 dark:text-gray-400">App Download</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#93c5fd]"></span>
              <span className="text-xs text-gray-600 dark:text-gray-400">New Users</span>
            </div>
          </div>

          <div className="h-[300px]">
            <canvas ref={conversionChartRef}></canvas>
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Product Performance</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-gray-900 dark:bg-gray-700 text-white'
                    : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Product Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Digital Product</p>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">790</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Physical Product</p>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">572</span>
              </div>
            </div>
          </div>

          {/* Average Daily Sales */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Daily Sales</p>
              <span className="text-sm text-red-600 font-medium">↓ 0.52%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">$2,950</p>
          </div>

          <div className="h-[180px]">
            <canvas ref={productChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saaschartoverview;