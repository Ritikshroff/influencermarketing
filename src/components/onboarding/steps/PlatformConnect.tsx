import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Button,
  Box,
  Icon,
  useColorModeValue,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Badge
} from '@chakra-ui/react';
import { FiInstagram, FiYoutube, FiTwitter, FiLink } from 'react-icons/fi';

interface PlatformConnectProps {
  formData: any;
  updateFormData: (data: any) => void;
  userType?: 'influencer' | 'brand';
}

const PlatformConnect: React.FC<PlatformConnectProps> = ({ formData, updateFormData, userType }) => {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>(formData.connectedPlatforms || []);
  const textColor = useColorModeValue('gray.700', 'white');

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: FiInstagram,
      color: '#E4405F',
      description: 'Connect your Instagram account'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: FiYoutube,
      color: '#FF0000',
      description: 'Connect your YouTube channel'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: FiYoutube,
      color: '#000000',
      description: 'Connect your TikTok account'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: FiTwitter,
      color: '#1DA1F2',
      description: 'Connect your Twitter account'
    }
  ];

  const handlePlatformToggle = (platformId: string) => {
    const updatedPlatforms = connectedPlatforms.includes(platformId)
      ? connectedPlatforms.filter(id => id !== platformId)
      : [...connectedPlatforms, platformId];
    
    setConnectedPlatforms(updatedPlatforms);
    updateFormData({ connectedPlatforms: updatedPlatforms });
  };

  const handlePlatformUrlChange = (platformId: string, url: string) => {
    updateFormData({
      platformUrls: {
        ...formData.platformUrls,
        [platformId]: url
      }
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
          Connect Your Platforms
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          {userType === 'influencer' 
            ? 'Link your social media accounts to showcase your reach'
            : 'Connect platforms where you want to run campaigns'
          }
        </Text>
      </VStack>

      <VStack spacing={4}>
        {platforms.map((platform) => {
          const isConnected = connectedPlatforms.includes(platform.id);
          const platformUrl = formData.platformUrls?.[platform.id] || '';

          return (
            <Box
              key={platform.id}
              w="full"
              p={4}
              border="2px"
              borderColor={isConnected ? platform.color : 'gray.200'}
              borderRadius="lg"
              bg={isConnected ? `${platform.color}10` : 'transparent'}
              transition="all 0.2s"
            >
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <HStack spacing={3}>
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={isConnected ? platform.color : 'gray.100'}
                      color={isConnected ? 'white' : 'gray.600'}
                    >
                      <Icon as={platform.icon} boxSize={5} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>
                        {platform.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {platform.description}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack spacing={2}>
                    {isConnected && (
                      <Badge colorScheme="green" size="sm">
                        Connected
                      </Badge>
                    )}
                    <Switch
                      isChecked={isConnected}
                      onChange={() => handlePlatformToggle(platform.id)}
                      colorScheme="purple"
                    />
                  </HStack>
                </HStack>

                {isConnected && (
                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.600">
                      {platform.name} URL
                    </FormLabel>
                    <Input
                      placeholder={`https://${platform.id}.com/yourusername`}
                      value={platformUrl}
                      onChange={(e) => handlePlatformUrlChange(platform.id, e.target.value)}
                      size="sm"
                      borderRadius="lg"
                      // leftIcon={<FiLink />}
                    />
                  </FormControl>
                )}
              </VStack>
            </Box>
          );
        })}
      </VStack>

      <Box
        p={3}
        bg="green.50"
        borderRadius="lg"
        border="1px"
        borderColor="green.200"
      >
        <Text fontSize="xs" color="green.700" textAlign="center">
          🔗 You can connect more platforms later in your profile settings. For now, connect at least one platform to get started!
        </Text>
      </Box>

      {connectedPlatforms.length === 0 && (
        <Box
          p={3}
          bg="orange.50"
          borderRadius="lg"
          border="1px"
          borderColor="orange.200"
        >
          <Text fontSize="xs" color="orange.700" textAlign="center">
            ⚠️ Connecting at least one platform will help you get better campaign matches!
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default PlatformConnect;
