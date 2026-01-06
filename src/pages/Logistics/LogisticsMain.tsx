import React from 'react'
import LogisticsOverview from './LogisticsOverview'
import DiliveryDashboard from './DiliveryDashboard'
import  DeliveryActivities from './DeliveryActivities'

function LogisticsMain() {
  return (
    <div>
      <LogisticsOverview/>
      <DiliveryDashboard/>
      < DeliveryActivities/>
    </div>
  )
}

export default LogisticsMain
