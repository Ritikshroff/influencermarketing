export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'influencer' | 'brand';
  avatar?: string;
  isOnboarded: boolean;
}

export interface Influencer extends User {
  userType: 'influencer';
  niche: string[];
  platforms: Platform[];
  audienceSize: number;
  engagementRate: number;
  averageLikes: number;
  averageComments: number;
  reach: number;
  location: string;
  bio: string;
  earnings: number;
  rank: number;
  isVerified: boolean;
}

export interface Brand extends User {
  userType: 'brand';
  companyName: string;
  industry: string;
  budget: number;
  campaigns: Campaign[];
  adSpend: number;
  availableBalance: number;
}

export interface Platform {
  name: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
  followers: number;
  engagementRate: number;
  verified: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  brandId: string;
  brandName: string;
  budget: number;
  niche: string[];
  goals: string[];
  timeline: {
    startDate: string;
    endDate: string;
  };
  status: 'active' | 'paused' | 'completed' | 'draft';
  requirements: string[];
  applications: Application[];
  performance: CampaignPerformance;
}

export interface Application {
  id: string;
  influencerId: string;
  influencerName: string;
  influencerAvatar: string;
  campaignId: string;
  status: 'applied' | 'shortlisted' | 'accepted' | 'rejected';
  appliedAt: string;
  message?: string;
  portfolio?: string[];
}

export interface CampaignPerformance {
  impressions: number;
  clicks: number;
  spend: number;
  roi: number;
  ctr: number;
  reach: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'campaign' | 'application' | 'message' | 'payment';
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface LeaderboardEntry {
  rank: number;
  influencerId: string;
  influencerName: string;
  influencerAvatar: string;
  engagementRate: number;
  followers: number;
  niche: string[];
}

export interface ChartData {
  name: string;
  data: number[];
  categories?: string[];
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  component: React.ComponentType<any>;
}
