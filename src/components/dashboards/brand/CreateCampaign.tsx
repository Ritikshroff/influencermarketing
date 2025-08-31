import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useColorModeValue,
  useBreakpointValue,
  useToast,
  SimpleGrid,
  Badge,
  Divider,
  Checkbox,
  CheckboxGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Progress,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiSave, FiEye } from 'react-icons/fi';

const MotionBox = motion(Box);

interface CampaignForm {
  title: string;
  description: string;
  industry: string;
  budget: number;
  duration: number;
  influencerCount: number;
  platforms: string[];
  requirements: string;
  startDate: string;
  endDate: string;
  targetAudience: string;
  contentType: string;
}

const CreateCampaign: React.FC = () => {
  const [formData, setFormData] = useState<CampaignForm>({
    title: '',
    description: '',
    industry: '',
    budget: 1000,
    duration: 30,
    influencerCount: 5,
    platforms: [],
    requirements: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    contentType: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');

  const industries = [
    'Technology', 'Fashion', 'Beauty', 'Health & Wellness', 'Food & Beverage',
    'Travel', 'Fitness', 'Education', 'Finance', 'Entertainment', 'Sports'
  ];

  const platforms = [
    'Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Facebook'
  ];

  const contentTypes = [
    'Product Reviews', 'Sponsored Posts', 'Story Features', 'Video Content',
    'Live Streams', 'Blog Posts', 'Podcast Mentions'
  ];

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Campaign details' },
    { id: 2, title: 'Requirements', description: 'Influencer criteria' },
    { id: 3, title: 'Budget & Timeline', description: 'Financial planning' },
    { id: 4, title: 'Review', description: 'Final confirmation' }
  ];

  const handleInputChange = (field: keyof CampaignForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Campaign Created! 🎉',
      description: 'Your campaign has been successfully launched.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    setIsSubmitting(false);
    // Reset form or redirect
    setFormData({
      title: '',
      description: '',
      industry: '',
      budget: 1000,
      duration: 30,
      influencerCount: 5,
      platforms: [],
      requirements: '',
      startDate: '',
      endDate: '',
      targetAudience: '',
      contentType: ''
    });
    setCurrentStep(1);
  };

  const renderStep1 = () => (
    <VStack spacing={6} align="stretch">
      <FormControl isRequired>
        <FormLabel fontSize="sm" fontWeight="medium">
          Campaign Title
        </FormLabel>
        <Input
          placeholder="Enter a catchy campaign title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          size="lg"
          borderRadius="lg"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel fontSize="sm" fontWeight="medium">
          Description
        </FormLabel>
        <Textarea
          placeholder="Describe your campaign goals and what you want to achieve"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          size="lg"
          borderRadius="lg"
          rows={4}
        />
      </FormControl>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            Industry
          </FormLabel>
          <Select
            placeholder="Select industry"
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            size="lg"
            borderRadius="lg"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            Content Type
          </FormLabel>
          <Select
            placeholder="Select content type"
            value={formData.contentType}
            onChange={(e) => handleInputChange('contentType', e.target.value)}
            size="lg"
            borderRadius="lg"
          >
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );

  const renderStep2 = () => (
    <VStack spacing={6} align="stretch">
      <FormControl isRequired>
        <FormLabel fontSize="sm" fontWeight="medium">
          Target Audience
        </FormLabel>
        <Input
          placeholder="e.g., Young professionals aged 25-35 interested in tech"
          value={formData.targetAudience}
          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          size="lg"
          borderRadius="lg"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel fontSize="sm" fontWeight="medium">
          Social Media Platforms
        </FormLabel>
        <CheckboxGroup
          value={formData.platforms}
          onChange={(values) => handleInputChange('platforms', values)}
        >
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
            {platforms.map((platform) => (
              <Checkbox key={platform} value={platform} size="lg">
                {platform}
              </Checkbox>
            ))}
          </SimpleGrid>
        </CheckboxGroup>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="medium">
          Additional Requirements
        </FormLabel>
        <Textarea
          placeholder="Any specific requirements for influencers (follower count, engagement rate, etc.)"
          value={formData.requirements}
          onChange={(e) => handleInputChange('requirements', e.target.value)}
          size="lg"
          borderRadius="lg"
          rows={3}
        />
      </FormControl>
    </VStack>
  );

  const renderStep3 = () => (
    <VStack spacing={6} align="stretch">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            Budget (USD)
          </FormLabel>
          <NumberInput
            value={formData.budget}
            onChange={(_, value) => handleInputChange('budget', value)}
            min={100}
            max={100000}
            size="lg"
          >
            <NumberInputField borderRadius="lg" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            Campaign Duration (days)
          </FormLabel>
          <NumberInput
            value={formData.duration}
            onChange={(_, value) => handleInputChange('duration', value)}
            min={7}
            max={365}
            size="lg"
          >
            <NumberInputField borderRadius="lg" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </SimpleGrid>

      <FormControl isRequired>
        <FormLabel fontSize="sm" fontWeight="medium">
          Number of Influencers
        </FormLabel>
        <NumberInput
          value={formData.influencerCount}
          onChange={(_, value) => handleInputChange('influencerCount', value)}
          min={1}
          max={100}
          size="lg"
        >
          <NumberInputField borderRadius="lg" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            Start Date
          </FormLabel>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            size="lg"
            borderRadius="lg"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            End Date
          </FormLabel>
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            size="lg"
            borderRadius="lg"
          />
        </FormControl>
      </SimpleGrid>
    </VStack>
  );

  const renderStep4 = () => (
    <VStack spacing={6} align="stretch">
      <Card bg="gray.50" border="1px" borderColor="gray.200">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Heading size="md" color="gray.700">Campaign Summary</Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Title</Text>
                <Text fontSize="md" fontWeight="semibold">{formData.title}</Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Industry</Text>
                <Text fontSize="md" fontWeight="semibold">{formData.industry}</Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Budget</Text>
                <Text fontSize="md" fontWeight="semibold">${formData.budget.toLocaleString()}</Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Duration</Text>
                <Text fontSize="md" fontWeight="semibold">{formData.duration} days</Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Influencers</Text>
                <Text fontSize="md" fontWeight="semibold">{formData.influencerCount}</Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">Platforms</Text>
                <HStack spacing={2} flexWrap="wrap">
                  {formData.platforms.map((platform) => (
                    <Badge key={platform} colorScheme="purple" variant="subtle">
                      {platform}
                    </Badge>
                  ))}
                </HStack>
              </Box>
            </SimpleGrid>
            
            <Divider />
            
            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={2}>Description</Text>
              <Text fontSize="md">{formData.description}</Text>
            </Box>
            
            {formData.requirements && (
              <Box>
                <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={2}>Requirements</Text>
                <Text fontSize="md">{formData.requirements}</Text>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

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
            Create Campaign ✨
          </Heading>
          <Text color={mutedTextColor}>
            Launch a new influencer marketing campaign
          </Text>
        </VStack>
      </MotionBox>

      {/* Progress Bar */}
      <Card bg={bgColor} border="1px" borderColor={borderColor} mb={6}>
        <CardBody>
          <VStack spacing={4}>
            <HStack justify="space-between" w="full">
              {steps.map((step) => (
                <VStack key={step.id} spacing={1} align="center" flex={1}>
                  <Box
                    w={8}
                    h={8}
                    borderRadius="full"
                    bg={currentStep >= step.id ? 'purple.500' : 'gray.200'}
                    color={currentStep >= step.id ? 'white' : 'gray.600'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    {currentStep > step.id ? '✓' : step.id}
                  </Box>
                  <Text fontSize="xs" textAlign="center" color={mutedTextColor}>
                    {step.title}
                  </Text>
                </VStack>
              ))}
            </HStack>
            <Progress value={(currentStep / steps.length) * 100} colorScheme="purple" w="full" size="sm" borderRadius="full" />
          </VStack>
        </CardBody>
      </Card>

      {/* Campaign Form */}
      <Card bg={bgColor} border="1px" borderColor={borderColor}>
        <CardBody p={{ base: 4, md: 8 }}>
          {renderCurrentStep()}
          
          {/* Navigation Buttons */}
          <HStack justify="space-between" mt={8} spacing={4}>
            <Button
              onClick={handleBack}
              isDisabled={currentStep === 1}
              variant="outline"
              size="lg"
              borderRadius="lg"
            >
              Back
            </Button>
            
            <HStack spacing={3}>
              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  colorScheme="purple"
                  size="lg"
                  borderRadius="lg"
                  rightIcon={<FiEye />}
                >
                  Preview
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  colorScheme="green"
                  size="lg"
                  borderRadius="lg"
                  isLoading={isSubmitting}
                  loadingText="Creating..."
                  rightIcon={<FiSave />}
                >
                  Create Campaign
                </Button>
              )}
            </HStack>
          </HStack>
        </CardBody>
      </Card>

      {/* Mobile Preview Button */}
      {isMobile && (
        <Button
          onClick={onOpen}
          colorScheme="purple"
          size="lg"
          w="full"
          mt={4}
          borderRadius="lg"
          leftIcon={<FiEye />}
        >
          Preview Campaign
        </Button>
      )}

      {/* Mobile Preview Drawer */}
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" borderColor={borderColor}>
            Campaign Preview
          </DrawerHeader>
          <DrawerBody>
            {renderStep4()}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default CreateCampaign;
