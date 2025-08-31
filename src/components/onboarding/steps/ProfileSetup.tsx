import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  HStack,
  Text,
  Avatar,
  Button,
  useColorModeValue,
  Box
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

interface ProfileSetupProps {
  formData: any;
  updateFormData: (data: any) => void;
  userType?: 'influencer' | 'brand';
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ formData, updateFormData, userType }) => {
  const [avatar, setAvatar] = useState(formData.avatar || '');
  const textColor = useColorModeValue('gray.700', 'white');

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setAvatar(avatarUrl);
        updateFormData({ avatar: avatarUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const niches = [
    'Fashion & Beauty',
    'Fitness & Health',
    'Technology',
    'Gaming',
    'Food & Cooking',
    'Travel',
    'Lifestyle',
    'Education',
    'Business',
    'Entertainment'
  ];

  const industries = [
    'Fashion & Apparel',
    'Beauty & Cosmetics',
    'Technology',
    'Food & Beverage',
    'Health & Wellness',
    'Travel & Tourism',
    'Education',
    'Finance',
    'Entertainment',
    'Sports & Fitness'
  ];

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
          Let's set up your profile
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          {userType === 'influencer' 
            ? 'Tell us about yourself and your content'
            : 'Tell us about your brand and business'
          }
        </Text>
      </VStack>

      {/* Avatar Upload */}
      <VStack spacing={3}>
        <Avatar
          size="xl"
          src={avatar}
          name={formData.name || 'User'}
          bg="purple.100"
        />
        <Button
          size="sm"
          variant="outline"
          leftIcon={<FiUpload />}
          onClick={() => document.getElementById('avatar-upload')?.click()}
        >
          Upload Photo
        </Button>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
      </VStack>

      {/* Basic Info */}
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            {userType === 'influencer' ? 'Display Name' : 'Contact Person'}
          </FormLabel>
          <Input
            placeholder={userType === 'influencer' ? 'Your display name' : 'Your name'}
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            size="lg"
            borderRadius="lg"
          />
        </FormControl>

        {userType === 'brand' && (
          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium">
              Company Name
            </FormLabel>
            <Input
              placeholder="Your company name"
              value={formData.companyName || ''}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              size="lg"
              borderRadius="lg"
            />
          </FormControl>
        )}

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            {userType === 'influencer' ? 'Bio' : 'Company Description'}
          </FormLabel>
          <Textarea
            placeholder={
              userType === 'influencer' 
                ? 'Tell us about yourself and your content...'
                : 'Tell us about your company and what you do...'
            }
            value={formData.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            size="lg"
            borderRadius="lg"
            rows={3}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium">
            {userType === 'influencer' ? 'Niche' : 'Industry'}
          </FormLabel>
          <Select
            placeholder={`Select your ${userType === 'influencer' ? 'niche' : 'industry'}`}
            value={formData.niche || formData.industry || ''}
            onChange={(e) => handleInputChange(
              userType === 'influencer' ? 'niche' : 'industry', 
              e.target.value
            )}
            size="lg"
            borderRadius="lg"
          >
            {(userType === 'influencer' ? niches : industries).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="medium">
            Location
          </FormLabel>
          <Input
            placeholder="City, Country"
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            size="lg"
            borderRadius="lg"
          />
        </FormControl>

        {userType === 'influencer' && (
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="medium">
              Website (Optional)
            </FormLabel>
            <Input
              placeholder="https://yourwebsite.com"
              value={formData.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
              size="lg"
              borderRadius="lg"
            />
          </FormControl>
        )}
      </VStack>

      {/* Progress Indicator */}
      <Box
        p={3}
        bg="blue.50"
        borderRadius="lg"
        border="1px"
        borderColor="blue.200"
      >
        <Text fontSize="xs" color="blue.700" textAlign="center">
          💡 Don't worry, you can always update this information later in your profile settings!
        </Text>
      </Box>
    </VStack>
  );
};

export default ProfileSetup;
