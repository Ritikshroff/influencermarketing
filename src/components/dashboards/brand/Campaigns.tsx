import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardBody,
  Badge,
  Button,
  useColorModeValue,
  SimpleGrid,
  Progress,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMoreVertical, FiEye, FiEdit, FiTrash2, FiTrendingUp, FiCalendar, FiTarget } from 'react-icons/fi';

const MotionBox = motion(Box);

interface Campaign {
  id: string;
  title: string;
  description: string;
  industry: string;
  budget: number;
  spent: number;
  duration: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'paused' | 'completed' | 'draft';
  influencerCount: number;
  appliedInfluencers: number;
  platforms: string[];
  engagement: number;
  reach: number;
  conversions: number;
}

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'TechCorp Product Launch',
      description: 'Launch campaign for our new AI-powered productivity tool',
      industry: 'Technology',
      budget: 5000,
      spent: 3200,
      duration: 30,
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days from now
      status: 'active',
      influencerCount: 8,
      appliedInfluencers: 12,
      platforms: ['Instagram', 'YouTube', 'LinkedIn'],
      engagement: 4.2,
      reach: 125000,
      conversions: 89
    },
    {
      id: '2',
      title: 'Fashion Forward Collection',
      description: 'Promote our new sustainable fashion line',
      industry: 'Fashion',
      budget: 3000,
      spent: 1800,
      duration: 21,
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
      status: 'active',
      influencerCount: 5,
      appliedInfluencers: 8,
      platforms: ['Instagram', 'TikTok'],
      engagement: 5.8,
      reach: 89000,
      conversions: 67
    },
    {
      id: '3',
      title: 'Wellness App Promotion',
      description: 'Increase downloads for our meditation app',
      industry: 'Health & Wellness',
      budget: 4000,
      spent: 0,
      duration: 45,
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 52), // 52 days from now
      status: 'draft',
      influencerCount: 6,
      appliedInfluencers: 0,
      platforms: ['Instagram', 'YouTube', 'Podcasts'],
      engagement: 0,
      reach: 0,
      conversions: 0
    },
    {
      id: '4',
      title: 'Food Delivery Service',
      description: 'Promote our new food delivery platform',
      industry: 'Food & Beverage',
      budget: 2500,
      spent: 2500,
      duration: 14,
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
      endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
      status: 'completed',
      influencerCount: 4,
      appliedInfluencers: 6,
      platforms: ['Instagram', 'TikTok', 'Facebook'],
      engagement: 6.1,
      reach: 67000,
      conversions: 45
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'paused': return 'yellow';
      case 'completed': return 'blue';
      case 'draft': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return FiTrendingUp;
      case 'paused': return FiTarget;
      case 'completed': return FiCalendar;
      case 'draft': return FiEdit;
      default: return FiEdit;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleStatusChange = (campaignId: string, newStatus: Campaign['status']) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: newStatus }
        : campaign
    ));
  };

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm" h="full">
        <CardBody p={{ base: 4, md: 6 }}>
          <VStack spacing={4} align="stretch" h="full">
            {/* Header */}
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1} flex={1}>
                <Text fontWeight="bold" fontSize="lg" noOfLines={2}>
                  {campaign.title}
                </Text>
                <Text fontSize="sm" color={mutedTextColor} noOfLines={2}>
                  {campaign.description}
                </Text>
              </VStack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Campaign options"
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem icon={<FiEye />}>View Details</MenuItem>
                  <MenuItem icon={<FiEdit />}>Edit Campaign</MenuItem>
                  <MenuItem icon={<FiTrash2 />} color="red.500">Delete</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            {/* Status and Industry */}
            <HStack justify="space-between" align="center">
              <Badge colorScheme={getStatusColor(campaign.status)} variant="subtle" size="lg">
                <Icon as={getStatusIcon(campaign.status)} boxSize={3} mr={1} />
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
              <Badge colorScheme="purple" variant="outline">
                {campaign.industry}
              </Badge>
            </HStack>

            {/* Progress Bar */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" color={mutedTextColor}>Budget Spent</Text>
                <Text fontSize="sm" fontWeight="medium">
                  {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
                </Text>
              </HStack>
              <Progress 
                value={(campaign.spent / campaign.budget) * 100} 
                colorScheme="purple" 
                size="sm" 
                borderRadius="full"
              />
            </Box>

            {/* Stats Grid */}
            <SimpleGrid columns={2} spacing={3}>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="purple.500">
                  {campaign.influencerCount}
                </Text>
                <Text fontSize="xs" color={mutedTextColor}>Influencers</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  {campaign.appliedInfluencers}
                </Text>
                <Text fontSize="xs" color={mutedTextColor}>Applied</Text>
              </Box>
            </SimpleGrid>

            {/* Platforms */}
            <Box>
              <Text fontSize="xs" color={mutedTextColor} mb={2}>Platforms</Text>
              <HStack spacing={2} flexWrap="wrap">
                {campaign.platforms.map((platform) => (
                  <Badge key={platform} colorScheme="blue" variant="subtle" size="sm">
                    {platform}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {/* Performance Metrics (for active/completed campaigns) */}
            {campaign.status !== 'draft' && (
              <Box>
                <Text fontSize="xs" color={mutedTextColor} mb={2}>Performance</Text>
                <SimpleGrid columns={3} spacing={2}>
                  <Box textAlign="center">
                    <Text fontSize="sm" fontWeight="semibold">{campaign.engagement}%</Text>
                    <Text fontSize="xs" color={mutedTextColor}>Engagement</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="sm" fontWeight="semibold">
                      {(campaign.reach / 1000).toFixed(1)}K
                    </Text>
                    <Text fontSize="xs" color={mutedTextColor}>Reach</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="sm" fontWeight="semibold">{campaign.conversions}</Text>
                    <Text fontSize="xs" color={mutedTextColor}>Conversions</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            )}

            {/* Dates */}
            <Box>
              <Text fontSize="xs" color={mutedTextColor} mb={2}>Timeline</Text>
              <VStack spacing={1} align="start">
                <Text fontSize="xs">
                  <Text as="span" fontWeight="medium">Start:</Text> {formatDate(campaign.startDate)}
                </Text>
                <Text fontSize="xs">
                  <Text as="span" fontWeight="medium">End:</Text> {formatDate(campaign.endDate)}
                </Text>
              </VStack>
            </Box>

            {/* Actions */}
            <HStack spacing={2} mt="auto">
              <Button
                size="sm"
                variant="outline"
                colorScheme="purple"
                flex={1}
                onClick={() => {
                  setSelectedCampaign(campaign);
                  onOpen();
                }}
              >
                View Details
              </Button>
              {campaign.status === 'active' && (
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="yellow"
                  onClick={() => handleStatusChange(campaign.id, 'paused')}
                >
                  Pause
                </Button>
              )}
              {campaign.status === 'paused' && (
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="green"
                  onClick={() => handleStatusChange(campaign.id, 'active')}
                >
                  Resume
                </Button>
              )}
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </MotionBox>
  );

  const CampaignDetails = () => {
    if (!selectedCampaign) return null;

    return (
      <VStack spacing={6} align="stretch">
        <VStack align="start" spacing={2}>
          <Heading size="md">{selectedCampaign.title}</Heading>
          <Text color={mutedTextColor}>{selectedCampaign.description}</Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Stat>
            <StatLabel>Budget</StatLabel>
            <StatNumber color="purple.500">{formatCurrency(selectedCampaign.budget)}</StatNumber>
            <StatHelpText>Total allocated</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Spent</StatLabel>
            <StatNumber color="green.500">{formatCurrency(selectedCampaign.spent)}</StatNumber>
            <StatHelpText>Amount used</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Remaining</StatLabel>
            <StatNumber color="blue.500">
              {formatCurrency(selectedCampaign.budget - selectedCampaign.spent)}
            </StatNumber>
            <StatHelpText>Available budget</StatHelpText>
          </Stat>
        </SimpleGrid>

        <Divider />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Box>
            <Text fontWeight="medium" mb={2}>Campaign Details</Text>
            <VStack spacing={2} align="start">
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">Industry:</Text> {selectedCampaign.industry}
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">Duration:</Text> {selectedCampaign.duration} days
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">Start Date:</Text> {formatDate(selectedCampaign.startDate)}
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">End Date:</Text> {formatDate(selectedCampaign.endDate)}
              </Text>
            </VStack>
          </Box>
          <Box>
            <Text fontWeight="medium" mb={2}>Influencer Metrics</Text>
            <VStack spacing={2} align="start">
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">Target:</Text> {selectedCampaign.influencerCount}
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">Applied:</Text> {selectedCampaign.appliedInfluencers}
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">Platforms:</Text> {selectedCampaign.platforms.join(', ')}
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>

        {selectedCampaign.status !== 'draft' && (
          <>
            <Divider />
            <Box>
              <Text fontWeight="medium" mb={3}>Performance Metrics</Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <Box textAlign="center" p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                    {selectedCampaign.engagement}%
                  </Text>
                  <Text fontSize="sm" color={mutedTextColor}>Engagement Rate</Text>
                </Box>
                <Box textAlign="center" p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="2xl" fontWeight="bold" color="green.500">
                    {(selectedCampaign.reach / 1000).toFixed(1)}K
                  </Text>
                  <Text fontSize="sm" color={mutedTextColor}>Total Reach</Text>
                </Box>
                <Box textAlign="center" p={4} bg="gray.50" borderRadius="lg">
                  <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                    {selectedCampaign.conversions}
                  </Text>
                  <Text fontSize="sm" color={mutedTextColor}>Conversions</Text>
                </Box>
              </SimpleGrid>
            </Box>
          </>
        )}
      </VStack>
    );
  };

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active').length;

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
            Campaigns 📊
          </Heading>
          <Text color={mutedTextColor}>
            Manage and monitor your influencer marketing campaigns
          </Text>
        </VStack>
      </MotionBox>

      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Card bg={bgColor} border="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel color={mutedTextColor}>Total Budget</StatLabel>
              <StatNumber color="purple.500">{formatCurrency(totalBudget)}</StatNumber>
              <StatHelpText>All campaigns</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={bgColor} border="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel color={mutedTextColor}>Total Spent</StatLabel>
              <StatNumber color="green.500">{formatCurrency(totalSpent)}</StatNumber>
              <StatHelpText>Budget utilized</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={bgColor} border="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel color={mutedTextColor}>Active Campaigns</StatLabel>
              <StatNumber color="blue.500">{activeCampaigns}</StatNumber>
              <StatHelpText>Currently running</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Campaigns Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </SimpleGrid>

      {/* Campaign Details Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{ base: 'full', md: 'md' }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" borderColor={borderColor}>
            Campaign Details
          </DrawerHeader>
          <DrawerBody p={6}>
            <CampaignDetails />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Campaigns;
