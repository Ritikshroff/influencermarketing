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

const AdSpend: React.FC = () => {
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
            Ad Spend Management 💳
          </Heading>
          <Text color="gray.600">
            Manage your advertising budget and track spending
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
              This feature is under development. You'll be able to manage your ad spend and budget here.
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default AdSpend;
