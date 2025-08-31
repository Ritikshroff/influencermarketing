import React from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  Icon,
  useToast
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiMenu,
  FiHome,
  FiTrendingUp,
  FiUsers,
  FiMessageSquare,
  FiBell,
  FiSettings,
  FiLogOut,
  FiUser,
  FiDollarSign,
  FiAward,
  FiSearch,
  FiPlus
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'influencer' | 'brand';
}

interface NavItem {
  label: string;
  icon: React.ReactElement;
  href: string;
  badge?: string;
}

const MotionBox = motion.create(Box);

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const sidebarBg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const influencerNavItems: NavItem[] = [
    { label: 'Dashboard', icon: <FiHome />, href: '/influencer/dashboard' },
    { label: 'Analytics', icon: <FiTrendingUp />, href: '/influencer/analytics' },
    { label: 'Explore Brands', icon: <FiUsers />, href: '/influencer/brands' },
    { label: 'My Applications', icon: <FiSearch />, href: '/influencer/applications' },
    { label: 'Earnings', icon: <FiDollarSign />, href: '/influencer/earnings' },
    { label: 'Leaderboard', icon: <FiAward />, href: '/influencer/leaderboard' },
    { label: 'Messages', icon: <FiMessageSquare />, href: '/influencer/messages', badge: '3' },
  ];

  const brandNavItems: NavItem[] = [
    { label: 'Dashboard', icon: <FiHome />, href: '/brand/dashboard' },
    { label: 'Campaigns', icon: <FiTrendingUp />, href: '/brand/campaigns' },
    { label: 'Create Campaign', icon: <FiPlus />, href: '/brand/create-campaign' },
    { label: 'Influencer Search', icon: <FiUsers />, href: '/brand/influencers' },
    { label: 'Analytics', icon: <FiTrendingUp />, href: '/brand/analytics' },
    { label: 'Ad Spend', icon: <FiDollarSign />, href: '/brand/ad-spend' },
    { label: 'Messages', icon: <FiMessageSquare />, href: '/brand/messages', badge: '2' },
  ];

  const navItems = userType === 'influencer' ? influencerNavItems : brandNavItems;

  const handleLogout = () => {
    logout();
    toast({
      title: 'See you later! 👋',
      description: 'You have been successfully logged out.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/login');
  };

  const SidebarContent = () => (
    <VStack spacing={0} align="stretch" h="full">
      {/* Logo */}
      <Box p={6} borderBottom="1px" borderColor={borderColor}>
        <Text
          fontSize="xl"
          fontWeight="bold"
          bgGradient="linear(to-r, purple.500, blue.500)"
          bgClip="text"
        >
          InfluenceHub ✨
        </Text>
      </Box>

      {/* Navigation */}
      <VStack spacing={2} p={4} flex={1}>
        {navItems.map((item) => (
          <Box
            key={item.label}
            w="full"
            as="button"
            onClick={() => navigate(item.href)}
            _hover={{ bg: 'purple.50' }}
            borderRadius="lg"
            p={3}
            textAlign="left"
            transition="all 0.2s"
          >
            <HStack spacing={3}>
              <Icon color="purple.500" />
              <Text fontSize="sm" fontWeight="medium">
                {item.label}
              </Text>
              {item.badge && (
                <Badge colorScheme="red" size="sm" ml="auto">
                  {item.badge}
                </Badge>
              )}
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* User Profile */}
      <Box p={4} borderTop="1px" borderColor={borderColor}>
        <HStack spacing={3}>
          <Avatar size="sm" src={user?.avatar} name={user?.name} />
          <VStack align="start" spacing={0} flex={1}>
            <Text fontSize="sm" fontWeight="medium">
              {user?.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {userType === 'influencer' ? 'Influencer' : 'Brand'}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );

  return (
    <Box h="100vh" bg="gray.50">
      {/* Mobile Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Text
              fontSize="lg"
              fontWeight="bold"
              bgGradient="linear(to-r, purple.500, blue.500)"
              bgClip="text"
            >
              InfluenceHub
            </Text>
          </DrawerHeader>
          <DrawerBody p={0}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop Layout */}
      <Flex h="full">
        {/* Desktop Sidebar */}
        <Box
          display={{ base: 'none', md: 'block' }}
          w="280px"
          bg={sidebarBg}
          borderRight="1px"
          borderColor={borderColor}
        >
          <SidebarContent />
        </Box>

        {/* Main Content */}
        <Box flex={1} display="flex" flexDirection="column">
          {/* Top Navbar */}
          <Box
            bg={bgColor}
            borderBottom="1px"
            borderColor={borderColor}
            p={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack spacing={4}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                icon={<FiMenu />}
                onClick={onOpen}
                variant="ghost"
                aria-label="Open menu"
              />
              <Text fontSize="lg" fontWeight="semibold">
                {userType === 'influencer' ? 'Influencer Dashboard' : 'Brand Dashboard'}
              </Text>
            </HStack>

            <HStack spacing={4}>
              {/* Notifications */}
              <IconButton
                icon={<FiBell />}
                variant="ghost"
                aria-label="Notifications"
                position="relative"
              >
                <Badge
                  colorScheme="red"
                  size="sm"
                  position="absolute"
                  top="2"
                  right="2"
                >
                  3
                </Badge>
              </IconButton>

              {/* User Menu */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiUser />}
                  variant="ghost"
                  aria-label="User menu"
                />
                <MenuList>
                  <MenuItem icon={<FiUser />}>
                    Profile
                  </MenuItem>
                  <MenuItem icon={<FiSettings />}>
                    Settings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>

          {/* Page Content */}
          <Box flex={1} p={6} overflow="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </MotionBox>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardLayout;
