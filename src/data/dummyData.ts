import type { Influencer, Brand, Campaign, Application, Notification, LeaderboardEntry, Message } from '../types/index';

export const dummyInfluencers: Influencer[] = [
  {
    id: 'inf1',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    userType: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    isOnboarded: true,
    niche: ['Fashion', 'Lifestyle', 'Beauty'],
    platforms: [
      { name: 'instagram', followers: 125000, engagementRate: 4.2, verified: true },
      { name: 'tiktok', followers: 89000, engagementRate: 6.8, verified: false },
      { name: 'youtube', followers: 45000, engagementRate: 3.1, verified: false }
    ],
    audienceSize: 259000,
    engagementRate: 4.7,
    averageLikes: 5200,
    averageComments: 320,
    reach: 180000,
    location: 'Los Angeles, CA',
    bio: 'Fashion enthusiast sharing style tips and lifestyle content ✨',
    earnings: 8500,
    rank: 1,
    isVerified: true
  },
  {
    id: 'inf2',
    email: 'mike@example.com',
    name: 'Mike Chen',
    userType: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isOnboarded: true,
    niche: ['Tech', 'Gaming', 'Reviews'],
    platforms: [
      { name: 'youtube', followers: 220000, engagementRate: 5.2, verified: true },
      { name: 'instagram', followers: 95000, engagementRate: 3.8, verified: false },
      { name: 'twitter', followers: 67000, engagementRate: 4.1, verified: false }
    ],
    audienceSize: 382000,
    engagementRate: 4.4,
    averageLikes: 8900,
    averageComments: 450,
    reach: 250000,
    location: 'San Francisco, CA',
    bio: 'Tech reviewer and gaming enthusiast 🎮',
    earnings: 12000,
    rank: 2,
    isVerified: true
  },
  {
    id: 'inf3',
    email: 'emma@example.com',
    name: 'Emma Rodriguez',
    userType: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    isOnboarded: true,
    niche: ['Fitness', 'Health', 'Wellness'],
    platforms: [
      { name: 'instagram', followers: 180000, engagementRate: 5.8, verified: true },
      { name: 'tiktok', followers: 150000, engagementRate: 7.2, verified: true },
      { name: 'youtube', followers: 75000, engagementRate: 4.5, verified: false }
    ],
    audienceSize: 405000,
    engagementRate: 5.8,
    averageLikes: 7200,
    averageComments: 580,
    reach: 300000,
    location: 'Miami, FL',
    bio: 'Fitness coach helping you achieve your health goals 💪',
    earnings: 15000,
    rank: 3,
    isVerified: true
  }
];

export const dummyBrands: Brand[] = [
  {
    id: 'brand1',
    email: 'marketing@nike.com',
    name: 'John Smith',
    userType: 'brand',
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150',
    isOnboarded: true,
    companyName: 'Nike',
    industry: 'Sports & Fitness',
    budget: 50000,
    campaigns: [],
    adSpend: 25000,
    availableBalance: 25000
  },
  {
    id: 'brand2',
    email: 'campaigns@apple.com',
    name: 'Lisa Wang',
    userType: 'brand',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    isOnboarded: true,
    companyName: 'Apple',
    industry: 'Technology',
    budget: 100000,
    campaigns: [],
    adSpend: 60000,
    availableBalance: 40000
  }
];

export const dummyCampaigns: Campaign[] = [
  {
    id: 'camp1',
    title: 'Summer Fitness Challenge',
    description: 'Join our 30-day fitness challenge and inspire others to get active this summer!',
    brandId: 'brand1',
    brandName: 'Nike',
    budget: 15000,
    niche: ['Fitness', 'Health', 'Sports'],
    goals: ['Brand Awareness', 'Engagement', 'Sales'],
    timeline: {
      startDate: '2024-06-01',
      endDate: '2024-07-01'
    },
    status: 'active',
    requirements: ['Minimum 50K followers', 'Active fitness content', 'Engagement rate > 3%'],
    applications: [],
    performance: {
      impressions: 250000,
      clicks: 12500,
      spend: 12000,
      roi: 2.8,
      ctr: 5.0,
      reach: 180000
    }
  },
  {
    id: 'camp2',
    title: 'Tech Product Launch',
    description: 'Be among the first to review our latest tech innovation!',
    brandId: 'brand2',
    brandName: 'Apple',
    budget: 25000,
    niche: ['Tech', 'Reviews', 'Gaming'],
    goals: ['Product Launch', 'Reviews', 'Influencer Marketing'],
    timeline: {
      startDate: '2024-05-15',
      endDate: '2024-06-15'
    },
    status: 'active',
    requirements: ['Tech-focused content', 'Minimum 100K followers', 'Previous review experience'],
    applications: [],
    performance: {
      impressions: 400000,
      clicks: 20000,
      spend: 20000,
      roi: 3.2,
      ctr: 5.0,
      reach: 280000
    }
  }
];

export const dummyApplications: Application[] = [
  {
    id: 'app1',
    influencerId: 'inf3',
    influencerName: 'Emma Rodriguez',
    influencerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    campaignId: 'camp1',
    status: 'shortlisted',
    appliedAt: '2024-05-20T10:30:00Z',
    message: 'I love fitness challenges and would be excited to promote this campaign!'
  },
  {
    id: 'app2',
    influencerId: 'inf2',
    influencerName: 'Mike Chen',
    influencerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    campaignId: 'camp2',
    status: 'accepted',
    appliedAt: '2024-05-18T14:20:00Z',
    message: 'As a tech reviewer, I would love to be part of this product launch!'
  }
];

export const dummyNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'inf1',
    title: 'New Campaign Available',
    message: 'A new fitness campaign from Nike is now available for you!',
    type: 'campaign',
    isRead: false,
    timestamp: '2024-05-25T09:00:00Z',
    actionUrl: '/influencer/campaigns'
  },
  {
    id: 'notif2',
    userId: 'inf3',
    title: 'Application Shortlisted',
    message: 'Your application for Summer Fitness Challenge has been shortlisted!',
    type: 'application',
    isRead: false,
    timestamp: '2024-05-24T16:30:00Z',
    actionUrl: '/influencer/applications'
  }
];

export const dummyLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    influencerId: 'inf3',
    influencerName: 'Emma Rodriguez',
    influencerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    engagementRate: 5.8,
    followers: 405000,
    niche: ['Fitness', 'Health', 'Wellness']
  },
  {
    rank: 2,
    influencerId: 'inf1',
    influencerName: 'Sarah Johnson',
    influencerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    engagementRate: 4.7,
    followers: 259000,
    niche: ['Fashion', 'Lifestyle', 'Beauty']
  },
  {
    rank: 3,
    influencerId: 'inf2',
    influencerName: 'Mike Chen',
    influencerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    engagementRate: 4.4,
    followers: 382000,
    niche: ['Tech', 'Gaming', 'Reviews']
  }
];

export const dummyMessages: Message[] = [
  {
    id: 'msg1',
    senderId: 'brand1',
    receiverId: 'inf3',
    content: 'Hi Emma! We loved your application for our fitness campaign.',
    timestamp: '2024-05-24T10:00:00Z',
    isRead: true
  },
  {
    id: 'msg2',
    senderId: 'inf3',
    receiverId: 'brand1',
    content: 'Thank you! I\'m excited about the opportunity!',
    timestamp: '2024-05-24T10:05:00Z',
    isRead: true
  }
];

// Chart data for analytics
export const engagementData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  data: [4.2, 4.5, 4.8, 5.1, 5.8]
};

export const followersData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  data: [350000, 365000, 380000, 395000, 405000]
};

export const campaignPerformanceData = {
  categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  impressions: [50000, 65000, 80000, 95000],
  clicks: [2500, 3250, 4000, 4750],
  spend: [5000, 6500, 8000, 9500]
};
