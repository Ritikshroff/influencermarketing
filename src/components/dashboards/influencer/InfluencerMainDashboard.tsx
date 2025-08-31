import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Avatar,
  Button,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiAward,
  FiEye,
  FiHeart,
  FiMessageSquare,
  FiStar
} from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import { dummyInfluencers, dummyCampaigns, dummyNotifications } from '../../../data/dummyData.js';
import ChartWrapper from '../../charts/ChartWrapper';

const MotionBox = motion.create(Box);

const InfluencerMainDashboard: React.FC = () => {
  const { user } = useAuth();
  const influencer = dummyInfluencers.find(inf => inf.id === user?.id) || dummyInfluencers[0];
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Chart data for engagement trend
  const engagementChartOptions: Highcharts.Options = {
    chart: { type: 'line' as const },
    title: { text: 'Engagement Rate Trend' },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    yAxis: {
      title: { text: 'Engagement Rate (%)' },
    },
    series: [{
      type: 'line',
      name: 'Engagement Rate',
      data: [4.2, 4.5, 4.8, 5.1, 5.8],
      color: '#805AD5'
    }],
  };

  // Chart data for followers growth
  const followersChartOptions: Highcharts.Options = {
    chart: { type: 'area' as const },
    title: { text: 'Followers Growth' },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    yAxis: {
      title: { text: 'Followers' },
    },
    series: [{
      type: 'area',
      name: 'Followers',
      data: [350000, 365000, 380000, 395000, 405000],
      color: '#3182CE'
    }],
  };

  const StatCard = ({ label, value, change, icon, color }: any) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card bg={bgColor} border="1px" borderColor={borderColor}>
        <CardBody>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                {label}
              </Text>
              <Stat>
                <StatNumber fontSize="2xl" fontWeight="bold">
                  {value}
                </StatNumber>
                {change && (
                  <StatHelpText>
                    <StatArrow type={change > 0 ? 'increase' : 'decrease'} />
                    {Math.abs(change)}%
                  </StatHelpText>
                )}
              </Stat>
            </VStack>
            <Box
              p={3}
              borderRadius="lg"
              bg={`${color}.100`}
              color={`${color}.600`}
            >
              <Icon as={icon} boxSize={6} />
            </Box>
          </HStack>
        </CardBody>
      </Card>
    </MotionBox>
  );

  return (
    <Box>
      {/* Welcome Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
      >
        <VStack align="start" spacing={2}>
          <Heading size="lg" bgGradient="linear(to-r, purple.500, blue.500)" bgClip="text">
            Welcome back, {influencer.name}! 👋
          </Heading>
          <Text color="gray.600">
            Here's what's happening with your influencer journey today.
          </Text>
        </VStack>
      </MotionBox>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          label="Total Followers"
          value={influencer.audienceSize.toLocaleString()}
          change={12.5}
          icon={FiUsers}
          color="blue"
        />
        <StatCard
          label="Engagement Rate"
          value={`${influencer.engagementRate}%`}
          change={8.2}
          icon={FiTrendingUp}
          color="green"
        />
        <StatCard
          label="Monthly Earnings"
          value={`$${influencer.earnings.toLocaleString()}`}
          change={15.3}
          icon={FiDollarSign}
          color="purple"
        />
        <StatCard
          label="Current Rank"
          value={`#${influencer.rank}`}
          change={-2}
          icon={FiAward}
          color="orange"
        />
      </SimpleGrid>

      {/* Charts Section */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} mb={8}>
        <GridItem>
          <ChartWrapper
            options={engagementChartOptions}
            title="Engagement Rate Trend"
            height={350}
          />
        </GridItem>
        <GridItem>
          <ChartWrapper
            options={followersChartOptions}
            title="Followers Growth"
            height={350}
          />
        </GridItem>
      </Grid>

      {/* Recent Activity & Quick Actions */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Recent Campaigns */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card bg={bgColor} border="1px" borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Recent Campaigns</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {dummyCampaigns.slice(0, 3).map((campaign) => (
                  <Box
                    key={campaign.id}
                    p={4}
                    border="1px"
                    borderColor={borderColor}
                    borderRadius="lg"
                    _hover={{ bg: 'gray.50' }}
                    transition="all 0.2s"
                  >
                    <HStack justify="space-between" align="start">
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">{campaign.title}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {campaign.brandName} • ${campaign.budget.toLocaleString()}
                        </Text>
                        <HStack spacing={2}>
                          {campaign.niche.map((niche) => (
                            <Badge key={niche} colorScheme="purple" size="sm">
                              {niche}
                            </Badge>
                          ))}
                        </HStack>
                      </VStack>
                      <Button size="sm" colorScheme="purple" variant="outline">
                        Apply Now 🚀
                      </Button>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </MotionBox>

        {/* Quick Stats & Actions */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <VStack spacing={6}>
            {/* Platform Stats */}
            <Card bg={bgColor} border="1px" borderColor={borderColor} w="full">
              <CardHeader>
                <Heading size="md">Platform Performance</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  {influencer.platforms.map((platform) => (
                    <Box key={platform.name} w="full">
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
                          {platform.name}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {platform.followers.toLocaleString()}
                        </Text>
                      </HStack>
                      <Progress
                        value={platform.engagementRate * 10}
                        colorScheme="purple"
                        size="sm"
                        borderRadius="full"
                      />
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        {platform.engagementRate}% engagement
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Quick Actions */}
            <Card bg={bgColor} border="1px" borderColor={borderColor} w="full">
              <CardHeader>
                <Heading size="md">Quick Actions</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={3}>
                  <Button
                    w="full"
                    colorScheme="purple"
                    leftIcon={<FiEye />}
                    size="sm"
                  >
                    View Analytics
                  </Button>
                  <Button
                    w="full"
                    colorScheme="blue"
                    leftIcon={<FiUsers />}
                    size="sm"
                    variant="outline"
                  >
                    Explore Brands
                  </Button>
                  <Button
                    w="full"
                    colorScheme="green"
                    leftIcon={<FiMessageSquare />}
                    size="sm"
                    variant="outline"
                  >
                    Check Messages
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </MotionBox>
      </Grid>
    </Box>
  );
};

export default InfluencerMainDashboard;
