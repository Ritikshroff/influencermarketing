import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Icon,
  useBreakpointValue,
  Divider,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiAward,
  FiEye,
  FiMessageSquare,
  FiBarChart,
  FiCalendar,
  FiTarget,
  FiChevronUp,
  FiChevronDown
} from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import { dummyInfluencers, dummyCampaigns } from '../../../data/dummyData.js';
import ChartWrapper from '../../charts/ChartWrapper';

const MotionBox = motion.create(Box);

const InfluencerMainDashboard: React.FC = () => {
  const { user } = useAuth();
  const influencer = dummyInfluencers.find(inf => inf.id === user?.id) || dummyInfluencers[0];
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.300');

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Chart data for engagement trend
  const engagementChartOptions: Highcharts.Options = {
    chart: { 
      type: 'line' as const,
      height: isMobile ? 250 : 300,
      backgroundColor: 'transparent'
    },
    title: { 
      text: 'Engagement Rate Trend',
      style: { fontSize: isMobile ? '14px' : '16px', color: textColor }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      labels: { style: { fontSize: isMobile ? '11px' : '12px', color: mutedTextColor } }
    },
    yAxis: {
      title: { text: 'Engagement Rate (%)' },
      labels: { style: { fontSize: isMobile ? '11px' : '12px', color: mutedTextColor } }
    },
    series: [{
      type: 'line',
      name: 'Engagement Rate',
      data: [4.2, 4.5, 4.8, 5.1, 5.8],
      color: '#805AD5'
    }],
    legend: { 
      enabled: !isMobile,
      itemStyle: { fontSize: isMobile ? '11px' : '12px', color: textColor }
    },
    responsive: {
      rules: [{
        condition: { maxWidth: 500 },
        chartOptions: {
          legend: { enabled: false }
        }
      }]
    }
  };

  // Chart data for followers growth
  const followersChartOptions: Highcharts.Options = {
    chart: { 
      type: 'area' as const,
      height: isMobile ? 250 : 300,
      backgroundColor: 'transparent'
    },
    title: { 
      text: 'Followers Growth',
      style: { fontSize: isMobile ? '14px' : '16px', color: textColor }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      labels: { style: { fontSize: isMobile ? '11px' : '12px', color: mutedTextColor } }
    },
    yAxis: {
      title: { text: 'Followers' },
      labels: { style: { fontSize: isMobile ? '11px' : '12px', color: mutedTextColor } }
    },
    series: [{
      type: 'area',
      name: 'Followers',
      data: [350000, 365000, 380000, 395000, 405000],
      color: '#3182CE'
    }],
    legend: { 
      enabled: !isMobile,
      itemStyle: { fontSize: isMobile ? '11px' : '12px', color: textColor }
    },
    responsive: {
      rules: [{
        condition: { maxWidth: 500 },
        chartOptions: {
          legend: { enabled: false }
        }
      }]
    }
  };

  const StatCard = ({ label, value, change, icon, color, bgColor }: any) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        bg={bgColor} 
        border="1px" 
        borderColor={borderColor}
        shadow="sm"
        h="full"
        _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
        transition="all 0.2s"
      >
        <CardBody p={{ base: 4, md: 5 }}>
          <VStack spacing={3} align="start">
            <HStack spacing={3} w="full" justify="space-between">
              <Box
                p={3}
                borderRadius="lg"
                bg={`${color}.100`}
                color={`${color}.600`}
              >
                <Icon as={icon} boxSize={{ base: 5, md: 6 }} />
              </Box>
              {change && (
                <Badge 
                  colorScheme={change > 0 ? 'green' : 'red'} 
                  size="sm"
                  fontSize="xs"
                  variant="subtle"
                >
                  <Icon 
                    as={change > 0 ? FiChevronUp : FiChevronDown} 
                    boxSize={3} 
                    color={change > 0 ? 'green.500' : 'red.500'}
                  />
                  {Math.abs(change)}%
                </Badge>
              )}
            </HStack>
            
            <VStack align="start" spacing={1} w="full">
              <Text 
                fontSize={{ base: '2xl', md: '3xl' }} 
                fontWeight="bold" 
                color={textColor}
                lineHeight="1"
              >
                {value}
              </Text>
              <Text 
                fontSize={{ base: 'sm', md: 'md' }} 
                color={mutedTextColor}
                fontWeight="medium"
              >
                {label}
              </Text>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </MotionBox>
  );

  const AchievementCard = ({ title, description, icon, progress, color }: any) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        bg={bgColor} 
        border="1px" 
        borderColor={borderColor}
        shadow="sm"
        h="full"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
      >
        <CardBody p={{ base: 4, md: 5 }}>
          <VStack spacing={3} align="start">
            <HStack spacing={3} w="full" justify="space-between">
              <Icon 
                as={icon} 
                color={color} 
                boxSize={{ base: 6, md: 7 }}
              />
              <Text 
                fontSize={{ base: 'sm', md: 'md' }} 
                fontWeight="semibold" 
                color={color}
              >
                {progress}%
              </Text>
            </HStack>
            
            <VStack align="start" spacing={2} w="full">
              <Text 
                fontSize={{ base: 'md', md: 'lg' }} 
                fontWeight="semibold" 
                color={textColor}
              >
                {title}
              </Text>
              <Text 
                fontSize={{ base: 'sm', md: 'sm' }} 
                color={mutedTextColor}
                noOfLines={2}
              >
                {description}
              </Text>
              <Progress 
                value={progress} 
                colorScheme={color} 
                size="sm" 
                w="full"
                borderRadius="full"
              />
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </MotionBox>
  );

  const CampaignCard = ({ campaign }: { campaign: any }) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        bg={bgColor} 
        border="1px" 
        borderColor={borderColor}
        shadow="sm"
        h="full"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
      >
        <CardHeader pb={3}>
          <VStack align="start" spacing={2}>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" fontWeight="medium" color={mutedTextColor}>
                {campaign.brandName}
              </Text>
              <Badge 
                colorScheme="blue" 
                size="sm"
                fontSize="xs"
              >
                Applied
              </Badge>
            </HStack>
            <Text 
              fontSize={{ base: 'md', md: 'lg' }} 
              fontWeight="semibold" 
              color={textColor}
              noOfLines={2}
            >
              {campaign.title}
            </Text>
          </VStack>
        </CardHeader>
        
        <CardBody pt={0}>
          <VStack spacing={3} align="stretch">
            <SimpleGrid columns={2} spacing={3}>
              <VStack align="start" spacing={0}>
                <Text fontSize="xs" color={mutedTextColor} fontWeight="medium">
                  Budget
                </Text>
                <Text fontSize="sm" fontWeight="semibold" color="green.600">
                  ${campaign.budget.toLocaleString()}
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text fontSize="xs" color={mutedTextColor} fontWeight="medium">
                  Niche
                </Text>
                <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                  {campaign.niche[0]}
                </Text>
              </VStack>
            </SimpleGrid>

            <Wrap spacing={1}>
              {campaign.niche.slice(0, 2).map((niche: string) => (
                <WrapItem key={niche}>
                  <Badge 
                    colorScheme="purple" 
                    variant="subtle" 
                    size="sm"
                    fontSize="xs"
                  >
                    {niche}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>

            <Button
              colorScheme="purple"
              size="sm"
              w="full"
              leftIcon={<FiEye />}
              variant="outline"
            >
              View Details
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </MotionBox>
  );

  return (
    <VStack spacing={{ base: 4, md: 6 }} align="stretch">
      {/* Welcome Header */}
      <Box>
        <VStack align="start" spacing={2}>
          <Heading 
            size={{ base: 'md', md: 'lg' }} 
            color={textColor}
            fontWeight="bold"
          >
            Welcome back, {influencer.name}! ✨
          </Heading>
          <Text 
            fontSize={{ base: 'sm', md: 'md' }} 
            color={mutedTextColor}
          >
            Here's your performance overview and latest opportunities
          </Text>
        </VStack>
      </Box>

      {/* Stats Grid - 3-3 Layout */}
      <SimpleGrid 
        columns={{ base: 2, md: 3, lg: 3 }} 
        spacing={{ base: 3, md: 4 }}
      >
        <StatCard
          label="Total Followers"
          value={influencer.audienceSize.toLocaleString()}
          change={8.5}
          icon={FiUsers}
          color="blue"
          bgColor={bgColor}
        />
        <StatCard
          label="Engagement Rate"
          value={`${influencer.engagementRate}%`}
          change={2.3}
          icon={FiTrendingUp}
          color="green"
          bgColor={bgColor}
        />
        <StatCard
          label="Monthly Earnings"
          value={`$${influencer.earnings.toLocaleString()}`}
          change={15.7}
          icon={FiDollarSign}
          color="purple"
          bgColor={bgColor}
        />
        <StatCard
          label="Current Rank"
          value={`#${influencer.rank}`}
          change={-2}
          icon={FiAward}
          color="orange"
          bgColor={bgColor}
        />
        <StatCard
          label="Avg. Likes"
          value={influencer.averageLikes.toLocaleString()}
          change={12.1}
          icon={FiTarget}
          color="teal"
          bgColor={bgColor}
        />
        <StatCard
          label="Reach Rate"
          value="68%"
          change={5.4}
          icon={FiBarChart}
          color="pink"
          bgColor={bgColor}
        />
      </SimpleGrid>

      {/* Charts Section - 3-3 Layout */}
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={{ base: 4, md: 6 }}
      >
        <ChartWrapper 
          options={engagementChartOptions}
          title="Engagement Rate Trend"
          height={isMobile ? 300 : 350}
        />
        <ChartWrapper 
          options={followersChartOptions}
          title="Followers Growth"
          height={isMobile ? 300 : 350}
        />
        <Box>
          <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm" h="full">
            <CardHeader>
              <Heading size="md" color={textColor}>Platform Performance</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {influencer.platforms.map((platform) => (
                  <Box key={platform.name} w="full">
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="medium" color={textColor} textTransform="capitalize">
                        {platform.name}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                        {platform.followers.toLocaleString()}
                      </Text>
                    </HStack>
                    <Progress
                      value={platform.engagementRate * 10}
                      colorScheme="purple"
                      size="sm"
                      borderRadius="full"
                    />
                    <Text fontSize="xs" color={mutedTextColor} mt={1}>
                      {platform.engagementRate}% engagement
                    </Text>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>

      {/* Achievements & Goals - 3-3 Layout */}
      <Box>
        <VStack align="start" spacing={4}>
          <Heading 
            size={{ base: 'md', md: 'lg' }} 
            color={textColor}
            fontWeight="semibold"
          >
            Your Achievements
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={{ base: 3, md: 4 }}
            w="full"
          >
            <AchievementCard
              title="Content Quality"
              description="Maintaining high engagement rates across all platforms"
              icon={FiTrendingUp}
              progress={85}
              color="green"
            />
            <AchievementCard
              title="Audience Growth"
              description="Consistently growing your follower base"
              icon={FiUsers}
              progress={72}
              color="blue"
            />
            <AchievementCard
              title="Brand Collaborations"
              description="Building strong partnerships with brands"
              icon={FiAward}
              progress={68}
              color="purple"
            />
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Recent Applications - 3-3 Layout */}
      <Box>
        <VStack align="start" spacing={4}>
          <Heading 
            size={{ base: 'md', md: 'lg' }} 
            color={textColor}
            fontWeight="semibold"
          >
            Recent Applications
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={{ base: 3, md: 4 }}
            w="full"
          >
            {dummyCampaigns.slice(0, 3).map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Quick Actions & Insights - 3-3 Layout */}
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={{ base: 4, md: 6 }}
      >
        {/* Quick Actions */}
        <Box>
          <VStack align="start" spacing={4}>
            <Heading 
              size={{ base: 'md', md: 'lg' }} 
              color={textColor}
              fontWeight="semibold"
            >
              Quick Actions
            </Heading>
            <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm">
              <CardBody>
                <VStack spacing={3}>
                  <Button
                    w="full"
                    colorScheme="purple"
                    leftIcon={<FiEye />}
                    size="sm"
                  >
                    Explore Brands
                  </Button>
                  <Button
                    w="full"
                    colorScheme="blue"
                    leftIcon={<FiMessageSquare />}
                    size="sm"
                    variant="outline"
                  >
                    Check Messages
                  </Button>
                  <Button
                    w="full"
                    colorScheme="green"
                    leftIcon={<FiBarChart />}
                    size="sm"
                    variant="outline"
                  >
                    View Analytics
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>

        {/* Earnings Summary */}
        <Box>
          <VStack align="start" spacing={4}>
            <Heading 
              size={{ base: 'md', md: 'lg' }} 
              color={textColor}
              fontWeight="semibold"
            >
              Earnings Summary
            </Heading>
            <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm">
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>
                        This Month
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="green.600">
                        +15.7%
                      </Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                      ${influencer.earnings.toLocaleString()}
                    </Text>
                    <Text fontSize="xs" color={mutedTextColor}>
                      Total earnings generated
                    </Text>
                  </Box>
                  <Divider />
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>
                        Next Month
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                        Projected
                      </Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                      ${Math.round(influencer.earnings * 1.2).toLocaleString()}
                    </Text>
                    <Text fontSize="xs" color={mutedTextColor}>
                      Based on current performance
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>

        {/* Upcoming Deadlines */}
        <Box>
          <VStack align="start" spacing={4}>
            <Heading 
              size={{ base: 'md', md: 'lg' }} 
              color={textColor}
              fontWeight="semibold"
            >
              Upcoming Deadlines
            </Heading>
            <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm">
              <CardBody>
                <VStack spacing={3} align="stretch">
                  {dummyCampaigns.slice(0, 2).map((campaign) => (
                    <Box key={campaign.id}>
                      <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={0} flex={1}>
                          <Text 
                            fontSize="sm" 
                            fontWeight="medium" 
                            color={textColor}
                            noOfLines={1}
                          >
                            {campaign.title}
                          </Text>
                          <Text fontSize="xs" color={mutedTextColor}>
                            Due: {new Date(campaign.timeline.endDate).toLocaleDateString()}
                          </Text>
                        </VStack>
                        <Badge 
                          colorScheme="orange"
                          size="sm"
                          fontSize="xs"
                        >
                          Active
                        </Badge>
                      </HStack>
                    </Box>
                  ))}
                  <Button
                    size="sm"
                    colorScheme="purple"
                    variant="outline"
                    w="full"
                    leftIcon={<FiCalendar />}
                  >
                    View All Deadlines
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default InfluencerMainDashboard;
