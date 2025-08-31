import React from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  Card,
  CardBody,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Leaderboard: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

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
            Leaderboard 🏆
          </Heading>
          <Text color="gray.600">
            See how you rank among top influencers
          </Text>
        </VStack>
      </MotionBox>

      <Card bg={bgColor} border="1px" borderColor={borderColor}>
        <CardBody textAlign="center" py={12}>
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="medium" color="gray.600">
              Coming Soon! 🚧
            </Text>
            <Text fontSize="sm" color="gray.500">
              This feature is under development. You'll be able to see the leaderboard and your ranking here.
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Leaderboard;
