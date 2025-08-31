import React, { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardBody,
  Input,
  Select,
  Button,
  useColorModeValue,
  SimpleGrid,
  Avatar,
  Badge,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Checkbox,
  CheckboxGroup,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Divider,
  IconButton,
  Wrap,
  WrapItem,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiUsers, FiInstagram, FiYoutube, FiTwitter, FiLinkedin, FiEye, FiMessageSquare, FiHeart } from 'react-icons/fi';

const MotionBox = motion(Box);

interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  industry: string;
  followers: number;
  engagement: number;
  platforms: {
    name: string;
    followers: number;
    engagement: number;
    verified: boolean;
  }[];
  categories: string[];
  averageRate: number;
  rating: number;
  totalCampaigns: number;
  completedCampaigns: number;
  isAvailable: boolean;
  languages: string[];
  age: number;
  gender: 'male' | 'female' | 'other';
}

const InfluencerSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [followerRange, setFollowerRange] = useState([1000, 1000000]);
  const [engagementRange, setEngagementRange] = useState([1, 10]);
  const [rateRange, setRateRange] = useState([50, 5000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');

  const influencers: Influencer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      username: '@sarahjohnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Tech enthusiast and lifestyle content creator. Sharing insights about productivity, wellness, and the latest tech trends.',
      location: 'San Francisco, CA',
      industry: 'Technology',
      followers: 125000,
      engagement: 4.8,
      platforms: [
        { name: 'Instagram', followers: 85000, engagement: 5.2, verified: true },
        { name: 'YouTube', followers: 40000, engagement: 4.1, verified: false }
      ],
      categories: ['Technology', 'Lifestyle', 'Productivity'],
      averageRate: 2500,
      rating: 4.9,
      totalCampaigns: 15,
      completedCampaigns: 14,
      isAvailable: true,
      languages: ['English', 'Spanish'],
      age: 28,
      gender: 'female'
    },
    {
      id: '2',
      name: 'Alex Chen',
      username: '@alexchen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Fitness coach and nutrition expert. Helping people achieve their health goals through sustainable lifestyle changes.',
      location: 'Los Angeles, CA',
      industry: 'Health & Wellness',
      followers: 89000,
      engagement: 6.2,
      platforms: [
        { name: 'Instagram', followers: 60000, engagement: 7.1, verified: true },
        { name: 'TikTok', followers: 29000, engagement: 5.8, verified: false }
      ],
      categories: ['Fitness', 'Health', 'Nutrition'],
      averageRate: 1800,
      rating: 4.8,
      totalCampaigns: 12,
      completedCampaigns: 11,
      isAvailable: true,
      languages: ['English', 'Mandarin'],
      age: 32,
      gender: 'male'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      username: '@emmarodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Fashion blogger and style consultant. Creating content about sustainable fashion and personal style.',
      location: 'New York, NY',
      industry: 'Fashion',
      followers: 156000,
      engagement: 5.5,
      platforms: [
        { name: 'Instagram', followers: 120000, engagement: 6.0, verified: true },
        { name: 'TikTok', followers: 36000, engagement: 4.8, verified: false }
      ],
      categories: ['Fashion', 'Lifestyle', 'Sustainability'],
      averageRate: 3200,
      rating: 4.7,
      totalCampaigns: 18,
      completedCampaigns: 17,
      isAvailable: true,
      languages: ['English', 'Spanish'],
      age: 26,
      gender: 'female'
    },
    {
      id: '4',
      name: 'David Kim',
      username: '@davidkim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Gaming content creator and streamer. Building a community around competitive gaming and esports.',
      location: 'Seattle, WA',
      industry: 'Entertainment',
      followers: 234000,
      engagement: 3.9,
      platforms: [
        { name: 'YouTube', followers: 180000, engagement: 4.2, verified: true },
        { name: 'Twitch', followers: 54000, engagement: 3.5, verified: false }
      ],
      categories: ['Gaming', 'Entertainment', 'Esports'],
      averageRate: 4100,
      rating: 4.6,
      totalCampaigns: 22,
      completedCampaigns: 20,
      isAvailable: false,
      languages: ['English', 'Korean'],
      age: 24,
      gender: 'male'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      username: '@lisawang',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      bio: 'Food blogger and recipe developer. Sharing delicious recipes and cooking tips for home chefs.',
      location: 'Austin, TX',
      industry: 'Food & Beverage',
      followers: 78000,
      engagement: 7.8,
      platforms: [
        { name: 'Instagram', followers: 50000, engagement: 8.5, verified: true },
        { name: 'YouTube', followers: 28000, engagement: 6.9, verified: false }
      ],
      categories: ['Food', 'Cooking', 'Lifestyle'],
      averageRate: 1500,
      rating: 4.9,
      totalCampaigns: 9,
      completedCampaigns: 9,
      isAvailable: true,
      languages: ['English', 'Mandarin'],
      age: 29,
      gender: 'female'
    }
  ];

  const industries = ['Technology', 'Fashion', 'Health & Wellness', 'Food & Beverage', 'Entertainment', 'Travel', 'Education', 'Finance'];
  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn', 'Facebook', 'Twitch'];
  const categories = ['Technology', 'Lifestyle', 'Productivity', 'Fitness', 'Health', 'Nutrition', 'Fashion', 'Sustainability', 'Gaming', 'Entertainment', 'Esports', 'Food', 'Cooking', 'Travel', 'Education'];

  const filteredInfluencers = useMemo(() => {
    return influencers.filter(influencer => {
      const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           influencer.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = !selectedIndustry || influencer.industry === selectedIndustry;
      
      const matchesPlatforms = selectedPlatforms.length === 0 || 
                               selectedPlatforms.some(platform => 
                                 influencer.platforms.some(p => p.name === platform)
                               );
      
      const matchesCategories = selectedCategories.length === 0 || 
                               selectedCategories.some(category => 
                                 influencer.categories.includes(category)
                               );
      
      const matchesFollowers = influencer.followers >= followerRange[0] && influencer.followers <= followerRange[1];
      
      const matchesEngagement = influencer.engagement >= engagementRange[0] && influencer.engagement <= engagementRange[1];
      
      const matchesRate = influencer.averageRate >= rateRange[0] && influencer.averageRate <= rateRange[1];
      
      return matchesSearch && matchesIndustry && matchesPlatforms && matchesCategories && 
             matchesFollowers && matchesEngagement && matchesRate;
    });
  }, [searchTerm, selectedIndustry, selectedPlatforms, selectedCategories, followerRange, engagementRange, rateRange]);

  const sortedInfluencers = useMemo(() => {
    const sorted = [...filteredInfluencers];
    switch (sortBy) {
      case 'followers':
        return sorted.sort((a, b) => b.followers - a.followers);
      case 'engagement':
        return sorted.sort((a, b) => b.engagement - a.engagement);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'rate':
        return sorted.sort((a, b) => a.averageRate - b.averageRate);
      default:
        return sorted;
    }
  }, [filteredInfluencers, sortBy]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return FiInstagram;
      case 'YouTube': return FiYoutube;
      case 'Twitter': return FiTwitter;
      case 'LinkedIn': return FiLinkedin;
      default: return FiUsers;
    }
  };

  const InfluencerCard = ({ influencer }: { influencer: Influencer }) => (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm" h="full">
        <CardBody p={{ base: 4, md: 6 }}>
          <VStack spacing={4} align="stretch" h="full">
            {/* Header */}
            <HStack spacing={3} align="start">
              <Avatar
                size="lg"
                src={influencer.avatar}
                name={influencer.name}
              />
              <VStack align="start" spacing={1} flex={1}>
                <HStack spacing={2} align="center">
                  <Text fontWeight="bold" fontSize="lg">{influencer.name}</Text>
                  {influencer.platforms.some(p => p.verified) && (
                    <Badge colorScheme="blue" variant="subtle" size="sm">✓ Verified</Badge>
                  )}
                </HStack>
                <Text fontSize="sm" color="purple.500" fontWeight="medium">
                  {influencer.username}
                </Text>
                <HStack spacing={2} align="center">
                  <Icon as={FiMapPin} boxSize={3} color={mutedTextColor} />
                  <Text fontSize="xs" color={mutedTextColor}>{influencer.location}</Text>
                </HStack>
              </VStack>
              <Badge colorScheme={influencer.isAvailable ? 'green' : 'red'} variant="subtle">
                {influencer.isAvailable ? 'Available' : 'Busy'}
              </Badge>
            </HStack>

            {/* Bio */}
            <Text fontSize="sm" color={mutedTextColor} noOfLines={2}>
              {influencer.bio}
            </Text>

            {/* Stats */}
            <SimpleGrid columns={3} spacing={3}>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="purple.500">
                  {formatNumber(influencer.followers)}
                </Text>
                <Text fontSize="xs" color={mutedTextColor}>Followers</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  {influencer.engagement}%
                </Text>
                <Text fontSize="xs" color={mutedTextColor}>Engagement</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="blue.500">
                  {influencer.rating}
                </Text>
                <Text fontSize="xs" color={mutedTextColor}>Rating</Text>
              </Box>
            </SimpleGrid>

            {/* Platforms */}
            <Box>
              <Text fontSize="xs" color={mutedTextColor} mb={2}>Top Platforms</Text>
              <VStack spacing={2} align="stretch">
                {influencer.platforms.slice(0, 2).map((platform) => (
                  <HStack key={platform.name} justify="space-between">
                    <HStack spacing={2}>
                      <Icon as={getPlatformIcon(platform.name)} boxSize={4} color="purple.500" />
                      <Text fontSize="sm" fontWeight="medium">{platform.name}</Text>
                    </HStack>
                    <Text fontSize="xs" color={mutedTextColor}>
                      {formatNumber(platform.followers)} • {platform.engagement}%
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Categories */}
            <Box>
              <Text fontSize="xs" color={mutedTextColor} mb={2}>Categories</Text>
              <Wrap spacing={2}>
                {influencer.categories.slice(0, 3).map((category) => (
                  <WrapItem key={category}>
                    <Badge colorScheme="purple" variant="subtle" size="sm">
                      {category}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>

            {/* Rate and Campaigns */}
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="medium">
                  {formatCurrency(influencer.averageRate)}
                </Text>
                <Text fontSize="xs" color={mutedTextColor}>per campaign</Text>
              </VStack>
              <VStack align="end" spacing={0}>
                <Text fontSize="sm" fontWeight="medium">
                  {influencer.completedCampaigns}/{influencer.totalCampaigns}
                </Text>
                <Text fontSize="xs" color={mutedTextColor}>campaigns</Text>
              </VStack>
            </HStack>

            {/* Actions */}
            <HStack spacing={2} mt="auto">
              <Button
                size="sm"
                variant="outline"
                colorScheme="purple"
                flex={1}
                onClick={() => {
                  setSelectedInfluencer(influencer);
                  onOpen();
                }}
                leftIcon={<FiEye />}
              >
                View Profile
              </Button>
              <IconButton
                aria-label="Send message"
                icon={<FiMessageSquare />}
                size="sm"
                variant="outline"
                colorScheme="green"
              />
              <IconButton
                aria-label="Save to favorites"
                icon={<FiHeart />}
                size="sm"
                variant="outline"
                colorScheme="red"
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </MotionBox>
  );

  const FilterDrawer = () => (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottom="1px" borderColor={borderColor}>
          Filters
        </DrawerHeader>
        <DrawerBody p={4}>
          <VStack spacing={6} align="stretch">
            {/* Industry */}
            <Box>
              <Text fontWeight="medium" mb={3}>Industry</Text>
              <Select
                placeholder="All Industries"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                size="sm"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </Select>
            </Box>

            {/* Platforms */}
            <Box>
              <Text fontWeight="medium" mb={3}>Platforms</Text>
              <CheckboxGroup value={selectedPlatforms} onChange={(values) => setSelectedPlatforms(values as string[])}>
                <VStack align="start" spacing={2}>
                  {platforms.map((platform) => (
                    <Checkbox key={platform} value={platform} size="sm">
                      {platform}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Box>

            {/* Categories */}
            <Box>
              <Text fontWeight="medium" mb={3}>Categories</Text>
              <CheckboxGroup value={selectedCategories} onChange={(values) => setSelectedCategories(values as string[])}>
                <VStack align="start" spacing={2} maxH="200px" overflowY="auto">
                  {categories.map((category) => (
                    <Checkbox key={category} value={category} size="sm">
                      {category}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Box>

            {/* Follower Range */}
            <Box>
              <Text fontWeight="medium" mb={3}>Followers Range</Text>
              <RangeSlider
                value={followerRange}
                onChange={setFollowerRange}
                min={1000}
                max={1000000}
                step={1000}
                size="lg"
              >
                <RangeSliderMark value={1000} mt={2} fontSize="xs">1K</RangeSliderMark>
                <RangeSliderMark value={1000000} mt={2} fontSize="xs">1M</RangeSliderMark>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Text fontSize="xs" color={mutedTextColor} textAlign="center">
                {formatNumber(followerRange[0])} - {formatNumber(followerRange[1])}
              </Text>
            </Box>

            {/* Engagement Range */}
            <Box>
              <Text fontWeight="medium" mb={3}>Engagement Rate (%)</Text>
              <RangeSlider
                value={engagementRange}
                onChange={setEngagementRange}
                min={1}
                max={10}
                step={0.1}
                size="lg"
              >
                <RangeSliderMark value={1} mt={2} fontSize="xs">1%</RangeSliderMark>
                <RangeSliderMark value={10} mt={2} fontSize="xs">10%</RangeSliderMark>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Text fontSize="xs" color={mutedTextColor} textAlign="center">
                {engagementRange[0]}% - {engagementRange[1]}%
              </Text>
            </Box>

            {/* Rate Range */}
            <Box>
              <Text fontWeight="medium" mb={3}>Rate Range (USD)</Text>
              <RangeSlider
                value={rateRange}
                onChange={setRateRange}
                min={50}
                max={5000}
                step={50}
                size="lg"
              >
                <RangeSliderMark value={50} mt={2} fontSize="xs">$50</RangeSliderMark>
                <RangeSliderMark value={5000} mt={2} fontSize="xs">$5K</RangeSliderMark>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Text fontSize="xs" color={mutedTextColor} textAlign="center">
                {formatCurrency(rateRange[0])} - {formatCurrency(rateRange[1])}
              </Text>
            </Box>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => {
                setSelectedIndustry('');
                setSelectedPlatforms([]);
                setSelectedCategories([]);
                setFollowerRange([1000, 1000000]);
                setEngagementRange([1, 10]);
                setRateRange([50, 5000]);
              }}
              size="sm"
            >
              Clear All Filters
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Box>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
      >
        <VStack align="start" spacing={2}>
          <Heading size="lg" bgGradient="linear(to-r, purple.500, blue.500)" bgClip="text">
            Influencer Search 🔍
          </Heading>
          <Text color={mutedTextColor}>
            Find the perfect influencers for your campaigns
          </Text>
        </VStack>
      </MotionBox>

      {/* Search and Filters */}
      <Card bg={bgColor} border="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <VStack spacing={4}>
            {/* Search Bar */}
            <Box position="relative" w="full">
              <Input
                placeholder="Search influencers by name, username, or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="lg"
                pl={12}
                borderRadius="lg"
              />
              <Icon
                as={FiSearch}
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                color="gray.400"
                boxSize={5}
              />
            </Box>

            {/* Filters Row */}
            <HStack spacing={4} w="full" flexWrap="wrap">
              <Select
                placeholder="Sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="md"
                w={{ base: 'full', md: 'auto' }}
              >
                <option value="relevance">Relevance</option>
                <option value="followers">Followers</option>
                <option value="engagement">Engagement</option>
                <option value="rating">Rating</option>
                <option value="rate">Rate</option>
              </Select>

              <Button
                leftIcon={<FiFilter />}
                variant="outline"
                onClick={onOpen}
                size="md"
                w={{ base: 'full', md: 'auto' }}
              >
                Filters ({filteredInfluencers.length} results)
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Results */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {sortedInfluencers.map((influencer) => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </SimpleGrid>

      {/* No Results */}
      {sortedInfluencers.length === 0 && (
        <Card bg={bgColor} border="1px" borderColor={borderColor}>
          <CardBody textAlign="center" py={12}>
            <VStack spacing={4}>
              <Icon as={FiSearch} boxSize={12} color="gray.400" />
              <Text fontSize="lg" fontWeight="medium" color="gray.600">
                No influencers found
              </Text>
              <Text fontSize="sm" color="gray.500">
                Try adjusting your search criteria or filters
              </Text>
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Filter Drawer */}
      <FilterDrawer />

      {/* Influencer Details Drawer */}
      <Drawer isOpen={!!selectedInfluencer} placement="right" onClose={() => setSelectedInfluencer(null)} size={{ base: 'full', md: 'md' }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" borderColor={borderColor}>
            {selectedInfluencer?.name}
          </DrawerHeader>
          <DrawerBody p={6}>
            {selectedInfluencer && (
              <VStack spacing={6} align="stretch">
                <HStack spacing={4}>
                  <Avatar size="xl" src={selectedInfluencer.avatar} name={selectedInfluencer.name} />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xl" fontWeight="bold">{selectedInfluencer.name}</Text>
                    <Text fontSize="md" color="purple.500">{selectedInfluencer.username}</Text>
                    <Text fontSize="sm" color={mutedTextColor}>{selectedInfluencer.location}</Text>
                  </VStack>
                </HStack>

                <Text fontSize="md">{selectedInfluencer.bio}</Text>

                <SimpleGrid columns={3} spacing={4}>
                  <Stat>
                    <StatLabel>Followers</StatLabel>
                    <StatNumber color="purple.500">{formatNumber(selectedInfluencer.followers)}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Engagement</StatLabel>
                    <StatNumber color="green.500">{selectedInfluencer.engagement}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Rating</StatLabel>
                    <StatNumber color="blue.500">{selectedInfluencer.rating}</StatNumber>
                  </Stat>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Text fontWeight="medium" mb={3}>Platforms</Text>
                  <VStack spacing={3} align="stretch">
                    {selectedInfluencer.platforms.map((platform) => (
                      <HStack key={platform.name} justify="space-between" p={3} bg="gray.50" borderRadius="lg">
                        <HStack spacing={3}>
                          <Icon as={getPlatformIcon(platform.name)} boxSize={5} color="purple.500" />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">{platform.name}</Text>
                            <Text fontSize="sm" color={mutedTextColor}>
                              {formatNumber(platform.followers)} followers
                            </Text>
                          </VStack>
                        </HStack>
                        <VStack align="end" spacing={0}>
                          <Text fontWeight="medium" color="green.500">{platform.engagement}%</Text>
                          <Text fontSize="xs" color={mutedTextColor}>engagement</Text>
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <HStack spacing={4} mt="auto">
                  <Button colorScheme="purple" flex={1} leftIcon={<FiMessageSquare />}>
                    Send Message
                  </Button>
                  <Button variant="outline" colorScheme="green" leftIcon={<FiHeart />}>
                    Save
                  </Button>
                </HStack>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default InfluencerSearch;
