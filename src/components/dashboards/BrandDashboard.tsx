import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../ui/DashboardLayout';
import BrandMainDashboard from './brand/BrandMainDashboard';
import Campaigns from './brand/Campaigns';
import CreateCampaign from './brand/CreateCampaign';
import InfluencerSearch from './brand/InfluencerSearch';
import BrandAnalytics from './brand/BrandAnalytics';
import AdSpend from './brand/AdSpend';
import Messages from './brand/Messages';

const BrandDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/dashboard" element={<BrandMainDashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/influencers" element={<InfluencerSearch />} />
        <Route path="/analytics" element={<BrandAnalytics />} />
        <Route path="/ad-spend" element={<AdSpend />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<BrandMainDashboard />} />
      </Routes>
    </DashboardLayout>
  );
};

export default BrandDashboard;
