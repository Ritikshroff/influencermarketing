import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  Select,
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
  SimpleGrid,
  useColorModeValue,
  useBreakpointValue,
  Wrap,
  WrapItem,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Divider,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiUsers, FiEye, FiDollarSign } from 'react-icons/fi';
import { dummyBrands } from '../../../data/dummyData.js';

const MotionBox = motion.create(Box);

const ExploreBrands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.300');
  
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Filter brands based on search and filters
  const filteredBrands = dummyBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNiche = !selectedNiche || brand.industry.toLowerCase().includes(selectedNiche.toLowerCase());
    const matchesBudget = !selectedBudget || getBudgetRange(brand.budget) === selectedBudget;
    
    return matchesSearch && matchesNiche && matchesBudget;
  });

  const getBudgetRange = (budget: number) => {
    if (budget < 5000) return '$1K - $5K';
    if (budget < 10000) return '$5K - $10K';
    if (budget < 25000) return '$10K - $25K';
    return '$25K+';
  };

  const handleNicheToggle = (niche: string) => {
    setSelectedNiche(selectedNiche === niche ? '' : niche);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedNiche('');
    setSelectedBudget('');
  };

  const niches = ['Fashion', 'Beauty', 'Technology', 'Food', 'Travel', 'Fitness', 'Lifestyle', 'Gaming'];
  const budgetRanges = ['$1K - $5K', '$5K - $10K', '$10K - $25K', '$25K+'];


  const BrandCard = ({ brand }: { brand: any }) => (
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
        <CardHeader pb={3}>
          <VStack align="start" spacing={3}>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" fontWeight="medium" color={mutedTextColor}>
                {brand.industry}
              </Text>
              <Badge 
                colorScheme="blue" 
                size="sm"
                fontSize="xs"
              >
                {getBudgetRange(brand.budget)}
              </Badge>
            </HStack>
            
            <VStack align="start" spacing={1}>
              <Heading 
                size={{ base: 'md', md: 'lg' }} 
                color={textColor}
                fontWeight="semibold"
              >
                {brand.companyName}
              </Heading>
              <Text 
                fontSize={{ base: 'sm', md: 'md' }} 
                color={mutedTextColor}
                noOfLines={2}
              >
                {brand.industry} company looking for influencers
              </Text>
            </VStack>
          </VStack>
        </CardHeader>
        
        <CardBody pt={0}>
          <VStack spacing={4} align="stretch">
            <Wrap spacing={2}>
              <WrapItem>
                <Badge 
                  colorScheme="purple" 
                  variant="subtle" 
                  size="sm"
                  fontSize="xs"
                >
                  {brand.industry}
                </Badge>
              </WrapItem>
              <WrapItem>
                <Badge 
                  colorScheme="blue" 
                  variant="subtle" 
                  size="sm"
                  fontSize="xs"
                >
                  ${brand.budget.toLocaleString()}
                </Badge>
              </WrapItem>
            </Wrap>
            
            <SimpleGrid columns={2} spacing={3}>
              <HStack spacing={2}>
                <Icon as={FiUsers} color={mutedTextColor} boxSize={4} />
                <Text fontSize="xs" color={mutedTextColor}>
                  {brand.budget.toLocaleString()}
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FiDollarSign} color={mutedTextColor} boxSize={4} />
                <Text fontSize="xs" color={mutedTextColor}>
                  Budget
                </Text>
              </HStack>
            </SimpleGrid>
            
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

  const FilterDrawer = () => (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px" color={textColor}>
          Filters
        </DrawerHeader>
        
        <DrawerBody>
          <VStack spacing={6} align="stretch" pt={4}>
            {/* Niche Filter */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" color={textColor} mb={3}>
                Niche
              </Text>
              <Wrap spacing={2}>
                {niches.map((niche) => (
                  <WrapItem key={niche}>
                    <Badge
                      colorScheme={selectedNiche === niche ? 'purple' : 'gray'}
                      variant={selectedNiche === niche ? 'solid' : 'outline'}
                      cursor="pointer"
                      onClick={() => handleNicheToggle(niche)}
                      _hover={{ opacity: 0.8 }}
                    >
                      {niche}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
            
            {/* Budget Filter */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" color={textColor} mb={3}>
                Budget Range
              </Text>
              <Select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                placeholder="All budgets"
                size="sm"
              >
                {budgetRanges.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </Select>
            </Box>
            

            
            <Divider />
            
            <Button
              colorScheme="purple"
              onClick={clearFilters}
              variant="outline"
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
    <VStack spacing={{ base: 4, md: 6 }} align="stretch">
      {/* Header */}
      <Box>
        <VStack align="start" spacing={3}>
          <Heading 
            size={{ base: 'lg', md: 'xl' }} 
            color={textColor}
            fontWeight="bold"
          >
            Explore Brands
          </Heading>
          <Text 
            fontSize={{ base: 'sm', md: 'md' }} 
            color={mutedTextColor}
          >
            Discover brands looking for influencers like you
          </Text>
        </VStack>
      </Box>

      {/* Search and Filters */}
      <Box>
        <VStack spacing={4} align="stretch">
          {/* Search Bar */}
          <HStack spacing={3}>
            <Box flex={1}>
              <Input
                placeholder="Search brands, niches, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="lg"
                bg={bgColor}
                borderColor={borderColor}
                _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)' }}
              />
            </Box>
            {!isMobile && (
              <Button
                colorScheme="purple"
                size="lg"
                leftIcon={<FiFilter />}
                onClick={onOpen}
              >
                Filters
              </Button>
            )}
            {isMobile && (
              <IconButton
                aria-label="Filters"
                icon={<FiFilter />}
                colorScheme="purple"
                size="lg"
                onClick={onOpen}
              />
            )}
          </HStack>

          {/* Mobile Filters Display */}
          {isMobile && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color={textColor} mb={3}>
                Active Filters:
              </Text>
              <Wrap spacing={2}>
                {selectedNiche && (
                  <WrapItem>
                    <Badge colorScheme="purple" variant="solid" size="sm">
                      {selectedNiche}
                    </Badge>
                  </WrapItem>
                )}
                {selectedBudget && (
                  <WrapItem>
                    <Badge colorScheme="blue" variant="solid" size="sm">
                      {selectedBudget}
                    </Badge>
                  </WrapItem>
                )}
                                 {(selectedNiche || selectedBudget) && (
                  <WrapItem>
                    <Badge 
                      colorScheme="gray" 
                      variant="outline" 
                      size="sm"
                      cursor="pointer"
                      onClick={clearFilters}
                    >
                      Clear All
                    </Badge>
                  </WrapItem>
                )}
              </Wrap>
            </Box>
          )}

          {/* Desktop Quick Filters */}
          {!isMobile && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color={textColor} mb={3}>
                Quick Filters:
              </Text>
              <Wrap spacing={3}>
                {niches.slice(0, 6).map((niche) => (
                  <WrapItem key={niche}>
                    <Badge
                      colorScheme={selectedNiche === niche ? 'purple' : 'gray'}
                      variant={selectedNiche === niche ? 'solid' : 'outline'}
                      cursor="pointer"
                      onClick={() => handleNicheToggle(niche)}
                      _hover={{ opacity: 0.8 }}
                      size="md"
                    >
                      {niche}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Results Count */}
      <Box>
        <HStack justify="space-between" align="center">
          <Text fontSize="sm" color={mutedTextColor}>
            {filteredBrands.length} brands found
          </Text>
                     {(selectedNiche || selectedBudget) && (
            <Button
              size="sm"
              variant="ghost"
              colorScheme="purple"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          )}
        </HStack>
      </Box>

      {/* Brands Grid */}
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={{ base: 4, md: 6 }}
      >
        {filteredBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </SimpleGrid>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <Box textAlign="center" py={12}>
          <VStack spacing={4}>
            <Icon as={FiSearch} boxSize={12} color={mutedTextColor} />
            <VStack spacing={2}>
              <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                No brands found
              </Text>
              <Text fontSize="sm" color={mutedTextColor}>
                Try adjusting your search terms or filters
              </Text>
            </VStack>
            <Button
              colorScheme="purple"
              variant="outline"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </VStack>
        </Box>
      )}

      {/* Filter Drawer for Mobile */}
      <FilterDrawer />
    </VStack>
  );
};

export default ExploreBrands;
