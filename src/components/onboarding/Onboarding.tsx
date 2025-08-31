import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Progress,
  useColorModeValue,
  useToast,
  Heading
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import ProfileSetup from './steps/ProfileSetup';
import PlatformConnect from './steps/PlatformConnect';
import Preferences from './steps/Preferences';
import Welcome from './steps/Welcome';

const MotionBox = motion.create(Box);

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to InfluenceHub!',
      description: 'Let\'s get you set up for success',
      component: Welcome
    },
    {
      id: 'profile',
      title: 'Profile Setup',
      description: 'Tell us about yourself',
      component: ProfileSetup
    },
    {
      id: 'platforms',
      title: 'Connect Platforms',
      description: 'Link your social media accounts',
      component: PlatformConnect
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Set your campaign preferences',
      component: Preferences
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Update user onboarding status
      updateUser({ isOnboarded: true });
      
      toast({
        title: 'Welcome aboard! 🎉',
        description: 'Your profile is now complete. Let\'s start your journey!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirect to appropriate dashboard
      if (user?.userType === 'influencer') {
        navigate('/influencer/dashboard');
      } else {
        navigate('/brand/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Oops! 😅',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, purple.50, blue.50, pink.50)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        w="full"
        maxW="600px"
      >
        <Box
          bg={bgColor}
          borderRadius="xl"
          boxShadow="xl"
          border="1px"
          borderColor={borderColor}
          overflow="hidden"
        >
          {/* Progress Header */}
          <Box p={6} borderBottom="1px" borderColor={borderColor}>
            <VStack spacing={4}>
              <HStack w="full" justify="space-between">
                <VStack align="start" spacing={1}>
                  <Heading size="md" color="gray.700">
                    {steps[currentStep].title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {steps[currentStep].description}
                  </Text>
                </VStack>
                <Text fontSize="sm" color="gray.500">
                  {currentStep + 1} of {steps.length}
                </Text>
              </HStack>
              
              <Progress
                value={((currentStep + 1) / steps.length) * 100}
                colorScheme="purple"
                size="sm"
                borderRadius="full"
                w="full"
              />
              
              <HStack spacing={2} w="full">
                {steps.map((step, index) => (
                  <Box
                    key={step.id}
                    w="full"
                    h="2px"
                    bg={index <= currentStep ? 'purple.500' : 'gray.200'}
                    borderRadius="full"
                    transition="all 0.3s"
                  />
                ))}
              </HStack>
            </VStack>
          </Box>

          {/* Step Content */}
          <Box p={6}>
            <AnimatePresence mode="wait">
              <MotionBox
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={updateFormData}
                  userType={user?.userType}
                />
              </MotionBox>
            </AnimatePresence>
          </Box>

          {/* Navigation */}
          <Box p={6} borderTop="1px" borderColor={borderColor}>
            <HStack justify="space-between">
              <Button
                onClick={handleBack}
                leftIcon={<FiArrowLeft />}
                variant="outline"
                isDisabled={currentStep === 0}
              >
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                rightIcon={currentStep === steps.length - 1 ? <FiCheck /> : <FiArrowRight />}
                colorScheme="purple"
                px={8}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next Step'}
              </Button>
            </HStack>
          </Box>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Onboarding;
