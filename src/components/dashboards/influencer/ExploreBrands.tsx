import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  useColorModeValue,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Icon,
  Avatar
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiSearch, FiTarget } from 'react-icons/fi';
import { dummyCampaigns } from '../../../data/dummyData.js';

const MotionBox = motion.create(Box);

const ExploreBrands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const categories = ['All', 'Fashion', 'Tech', 'Fitness', 'Food', 'Travel', 'Beauty'];
  const budgetRanges = ['All', 'Under $1K', '$1K-$5K', '$5K-$10K', '$10K+'];

  const filteredCampaigns = dummyCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || 
                           campaign.niche.includes(selectedCategory);
    const matchesBudget = !selectedBudget || selectedBudget === 'All' ||
                         (selectedBudget === 'Under $1K' && campaign.budget < 1000) ||
                         (selectedBudget === '$1K-$5K' && campaign.budget >= 1000 && campaign.budget < 5000) ||
                         (selectedBudget === '$5K-$10K' && campaign.budget >= 5000 && campaign.budget < 10000) ||
                         (selectedBudget === '$10K+' && campaign.budget >= 10000);
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const BrandCard = ({ campaign }: { campaign: any }) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card bg={bgColor} border="1px" borderColor={borderColor} h="full">
        <CardHeader>
          <VStack align="start" spacing={3}>
            <HStack justify="space-between" w="full">
              <HStack spacing={3}>
                <Avatar size="md" name={campaign.brandName} />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold">{campaign.brandName}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {campaign.niche.join(', ')}
                  </Text>
                </VStack>
              </HStack>
              <Badge colorScheme="green" size="sm">
                Active
              </Badge>
            </HStack>
            
            <VStack align="start" spacing={1}>
              <Text fontSize="lg" fontWeight="bold">
                {campaign.title}
              </Text>
              <Text fontSize="sm" color="gray.600" noOfLines={2}>
                {campaign.description}
              </Text>
            </VStack>
          </VStack>
        </CardHeader>
        
        <CardBody pt={0}>
          <VStack spacing={4} align="stretch">
            {/* Campaign Details */}
            <HStack justify="space-between">
              <HStack spacing={4}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.500">Budget</Text>
                  <Text fontSize="sm" fontWeight="semibold" color="green.600">
                    ${campaign.budget.toLocaleString()}
                  </Text>
                </VStack>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.500">Timeline</Text>
                  <Text fontSize="sm" fontWeight="semibold">
                    {new Date(campaign.timeline.startDate).toLocaleDateString()}
                  </Text>
                </VStack>
              </HStack>
            </HStack>

            {/* Requirements */}
            <Box>
              <Text fontSize="xs" color="gray.500" mb={2}>
                Requirements:
              </Text>
              <HStack spacing={1} flexWrap="wrap">
                {campaign.requirements.slice(0, 2).map((req: string, index: number) => (
                  <Badge key={index} colorScheme="purple" size="sm">
                    {req}
                  </Badge>
                ))}
                {campaign.requirements.length > 2 && (
                  <Badge colorScheme="gray" size="sm">
                    +{campaign.requirements.length - 2} more
                  </Badge>
                )}
              </HStack>
            </Box>

            {/* Goals */}
            <Box>
              <Text fontSize="xs" color="gray.500" mb={2}>
                Goals:
              </Text>
              <HStack spacing={1} flexWrap="wrap">
                {campaign.goals.map((goal: string, index: number) => (
                  <Badge key={index} colorScheme="blue" size="sm">
                    {goal}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {/* Eligibility Check */}
            <Box p={3} bg="green.50" borderRadius="lg" border="1px" borderColor="green.200">
              <HStack spacing={2}>
                <Icon as={FiTarget} color="green.500" boxSize={4} />
                <Text fontSize="sm" color="green.700" fontWeight="medium">
                  You're eligible for this campaign! 🎯
                </Text>
              </HStack>
            </Box>

            {/* Action Button */}
            <Button
              colorScheme="purple"
              size="lg"
              w="full"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Apply Now 🚀
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </MotionBox>
  );

  return (
    <Box>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
      >
        <VStack align="start" spacing={2}>
          <Heading size="lg" bgGradient="linear(to-r, purple.500, blue.500)" bgClip="text">
            Explore Brands 🏢
          </Heading>
          <Text color="gray.600">
            Discover amazing campaigns from top brands and apply to grow your influence
          </Text>
        </VStack>
      </MotionBox>

      {/* Filters */}
      <Card bg={bgColor} border="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <VStack spacing={4}>
            <HStack w="full" spacing={4}>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search brands or campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="lg"
                  borderRadius="lg"
                />
              </InputGroup>
            </HStack>
            
            <HStack spacing={4} w="full">
              <Select
                placeholder="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                size="lg"
                borderRadius="lg"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              
              <Select
                placeholder="Budget Range"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                size="lg"
                borderRadius="lg"
              >
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </Select>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Results */}
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="md" fontWeight="medium">
            {filteredCampaigns.length} campaigns found
          </Text>
          <Text fontSize="sm" color="gray.500">
            Showing best matches for your profile
          </Text>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredCampaigns.map((campaign) => (
            <BrandCard key={campaign.id} campaign={campaign} />
          ))}
        </SimpleGrid>

        {filteredCampaigns.length === 0 && (
          <Card bg={bgColor} border="1px" borderColor={borderColor}>
            <CardBody textAlign="center" py={12}>
              <VStack spacing={4}>
                <Icon as={FiSearch} boxSize={12} color="gray.400" />
                <Text fontSize="lg" fontWeight="medium" color="gray.600">
                  No campaigns found
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Try adjusting your filters or search terms
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
};

export default ExploreBrands;
