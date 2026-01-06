import React, { useState } from 'react';

// Type definitions
type PeriodType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

interface ChartDataItem {
  month: string;
  shipment: number;
  delivery: number;
}

interface TrackingStep {
  date: string;
  time: string;
  status: string;
  icon: string;
}

const DeliveryDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('Monthly');

  // Placeholder image URLs
  const truckImage = "https://images.unsplash.com/photo-1560347876-aeef00ee3c68?w=400&h=300&fit=crop&auto=format";
  const courierImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&auto=format";
  const mapLocationImage = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop&auto=format";

  const chartData: ChartDataItem[] = [
    { month: 'Jan', shipment: 85, delivery: 90 },
    { month: 'Feb', shipment: 60, delivery: 50 },
    { month: 'Mar', shipment: 70, delivery: 65 },
    { month: 'Apr', shipment: 40, delivery: 25 },
    { month: 'May', shipment: 65, delivery: 75 },
    { month: 'Jun', shipment: 45, delivery: 65 },
    { month: 'Jul', shipment: 50, delivery: 70 },
    { month: 'Aug', shipment: 55, delivery: 85 },
    { month: 'Sep', shipment: 55, delivery: 30 },
    { month: 'Oct', shipment: 50, delivery: 70 },
    { month: 'Nov', shipment: 75, delivery: 85 },
    { month: 'Dec', shipment: 70, delivery: 95 },
  ];

  const trackingSteps: TrackingStep[] = [
    { date: '12 Apr 2028', time: '12:54', status: 'Picked up', icon: '📦' },
    { date: '12 Apr 2028', time: '12:58', status: 'In Transit', icon: '🚚' },
    { date: '13 Apr 2028', time: '--:--', status: 'Delivered', icon: '📋' },
  ];

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value as PeriodType);
  };

  const handleThreeDotsClick = (section: string) => {
    console.log(`Options clicked for ${section}`);
    // Add your logic here for handling three dots menu click
  };

  const handleMessageClick = () => {
    console.log('Message button clicked');
    // Add your logic here for handling message button click
  };

  const handleCallClick = () => {
    console.log('Call button clicked');
    // Add your logic here for handling call button click
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Statistics Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Delivery Statistics</h2>
                  <p className="text-sm text-gray-500">Total number of deliveries 70.5K</p>
                </div>
                <select 
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              {/* Legend */}
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                  <span className="text-sm text-gray-600">Shipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-sm text-gray-600">Delivery</span>
                </div>
              </div>

              {/* Chart */}
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                  <span>100%</span>
                  <span>80%</span>
                  <span>60%</span>
                  <span>40%</span>
                  <span>20%</span>
                  <span>0%</span>
                </div>

                {/* Chart area */}
                <div className="ml-12 h-full flex items-end justify-between gap-1">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 items-end h-52">
                        <div 
                          className="flex-1 bg-blue-300 rounded-t transition-all hover:opacity-80"
                          style={{ height: `${data.shipment}%` }}
                        ></div>
                        <div 
                          className="flex-1 bg-blue-600 rounded-t transition-all hover:opacity-80"
                          style={{ height: `${data.delivery}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row - Revenue and Vehicles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Total Revenue */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Total revenue earned</p>
                    <h3 className="text-3xl font-bold text-gray-900">$23,445,700</h3>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleThreeDotsClick('Revenue')}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-500 mb-2">Shipped quantities</p>
                  <div className="flex items-end justify-between">
                    <h4 className="text-3xl font-bold text-gray-900">9,258</h4>
                    <div className="w-32 h-12">
                      <svg viewBox="0 0 120 40" className="w-full h-full">
                        <path
                          d="M 0 30 Q 10 28 20 25 T 40 22 T 60 20 T 80 23 T 100 20 T 120 18"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Vehicles */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Delivery Vehicles</h3>
                    <p className="text-sm text-gray-500">Vehicles operating on the road</p>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleThreeDotsClick('Vehicles')}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-5xl font-bold text-gray-900 mb-2">29</h4>
                    <p className="text-sm text-green-600 font-medium mb-4">+3.85% than last Week</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">On-route</span>
                    </div>
                  </div>
                  <div className="w-40 h-32 flex items-center justify-center">
                    <img 
                      src={truckImage} 
                      alt="Delivery Truck" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tracking */}
          <div className="space-y-6">
            {/* Tracking Delivery Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Tracking Delivery</h3>
                  <p className="text-sm text-gray-500">Last viewed delivery history</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleThreeDotsClick('Tracking')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              {/* Map placeholder with image */}
              <div className="bg-gray-100 rounded-lg h-48 mb-6 relative overflow-hidden">
                <img 
                  src={mapLocationImage} 
                  alt="Delivery Map Location" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay elements */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded shadow text-xs font-medium">
                  View larger map
                </div>
                
                {/* Location marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-red-500 w-8 h-10 rounded-t-full rounded-b-full border-4 border-white shadow-lg relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-300 rounded-full"></div>
                  </div>
                  <p className="text-center text-xs font-semibold mt-1 bg-white px-2 py-1 rounded shadow-sm">BARIDHARA</p>
                </div>
                
                <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
                  Map data ©2026
                </div>
              </div>

              {/* Tracking ID */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Tracking ID</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">#28745-72809bjk</span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded">
                    In Transit
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                        index === 2 ? 'bg-gray-100' : 'bg-blue-50'
                      }`}>
                        {step.icon}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm text-gray-500">{step.date}</p>
                        <p className="text-sm text-gray-400">{step.time}</p>
                      </div>
                      <p className={`font-semibold ${index === 2 ? 'text-gray-400' : 'text-gray-900'}`}>
                        {step.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier Info */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={courierImage} 
                        alt="Courier" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Courier</p>
                      <p className="font-semibold text-gray-900">David walthen</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      onClick={handleMessageClick}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                    <button 
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      onClick={handleCallClick}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;