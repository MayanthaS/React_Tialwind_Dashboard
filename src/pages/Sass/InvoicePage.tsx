import React from 'react';

const InvoicesPage = () => {
  const invoices = [
    {
      serialNo: '#DF429',
      closeDate: 'April 28, 2016',
      user: 'Jenny Wilson',
      amount: '$473.85',
      status: 'Complete',
    },
    {
      serialNo: '#HTY274',
      closeDate: 'October 30, 2017',
      user: 'Wade Warren',
      amount: '$293.01',
      status: 'Complete',
    },
    {
      serialNo: '#LKE600',
      closeDate: 'May 29, 2017',
      user: 'Darlene Robertson',
      amount: '$782.01',
      status: 'Pending',
    },
    {
      serialNo: '#HRP447',
      closeDate: 'May 20, 2015',
      user: 'Arlene McCoy',
      amount: '$202.87',
      status: 'Cancelled',
    },
    {
      serialNo: '#WRH647',
      closeDate: 'March 13, 2014',
      user: 'Bessie Cooper',
      amount: '$490.51',
      status: 'Complete',
    },
  ];

  const activities = [
    {
      name: 'Francisco Grbbs',
      action: 'created invoice',
      invoice: 'PQ-4491C',
      time: 'Just Now',
      avatar: 'https://i.pravatar.cc/150?img=12',
      badge: 'New invoice',
    },
    {
      name: 'Courtney Henry',
      action: 'created invoice',
      invoice: 'HK-234G',
      time: '15 minutes ago',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    {
      name: 'Bessie Cooper',
      action: 'created invoice',
      invoice: 'LH-2891C',
      time: '5 months ago',
      avatar: 'https://i.pravatar.cc/150?img=45',
    },
    {
      name: 'Theresa Web',
      action: 'created invoice',
      invoice: 'CK-125NH',
      time: '2 weeks ago',
      avatar: 'https://i.pravatar.cc/150?img=25',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Cancelled':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Invoices
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Serial No:
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Close Date
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      User
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Amount
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">
                        {invoice.serialNo}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                        {invoice.closeDate}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                        {invoice.user}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">
                        {invoice.amount}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Activities - Takes 1 column */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activities</h2>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={activity.avatar}
                      alt={activity.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {activity.badge && (
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-xs font-medium text-green-600">
                          {activity.badge}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-semibold">{activity.name}</span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </span>
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium mt-1">
                      {activity.invoice}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;