import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../ui/DashboardLayout';
import InfluencerMainDashboard from './influencer/InfluencerMainDashboard';
// import InfluencerAnalytics from './influencer/InfluencerAnalytics';
import ExploreBrands from './influencer/ExploreBrands';
import MyApplications from './influencer/MyApplications';
import Earnings from './influencer/Earnings';
import Leaderboard from './influencer/Leaderboard';
import Messages from './influencer/Messages';

const InfluencerDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/dashboard" element={<InfluencerMainDashboard />} />
        {/* <Route path="/analytics" element={<InfluencerAnalytics />} /> */}
        <Route path="/brands" element={<ExploreBrands />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<InfluencerMainDashboard />} />
      </Routes>
    </DashboardLayout>
  );
};

export default InfluencerDashboard;
