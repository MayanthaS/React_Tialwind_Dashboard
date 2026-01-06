import React, { useState } from 'react';

// Type definitions
type StatusType = 'All' | 'Delivered' | 'In-Transit' | 'Pending' | 'Processing';
type OrderStatus = 'Delivered' | 'In Transit' | 'Pending' | 'Processing';

interface LogisticsOrder {
  id: string;
  category: string;
  company: string;
  arrivalTime: string;
  route: string;
  price: string;
  status: OrderStatus;
}

const DeliveryActivities: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<StatusType>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const orders: LogisticsOrder[] = [
    {
      id: '#324112',
      category: 'Furniture',
      company: 'HomeLine',
      arrivalTime: '10 Apr 2028 2:15 pm',
      route: 'Berlin-Milan',
      price: '$1,250.00',
      status: 'Delivered'
    },
    {
      id: '#325678',
      category: 'Clothing',
      company: 'StylePro',
      arrivalTime: '21 May 2028 9:00 am',
      route: 'Paris-Rome',
      price: '$340.75',
      status: 'Delivered'
    },
    {
      id: '#326789',
      category: 'Books',
      company: 'EduSource',
      arrivalTime: '02 Jun 2028 11:45 am',
      route: 'New York-Chicago',
      price: '$128.40',
      status: 'In Transit'
    },
    {
      id: '#327003',
      category: 'Automotive',
      company: 'AutoParis Co.',
      arrivalTime: '18 Mar 2028 4:00 pm',
      route: 'Tokyo-Osaka',
      price: '$2,150.89',
      status: 'Delivered'
    },
    {
      id: '#328556',
      category: 'Electronics',
      company: 'TechNova',
      arrivalTime: '25 Jul 2028 10:30 am',
      route: 'San Francisco-Seattle',
      price: '$849.99',
      status: 'Delivered'
    },
    {
      id: '#329001',
      category: 'Medical',
      company: 'HealthPlus',
      arrivalTime: '15 Aug 2028 3:30 pm',
      route: 'London-Madrid',
      price: '$3,450.25',
      status: 'Processing'
    },
    {
      id: '#329002',
      category: 'Food',
      company: 'FreshFoods Inc.',
      arrivalTime: '22 Sep 2028 8:45 am',
      route: 'Miami-Atlanta',
      price: '$680.50',
      status: 'Pending'
    },
    {
      id: '#329003',
      category: 'Electronics',
      company: 'TechGadgets',
      arrivalTime: '05 Oct 2028 1:15 pm',
      route: 'Singapore-Kuala Lumpur',
      price: '$1,250.75',
      status: 'In Transit'
    },
    {
      id: '#329004',
      category: 'Furniture',
      company: 'OfficePro',
      arrivalTime: '12 Nov 2028 6:30 pm',
      route: 'Sydney-Melbourne',
      price: '$890.20',
      status: 'Delivered'
    },
    {
      id: '#329005',
      category: 'Clothing',
      company: 'FashionHub',
      arrivalTime: '20 Dec 2028 11:00 am',
      route: 'Toronto-Vancouver',
      price: '$420.90',
      status: 'In Transit'
    }
  ];

  const statusOptions: StatusType[] = ['All', 'Delivered', 'In-Transit', 'Pending', 'Processing'];

  const filteredOrders = selectedStatus === 'All' 
    ? orders 
    : orders.filter(order => {
        if (selectedStatus === 'In-Transit') return order.status === 'In Transit';
        return order.status === selectedStatus;
      });

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleStatusClick = (status: StatusType) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'furniture':
        return '🛋️';
      case 'clothing':
        return '👕';
      case 'books':
        return '📚';
      case 'automotive':
        return '🚗';
      case 'electronics':
        return '💻';
      case 'medical':
        return '🏥';
      case 'food':
        return '🍎';
      default:
        return '📦';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Delivery Activities</h2>
          <p className="text-sm text-gray-500">Track your recent shipping activities</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusClick(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Arrival Time
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {currentOrders.map((order, index) => (
              <tr 
                key={order.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => console.log('Order clicked:', order.id)}
              >
                {/* Order ID */}
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-900">{order.id}</span>
                </td>

                {/* Category */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(order.category)}</span>
                    <span className="text-sm text-gray-700">{order.category}</span>
                  </div>
                </td>

                {/* Company */}
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-700">{order.company}</span>
                </td>

                {/* Arrival Time */}
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {order.arrivalTime.split(' ')[0]} {order.arrivalTime.split(' ')[1]} {order.arrivalTime.split(' ')[2]}
                    </span>
                    <span className="text-xs text-gray-500">
                      {order.arrivalTime.split(' ')[3]} {order.arrivalTime.split(' ')[4]}
                    </span>
                  </div>
                </td>

                {/* Route */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{order.route}</span>
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-900">{order.price}</span>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {currentOrders.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No {selectedStatus === 'All' ? '' : selectedStatus.toLowerCase()} orders available.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t border-gray-200 gap-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryActivities;