import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiTarget,
  FiPlus,
  FiEye,
  FiMessageSquare
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

  // Chart data for campaign performance
  const campaignPerformanceOptions: Highcharts.Options = {
    chart: { type: 'column' as const },
    title: { text: 'Campaign Performance Overview' },
    xAxis: {
      categories: ['Impressions', 'Clicks', 'Engagement', 'Conversions'],
    },
    yAxis: {
      title: { text: 'Count' },
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
  };

  // Chart data for ROI trend
  const roiChartOptions: Highcharts.Options = {
    chart: { type: 'line' as const },
    title: { text: 'ROI Trend' },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    },
    yAxis: {
      title: { text: 'ROI (%)' },
    },
    series: [{
      type: 'line',
      name: 'ROI',
      data: [2.1, 2.5, 2.8, 3.2],
      color: '#38A169'
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
            Welcome back, {brand.name}! 🚀
          </Heading>
          <Text color="gray.600">
            Here's your brand performance overview and campaign insights.
          </Text>
        </VStack>
      </MotionBox>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          label="Total Spend"
          value={`$${brand.adSpend.toLocaleString()}`}
          change={18.5}
          icon={FiDollarSign}
          color="green"
        />
        <StatCard
          label="Active Campaigns"
          value={dummyCampaigns.filter(c => c.status === 'active').length}
          change={25.0}
          icon={FiTarget}
          color="blue"
        />
        <StatCard
          label="Total Reach"
          value="2.5M"
          change={32.1}
          icon={FiUsers}
          color="purple"
        />
        <StatCard
          label="Avg. ROI"
          value="2.8x"
          change={12.3}
          icon={FiTrendingUp}
          color="orange"
        />
      </SimpleGrid>

      {/* Charts Section */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} mb={8}>
        <GridItem>
          <ChartWrapper
            options={campaignPerformanceOptions}
            title="Campaign Performance"
            height={350}
          />
        </GridItem>
        <GridItem>
          <ChartWrapper
            options={roiChartOptions}
            title="ROI Trend"
            height={350}
          />
        </GridItem>
      </Grid>

      {/* Campaigns & Quick Actions */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Active Campaigns */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card bg={bgColor} border="1px" borderColor={borderColor}>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md">Active Campaigns</Heading>
                <Button size="sm" colorScheme="purple" leftIcon={<FiPlus />}>
                  Create New
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Campaign</Th>
                      <Th>Status</Th>
                      <Th>Budget</Th>
                      <Th>Applications</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dummyCampaigns.slice(0, 3).map((campaign) => (
                      <Tr key={campaign.id}>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="semibold">{campaign.title}</Text>
                            <Text fontSize="xs" color="gray.500">
                              {campaign.brandName}
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={campaign.status === 'active' ? 'green' : 'yellow'}
                            size="sm"
                          >
                            {campaign.status}
                          </Badge>
                        </Td>
                        <Td>${campaign.budget.toLocaleString()}</Td>
                        <Td>{campaign.applications.length}</Td>
                        <Td>
                          <Button size="xs" colorScheme="blue" variant="outline">
                            View
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </MotionBox>

        {/* Quick Actions & Top Influencers */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <VStack spacing={6}>
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
                    leftIcon={<FiPlus />}
                    size="sm"
                  >
                    Create Campaign
                  </Button>
                  <Button
                    w="full"
                    colorScheme="blue"
                    leftIcon={<FiUsers />}
                    size="sm"
                    variant="outline"
                  >
                    Find Influencers
                  </Button>
                  <Button
                    w="full"
                    colorScheme="green"
                    leftIcon={<FiEye />}
                    size="sm"
                    variant="outline"
                  >
                    View Analytics
                  </Button>
                  <Button
                    w="full"
                    colorScheme="orange"
                    leftIcon={<FiMessageSquare />}
                    size="sm"
                    variant="outline"
                  >
                    Check Messages
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Top Performing Influencers */}
            <Card bg={bgColor} border="1px" borderColor={borderColor} w="full">
              <CardHeader>
                <Heading size="md">Top Influencers</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={3}>
                  {dummyInfluencers.slice(0, 3).map((influencer) => (
                    <HStack key={influencer.id} w="full" justify="space-between">
                      <HStack spacing={3}>
                        <Avatar size="sm" src={influencer.avatar} name={influencer.name} />
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="medium">
                            {influencer.name}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {influencer.engagementRate}% engagement
                          </Text>
                        </VStack>
                      </HStack>
                      <Button size="xs" colorScheme="purple" variant="outline">
                        Invite
                      </Button>
                    </HStack>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </MotionBox>
      </Grid>
    </Box>
  );
};

export default BrandMainDashboard;
