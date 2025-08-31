import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const MotionBox = motion.create(Box);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: 'Welcome back! 🎉',
          description: result.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Redirect based on user type
        const userData = localStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.userType === 'influencer') {
            navigate('/influencer/dashboard');
          } else {
            navigate('/brand/dashboard');
          }
        }
      } else {
        toast({
          title: 'Oops! 😅',
          description: result.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong! 😱',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                Welcome Back! 👋
              </Heading>
              <Text color="gray.600" textAlign="center" fontSize="sm">
                Ready to boost your influence? Let's get you back in the game!
              </Text>
            </VStack>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Email Address
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      // leftIcon={<FiMail />}
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: 'purple.500',
                        boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)',
                      }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: 'purple.500',
                        boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)',
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        size="sm"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  w="full"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  rightIcon={<FiArrowRight />}
                  borderRadius="lg"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Let's Go! 🚀
                </Button>
              </VStack>
            </form>

            <Divider />

            {/* Links */}
            <VStack spacing={3}>
              <Link to="/forgot-password">
                <Text
                  color="purple.500"
                  fontSize="sm"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Forgot your password? 😅
                </Text>
              </Link>
              
              <HStack spacing={1}>
                <Text fontSize="sm" color="gray.600">
                  New here?
                </Text>
                <Link to="/signup">
                  <Text
                    color="purple.500"
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Create an account ✨
                  </Text>
                </Link>
              </HStack>
            </VStack>

            {/* Demo Credentials */}
            <Box
              bg="gray.50"
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
            >
              <Text fontSize="xs" color="gray.600" fontWeight="medium" mb={2}>
                Demo Credentials:
              </Text>
              <Text fontSize="xs" color="gray.500">
                Email: sarah@example.com | Password: password123
              </Text>
            </Box>
          </VStack>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Login;
