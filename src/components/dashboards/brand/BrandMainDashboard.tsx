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
  Icon,
  Avatar,
  useBreakpointValue,
  Divider,
  Progress,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiTarget,
  FiPlus,
  FiEye,
  FiAward,
  FiBarChart,
  FiChevronUp,
  FiChevronDown
} from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import { dummyBrands, dummyCampaigns, dummyInfluencers } from '../../../data/dummyData.js';
import ChartWrapper from '../../charts/ChartWrapper';

const MotionBox = motion.create(Box);

const BrandMainDashboard: React.FC = () => {
  const { user } = useAuth();
  const brand = dummyBrands.find(b => b.id === user?.id) || dummyBrands[0];
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.300');

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Chart data for campaign performance
  const campaignPerformanceOptions: Highcharts.Options = {
    chart: { 
      type: 'column' as const,
      height: isMobile ? 250 : 300,
      backgroundColor: 'transparent'
    },
    title: { 
      text: 'Campaign Performance Overview',
      style: { fontSize: isMobile ? '14px' : '16px', color: textColor }
    },
    xAxis: {
      categories: ['Impressions', 'Clicks', 'Engagement', 'Conversions'],
      labels: { style: { fontSize: isMobile ? '11px' : '12px', color: mutedTextColor } }
    },
    yAxis: {
      title: { text: 'Count' },
      labels: { style: { fontSize: isMobile ? '11px' : '12px', color: mutedTextColor } }
    },
    series: [{
      type: 'column',
      name: 'Current Campaign',
      data: [250000, 12500, 8500, 1250],
      color: '#805AD5'
    }, {
      type: 'column',
      name: 'Previous Campaign',
      data: [200000, 10000, 7000, 1000],
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

  // Chart data for ROI trend
  const roiChartOptions: Highcharts.Options = {
    chart: { 
      type: 'line' as const,
      height: isMobile ? 250 : 300,
      backgroundColor: 'transparent'
    },
    title: { 
      text: 'ROI Trend',
      style: { fontSize: isMobile ? '14px' : '16px', color: textColor }
    },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      labels: { style: { fontSize: isMobile ? '11px' : '12px', color: mutedTextColor } }
    },
    yAxis: {
      title: { text: 'ROI (%)' },
      labels: { style: { fontSize: isMobile ? '11px' : '12px', color: mutedTextColor } }
    },
    series: [{
      type: 'line',
      name: 'ROI',
      data: [2.1, 2.5, 2.8, 3.2],
      color: '#38A169'
    }],
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

  const QuickActionCard = ({ title, description, icon, action, color, onClick }: any) => (
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
        cursor="pointer"
        _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
        transition="all 0.2s"
        onClick={onClick}
      >
        <CardBody p={{ base: 4, md: 5 }}>
          <VStack spacing={3} align="start">
            <Icon 
              as={icon} 
              color={color} 
              boxSize={{ base: 6, md: 7 }}
            />
            <VStack align="start" spacing={1}>
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
            </VStack>
            <Button 
              size="sm" 
              colorScheme="purple" 
              variant="ghost"
              rightIcon={<FiPlus />}
              w="full"
              mt="auto"
            >
              {action}
            </Button>
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
                colorScheme={campaign.status === 'active' ? 'green' : 'yellow'} 
                size="sm"
                fontSize="xs"
              >
                {campaign.status}
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
                  Applications
                </Text>
                <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                  {campaign.applications.length}
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
            Welcome back, {brand.name}! 👋
          </Heading>
          <Text 
            fontSize={{ base: 'sm', md: 'md' }} 
            color={mutedTextColor}
          >
            Here's what's happening with your campaigns today
          </Text>
        </VStack>
      </Box>

      {/* Stats Grid - 3-3 Layout */}
      <SimpleGrid 
        columns={{ base: 2, md: 3, lg: 3 }} 
        spacing={{ base: 3, md: 4 }}
      >
        <StatCard
          label="Total Reach"
          value="2.4M"
          change={12.5}
          icon={FiUsers}
          color="blue"
          bgColor={bgColor}
        />
        <StatCard
          label="Engagement Rate"
          value="4.8%"
          change={-2.1}
          icon={FiTrendingUp}
          color="green"
          bgColor={bgColor}
        />
        <StatCard
          label="ROI"
          value="3.2x"
          change={8.7}
          icon={FiDollarSign}
          color="purple"
          bgColor={bgColor}
        />
        <StatCard
          label="Active Campaigns"
          value="7"
          change={0}
          icon={FiTarget}
          color="orange"
          bgColor={bgColor}
        />
        <StatCard
          label="Total Spend"
          value={`$${brand.adSpend.toLocaleString()}`}
          change={18.5}
          icon={FiBarChart}
          color="teal"
          bgColor={bgColor}
        />
        <StatCard
          label="Avg. Performance"
          value="85%"
          change={5.2}
          icon={FiAward}
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
          options={campaignPerformanceOptions}
          title="Campaign Performance"
          height={isMobile ? 300 : 350}
        />
        <ChartWrapper 
          options={roiChartOptions}
          title="ROI Trend"
          height={isMobile ? 300 : 350}
        />
        <Box>
          <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm" h="full">
            <CardHeader>
              <Heading size="md" color={textColor}>Quick Insights</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>
                      Campaign Success Rate
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="green.600">
                      78%
                    </Text>
                  </HStack>
                  <Progress value={78} colorScheme="green" size="sm" borderRadius="full" />
                </Box>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>
                      Influencer Quality
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                      92%
                    </Text>
                  </HStack>
                  <Progress value={92} colorScheme="blue" size="sm" borderRadius="full" />
                </Box>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>
                      Content Performance
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="purple.600">
                      85%
                    </Text>
                  </HStack>
                  <Progress value={85} colorScheme="purple" size="sm" borderRadius="full" />
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>

      {/* Quick Actions - 3-3 Layout */}
      <Box>
        <VStack align="start" spacing={4}>
          <Heading 
            size={{ base: 'md', md: 'lg' }} 
            color={textColor}
            fontWeight="semibold"
          >
            Quick Actions
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={{ base: 3, md: 4 }}
            w="full"
          >
            <QuickActionCard
              title="Create Campaign"
              description="Launch a new influencer marketing campaign"
              icon={FiPlus}
              action="Create"
              color="purple.500"
              onClick={() => {}}
            />
            <QuickActionCard
              title="Find Influencers"
              description="Discover and connect with influencers"
              icon={FiUsers}
              action="Search"
              color="blue.500"
              onClick={() => {}}
            />
            <QuickActionCard
              title="View Analytics"
              description="Check your campaign performance metrics"
              icon={FiBarChart}
              action="View"
              color="green.500"
              onClick={() => {}}
            />
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Active Campaigns - 3-3 Layout */}
      <Box>
        <VStack align="start" spacing={4}>
          <HStack justify="space-between" w="full">
            <Heading 
              size={{ base: 'md', md: 'lg' }} 
              color={textColor}
              fontWeight="semibold"
            >
              Active Campaigns
            </Heading>
            <Button
              size="sm"
              colorScheme="purple"
              leftIcon={<FiPlus />}
              variant="outline"
            >
              View All
            </Button>
          </HStack>
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

      {/* Recent Activity & Top Influencers - 3-3 Layout */}
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={{ base: 4, md: 6 }}
      >
        {/* Recent Activity */}
        <Box>
          <VStack align="start" spacing={4}>
            <Heading 
              size={{ base: 'md', md: 'lg' }} 
              color={textColor}
              fontWeight="semibold"
            >
              Recent Activity
            </Heading>
            <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm">
              <CardBody>
                <VStack spacing={3} align="stretch">
                  {dummyCampaigns.slice(0, 3).map((campaign, index) => (
                    <Box key={campaign.id}>
                      <HStack justify="space-between" align="center">
                        <HStack spacing={3} flex={1}>
                          <Avatar 
                            size="sm" 
                            name={campaign.brandName}
                            bg="purple.100"
                          />
                          <VStack align="start" spacing={0} flex={1}>
                            <Text 
                              fontSize={{ base: 'sm', md: 'md' }} 
                              fontWeight="medium" 
                              color={textColor}
                              noOfLines={1}
                            >
                              {campaign.title}
                            </Text>
                            <Text 
                              fontSize="xs" 
                              color={mutedTextColor}
                            >
                              {campaign.brandName} • {campaign.status}
                            </Text>
                          </VStack>
                        </HStack>
                        <Badge 
                          colorScheme={campaign.status === 'active' ? 'green' : 'gray'}
                          size="sm"
                          fontSize="xs"
                        >
                          {campaign.status}
                        </Badge>
                      </HStack>
                      {index < 2 && <Divider mt={3} />}
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>

        {/* Top Influencers */}
        <Box>
          <VStack align="start" spacing={4}>
            <Heading 
              size={{ base: 'md', md: 'lg' }} 
              color={textColor}
              fontWeight="semibold"
            >
              Top Influencers
            </Heading>
            <Card bg={bgColor} border="1px" borderColor={borderColor} shadow="sm">
              <CardBody>
                <VStack spacing={3} align="stretch">
                  {dummyInfluencers.slice(0, 3).map((influencer) => (
                    <Box key={influencer.id}>
                      <HStack key={influencer.id} w="full" justify="space-between">
                        <HStack spacing={3}>
                          <Avatar size="sm" src={influencer.avatar} name={influencer.name} />
                          <VStack align="start" spacing={0}>
                            <Text fontSize="sm" fontWeight="medium" color={textColor}>
                              {influencer.name}
                            </Text>
                            <Text fontSize="xs" color={mutedTextColor}>
                              {influencer.engagementRate}% engagement
                            </Text>
                          </VStack>
                        </HStack>
                        <Button size="xs" colorScheme="purple" variant="outline">
                          Invite
                        </Button>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>

        {/* Performance Summary */}
        <Box>
          <VStack align="start" spacing={4}>
            <Heading 
              size={{ base: 'md', md: 'lg' }} 
              color={textColor}
              fontWeight="semibold"
            >
              Performance Summary
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
                        +24%
                      </Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                      $12,450
                    </Text>
                    <Text fontSize="xs" color={mutedTextColor}>
                      Total revenue generated
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
                      $18,200
                    </Text>
                    <Text fontSize="xs" color={mutedTextColor}>
                      Based on current trends
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default BrandMainDashboard;
