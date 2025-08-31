import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Divider,
  HStack,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const MotionBox = motion.create(Box);

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // In real app, this would send a reset email
      toast({
        title: 'Reset link sent! 📧',
        description: 'Check your email for password reset instructions.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: 'Oops! 😅',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
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
          maxW="400px"
        >
          <Box
            bg={bgColor}
            borderRadius="xl"
            boxShadow="xl"
            p={8}
            border="1px"
            borderColor={borderColor}
            textAlign="center"
          >
            <VStack spacing={6}>
              <Icon as={FiCheckCircle} w={16} h={16} color="green.500" />
              <VStack spacing={2}>
                <Heading size="lg" color="green.600">
                  Check Your Email! 📧
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  We've sent password reset instructions to:
                </Text>
                <Text fontWeight="medium" color="purple.600">
                  {email}
                </Text>
              </VStack>
              
              <Text fontSize="sm" color="gray.500">
                Didn't receive the email? Check your spam folder or try again.
              </Text>

              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                colorScheme="purple"
                size="lg"
                w="full"
                borderRadius="lg"
              >
                Try Again
              </Button>

              <Link to="/login">
                <Button
                  variant="ghost"
                  colorScheme="purple"
                  leftIcon={<FiArrowLeft />}
                  size="sm"
                >
                  Back to Login
                </Button>
              </Link>
            </VStack>
          </Box>
        </MotionBox>
      </Box>
    );
  }

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        w="full"
        maxW="400px"
      >
        <Box
          bg={bgColor}
          borderRadius="xl"
          boxShadow="xl"
          p={8}
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <VStack spacing={2}>
              <Heading
                size="lg"
                bgGradient="linear(to-r, purple.500, blue.500)"
                bgClip="text"
                textAlign="center"
              >
                Forgot Password? 😅
              </Heading>
              <Text color="gray.600" textAlign="center" fontSize="sm">
                No worries! Enter your email and we'll send you reset instructions.
              </Text>
            </VStack>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Email Address
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    borderRadius="lg"
                    _focus={{
                      borderColor: 'purple.500',
                      boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)',
                    }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  w="full"
                  isLoading={isLoading}
                  loadingText="Sending reset link..."
                  borderRadius="lg"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Send Reset Link 📧
                </Button>
              </VStack>
            </form>

            <Divider />

            {/* Links */}
            <VStack spacing={3}>
              <Link to="/login">
                <Button
                  variant="ghost"
                  colorScheme="purple"
                  leftIcon={<FiArrowLeft />}
                  size="sm"
                >
                  Back to Login
                </Button>
              </Link>
              
              <HStack spacing={1}>
                <Text fontSize="sm" color="gray.600">
                  Don't have an account?
                </Text>
                <Link to="/signup">
                  <Text
                    color="purple.500"
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Sign up here ✨
                  </Text>
                </Link>
              </HStack>
            </VStack>

            {/* Help Text */}
            <Box
              bg="blue.50"
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="blue.200"
            >
              <Text fontSize="xs" color="blue.700" textAlign="center">
                💡 Tip: Make sure to check your spam folder if you don't see the email in your inbox!
              </Text>
            </Box>
          </VStack>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default ForgotPassword;
