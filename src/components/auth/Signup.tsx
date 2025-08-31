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
  useColorModeValue,
  RadioGroup,
  Radio,
  Stack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiArrowRight, FiStar } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const MotionBox = motion.create(Box);

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'influencer' | 'brand'>('influencer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match! 😅",
        description: 'Please make sure your passwords match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Password too short! 😅',
        description: 'Password must be at least 6 characters long.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(email, password, name, userType);
      
      if (result.success) {
        toast({
          title: 'Welcome aboard! 🎉',
          description: result.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Redirect to onboarding
        navigate('/onboarding');
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
        maxW="450px"
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
                Join the Revolution! 🚀
              </Heading>
              <Text color="gray.600" textAlign="center" fontSize="sm">
                Ready to make waves in the influencer marketing world?
              </Text>
            </VStack>

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Full Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Your awesome name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="lg"
                    borderRadius="lg"
                    _focus={{
                      borderColor: 'purple.500',
                      boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)',
                    }}
                  />
                </FormControl>

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

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    I am a...
                  </FormLabel>
                  <RadioGroup value={userType} onChange={(value: 'influencer' | 'brand') => setUserType(value)}>
                    <Stack direction="row" spacing={6}>
                      <Radio value="influencer" colorScheme="purple">
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">Influencer</Text>
                          <Text fontSize="xs" color="gray.500">Content Creator</Text>
                        </VStack>
                      </Radio>
                      <Radio value="brand" colorScheme="purple">
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">Brand</Text>
                          <Text fontSize="xs" color="gray.500">Business Owner</Text>
                        </VStack>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
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

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: 'purple.500',
                        boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)',
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  loadingText="Creating account..."
                  rightIcon={<FiArrowRight />}
                  borderRadius="lg"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Start My Journey! ✨
                </Button>
              </VStack>
            </form>

            <Divider />

            {/* Links */}
            <VStack spacing={3}>
              <HStack spacing={1}>
                <Text fontSize="sm" color="gray.600">
                  Already have an account?
                </Text>
                <Link to="/login">
                  <Text
                    color="purple.500"
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Sign in here 🎯
                  </Text>
                </Link>
              </HStack>
            </VStack>

            {/* Benefits */}
            <Box
              bg="purple.50"
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="purple.200"
            >
              <VStack spacing={2} align="start">
                <HStack>
                  <FiStar color="purple" />
                  <Text fontSize="sm" fontWeight="medium" color="purple.700">
                    Why join us?
                  </Text>
                </HStack>
                <Text fontSize="xs" color="purple.600">
                  • Connect with top brands and influencers
                </Text>
                <Text fontSize="xs" color="purple.600">
                  • Grow your audience and earnings
                </Text>
                <Text fontSize="xs" color="purple.600">
                  • Access exclusive campaigns and opportunities
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Signup;
