import React from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  useToast
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu,
  FiHome,
  FiTrendingUp,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
  FiUser,
  FiDollarSign,
  FiBarChart,
  FiTarget,
  FiMessageSquare,
  FiAward,
  FiCalendar
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const MotionBox = motion.create(Box);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.300');
  const sidebarBg = useColorModeValue('gray.50', 'gray.900');
  const sidebarBorderColor = useColorModeValue('gray.200', 'gray.700');

  const isMobile = useBreakpointValue({ base: true, md: false });


  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error logging out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: FiHome,
      path: user?.userType === 'brand' ? '/brand/dashboard' : '/influencer/dashboard',
      badge: null
    },
    {
      name: 'Campaigns',
      icon: FiTarget,
      path: user?.userType === 'brand' ? '/brand/campaigns' : '/influencer/campaigns',
      badge: user?.userType === 'brand' ? '3' : null
    },
    {
      name: 'Analytics',
      icon: FiBarChart,
      path: user?.userType === 'brand' ? '/brand/analytics' : '/influencer/analytics',
      badge: null
    },
    {
      name: 'Influencers',
      icon: FiUsers,
      path: user?.userType === 'brand' ? '/brand/influencers' : '/influencer/explore-brands',
      badge: user?.userType === 'brand' ? '12' : null
    },
    {
      name: 'Messages',
      icon: FiMessageSquare,
      path: '/messages',
      badge: '2'
    },
    {
      name: 'Earnings',
      icon: FiDollarSign,
      path: user?.userType === 'influencer' ? '/influencer/earnings' : '/brand/billing',
      badge: null
    },
    {
      name: 'Calendar',
      icon: FiCalendar,
      path: '/calendar',
      badge: null
    },
    {
      name: 'Achievements',
      icon: FiAward,
      path: user?.userType === 'influencer' ? '/influencer/achievements' : '/brand/achievements',
      badge: user?.userType === 'influencer' ? '5' : null
    }
  ];

  const SidebarContent = () => (
    <VStack spacing={0} align="stretch" h="full">
      {/* Logo/Brand Section */}
      <Box p={6} borderBottom="1px" borderColor={sidebarBorderColor}>
        <HStack spacing={3}>
          <Box
            p={2}
            borderRadius="lg"
            bg="purple.100"
            color="purple.600"
          >
            <FiTrendingUp size={24} />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              PromptAI
            </Text>
            <Text fontSize="xs" color={mutedTextColor}>
              Dashboard
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Navigation Items */}
      <VStack spacing={1} align="stretch" flex={1} p={4}>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <Button
              key={item.name}
              variant="ghost"
              justifyContent="start"
              leftIcon={<IconComponent size={20} />}
              rightIcon={item.badge ? (
                <Badge
                  colorScheme="purple"
                  variant="solid"
                  size="sm"
                  borderRadius="full"
                >
                  {item.badge}
                </Badge>
              ) : undefined}
              onClick={() => {
                navigate(item.path);
                if (isMobile) onClose();
              }}
              bg={isActive ? 'purple.50' : 'transparent'}
              color={isActive ? 'purple.600' : textColor}
              _hover={{
                bg: isActive ? 'purple.100' : 'gray.100',
                color: isActive ? 'purple.700' : textColor,
              }}
              _active={{
                bg: isActive ? 'purple.200' : 'gray.200',
              }}
              h="auto"
              py={3}
              px={4}
              borderRadius="lg"
              fontWeight="medium"
              fontSize="sm"
              transition="all 0.2s"
            >
              <Text flex={1} textAlign="left">
                {item.name}
              </Text>
            </Button>
          );
        })}
      </VStack>

      {/* User Profile Section */}
      <Box p={4} borderTop="1px" borderColor={sidebarBorderColor}>
        <VStack spacing={3} align="stretch">
          <Divider />
          <HStack spacing={3}>
            <Avatar
              size="sm"
              src={user?.avatar}
              name={user?.name}
              bg="purple.100"
            />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                {user?.name}
              </Text>
              <Text fontSize="xs" color={mutedTextColor}>
                {user?.userType === 'brand' ? 'Brand Manager' : 'Influencer'}
              </Text>
            </VStack>
          </HStack>
          
          <VStack spacing={1} align="stretch">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<FiSettings size={16} />}
              onClick={() => navigate('/settings')}
              justifyContent="start"
              color={mutedTextColor}
              _hover={{ bg: 'gray.100', color: textColor }}
              h="auto"
              py={2}
              px={3}
              borderRadius="md"
              fontSize="xs"
            >
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<FiLogOut size={16} />}
              onClick={handleLogout}
              justifyContent="start"
              color="red.500"
              _hover={{ bg: 'red.50', color: 'red.600' }}
              h="auto"
              py={2}
              px={3}
              borderRadius="md"
              fontSize="xs"
            >
              Logout
            </Button>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={sidebarBg} borderRight="1px" borderColor={sidebarBorderColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" borderColor={sidebarBorderColor} pb={4}>
            <HStack spacing={3}>
              <Box
                p={2}
                borderRadius="lg"
                bg="purple.100"
                color="purple.600"
              >
                <FiTrendingUp size={20} />
              </Box>
              <Text fontSize="md" fontWeight="bold" color={textColor}>
                PromptAI
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody p={0}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Box
            w={{ base: 'full', md: '280px' }}
            bg={sidebarBg}
            borderRight="1px"
            borderColor={sidebarBorderColor}
            h="100vh"
            position="sticky"
            top={0}
            overflowY="auto"
            display={{ base: 'none', md: 'block' }}
          >
            <SidebarContent />
          </Box>
        )}

        {/* Main Content */}
        <Box flex={1} minW={0}>
          {/* Top Navigation Bar */}
          <Box
            bg={bgColor}
            borderBottom="1px"
            borderColor={borderColor}
            px={{ base: 4, md: 6 }}
            py={4}
            position="sticky"
            top={0}
            zIndex={10}
            backdropFilter="blur(10px)"
          >
            <Flex justify="space-between" align="center">
              {/* Left Section */}
              <HStack spacing={4}>
                {isMobile && (
                  <IconButton
                    aria-label="Open menu"
                    icon={<FiMenu />}
                    variant="ghost"
                    onClick={onOpen}
                    size="lg"
                    color={textColor}
                    _hover={{ bg: 'gray.100' }}
                  />
                )}
                
                {/* Search Bar - Hidden on mobile */}
                {!isMobile && (
                  <Box position="relative" w="400px">
                    <Box
                      position="absolute"
                      left={3}
                      top="50%"
                      transform="translateY(-50%)"
                      color={mutedTextColor}
                    >
                      <FiSearch size={18} />
                    </Box>
                    <input
                      type="text"
                      placeholder="Search campaigns, influencers, analytics..."
                      style={{
                        width: '100%',
                        padding: '10px 16px 10px 40px',
                        border: `1px solid ${borderColor}`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: bgColor,
                        color: textColor,
                      }}
                    />
                  </Box>
                )}
              </HStack>

              {/* Right Section */}
              <HStack spacing={4}>
                {/* Notifications */}
                <IconButton
                  aria-label="Notifications"
                  icon={<FiBell />}
                  variant="ghost"
                  size="lg"
                  color={textColor}
                  _hover={{ bg: 'gray.100' }}
                  position="relative"
                >
                  <Badge
                    colorScheme="red"
                    variant="solid"
                    size="sm"
                    position="absolute"
                    top={2}
                    right={2}
                    borderRadius="full"
                  >
                    3
                  </Badge>
                </IconButton>

                {/* User Menu */}
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    size="lg"
                    rightIcon={<FiUser />}
                    leftIcon={
                      <Avatar
                        size="sm"
                        src={user?.avatar}
                        name={user?.name}
                        bg="purple.100"
                      />
                    }
                    _hover={{ bg: 'gray.100' }}
                    color={textColor}
                  >
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="medium">
                        {user?.name}
                      </Text>
                      <Text fontSize="xs" color={mutedTextColor}>
                        {user?.userType === 'brand' ? 'Brand Manager' : 'Influencer'}
                      </Text>
                    </VStack>
                  </MenuButton>
                  <MenuList bg={bgColor} borderColor={borderColor}>
                    <MenuItem
                      icon={<FiUser size={16} />}
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      icon={<FiSettings size={16} />}
                      onClick={() => navigate('/settings')}
                    >
                      Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      icon={<FiLogOut size={16} />}
                      onClick={handleLogout}
                      color="red.500"
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Flex>
          </Box>

          {/* Page Content */}
          <Box p={{ base: 4, md: 6 }}>
            <AnimatePresence mode="wait">
              <MotionBox
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </MotionBox>
            </AnimatePresence>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardLayout;
