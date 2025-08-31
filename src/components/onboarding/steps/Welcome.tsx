import React from 'react';
import {
  VStack,
  Text,
  Icon,
  Box,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { FiStar, FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';

interface WelcomeProps {
  userType?: 'influencer' | 'brand';
}

const Welcome: React.FC<WelcomeProps> = ({ userType }) => {
  const textColor = useColorModeValue('gray.700', 'white');

  const benefits = [
    {
      icon: FiStar,
      title: 'Exclusive Opportunities',
      description: 'Access to premium campaigns and brand partnerships'
    },
    {
      icon: FiTrendingUp,
      title: 'Growth Analytics',
      description: 'Detailed insights to optimize your performance'
    },
    {
      icon: FiUsers,
      title: 'Community',
      description: 'Connect with top influencers and brands'
    },
    {
      icon: FiAward,
      title: 'Recognition',
      description: 'Get featured on leaderboards and earn rewards'
    }
  ];

  return (
    <VStack spacing={8} align="center" textAlign="center">
      <VStack spacing={4}>
        <Box
          w="80px"
          h="80px"
          borderRadius="full"
          bgGradient="linear(to-r, purple.500, blue.500)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FiStar} boxSize={8} color="white" />
        </Box>
        
        <VStack spacing={2}>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Welcome to InfluenceHub! 🎉
          </Text>
          <Text fontSize="lg" color="gray.600">
            {userType === 'influencer' 
              ? 'Ready to take your influence to the next level?'
              : 'Ready to connect with amazing influencers?'
            }
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={4} w="full">
        <Text fontSize="md" fontWeight="semibold" color={textColor}>
          What you'll get:
        </Text>
        
        <VStack spacing={3} w="full">
          {benefits.map((benefit, index) => (
            <HStack key={index} spacing={4} w="full" p={3} bg="gray.50" borderRadius="lg">
              <Box
                p={2}
                borderRadius="lg"
                bg="purple.100"
                color="purple.600"
              >
                <Icon as={benefit.icon} boxSize={5} />
              </Box>
              <VStack align="start" spacing={0} flex={1}>
                <Text fontSize="sm" fontWeight="medium" color={textColor}>
                  {benefit.title}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {benefit.description}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>

      <Box
        p={4}
        bg="purple.50"
        borderRadius="lg"
        border="1px"
        borderColor="purple.200"
        w="full"
      >
        <Text fontSize="sm" color="purple.700" textAlign="center">
          💡 This setup will only take a few minutes and will help us personalize your experience!
        </Text>
      </Box>
    </VStack>
  );
};

export default Welcome;
