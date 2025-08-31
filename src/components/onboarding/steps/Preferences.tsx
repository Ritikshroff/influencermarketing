import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Box,
  useColorModeValue,
  Checkbox,
  CheckboxGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack
} from '@chakra-ui/react';
import { FiDollarSign, FiTarget, FiCalendar } from 'react-icons/fi';

interface PreferencesProps {
  formData: any;
  updateFormData: (data: any) => void;
  userType?: 'influencer' | 'brand';
}

const Preferences: React.FC<PreferencesProps> = ({ formData, updateFormData, userType }) => {
  const textColor = useColorModeValue('gray.700', 'white');

  const handlePreferenceChange = (field: string, value: any) => {
    updateFormData({ [field]: value });
  };

  const campaignTypes = [
    'Product Reviews',
    'Sponsored Posts',
    'Brand Ambassadorships',
    'Event Coverage',
    'Giveaways',
    'Video Content',
    'Story Posts',
    'Live Streams'
  ];

  const contentTypes = [
    'Photos',
    'Videos',
    'Stories',
    'Reels',
    'Live Streams',
    'Blog Posts',
    'Podcasts'
  ];

  const budgetRanges = [
    { label: 'Under $500', value: '0-500' },
    { label: '$500 - $1,000', value: '500-1000' },
    { label: '$1,000 - $5,000', value: '1000-5000' },
    { label: '$5,000 - $10,000', value: '5000-10000' },
    { label: '$10,000+', value: '10000+' }
  ];

  const timelineOptions = [
    { label: 'Immediate (1-7 days)', value: 'immediate' },
    { label: 'Short-term (1-2 weeks)', value: 'short' },
    { label: 'Medium-term (2-4 weeks)', value: 'medium' },
    { label: 'Long-term (1-3 months)', value: 'long' }
  ];

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
          Set Your Preferences
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          {userType === 'influencer' 
            ? 'Tell us what types of campaigns you prefer'
            : 'Set your campaign preferences and requirements'
          }
        </Text>
      </VStack>

      {userType === 'influencer' ? (
        // Influencer Preferences
        <VStack spacing={6}>
          {/* Campaign Types */}
          <Box w="full">
            <Text fontSize="md" fontWeight="medium" color={textColor} mb={3}>
              Preferred Campaign Types
            </Text>
            <CheckboxGroup
              value={formData.preferredCampaignTypes || []}
              onChange={(value) => handlePreferenceChange('preferredCampaignTypes', value)}
            >
              <VStack align="start" spacing={2}>
                {campaignTypes.map((type) => (
                  <Checkbox key={type} value={type} colorScheme="purple">
                    {type}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </Box>

          {/* Content Types */}
          <Box w="full">
            <Text fontSize="md" fontWeight="medium" color={textColor} mb={3}>
              Content Types You Create
            </Text>
            <CheckboxGroup
              value={formData.contentTypes || []}
              onChange={(value) => handlePreferenceChange('contentTypes', value)}
            >
              <VStack align="start" spacing={2}>
                {contentTypes.map((type) => (
                  <Checkbox key={type} value={type} colorScheme="purple">
                    {type}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </Box>

          {/* Minimum Budget */}
          <Box w="full">
            <Text fontSize="md" fontWeight="medium" color={textColor} mb={3}>
              Minimum Campaign Budget
            </Text>
            <Slider
              value={formData.minBudget || 500}
              onChange={(value) => handlePreferenceChange('minBudget', value)}
              min={100}
              max={10000}
              step={100}
              colorScheme="purple"
            >
              <SliderMark value={100} mt={2} fontSize="xs">
                $100
              </SliderMark>
              <SliderMark value={5000} mt={2} fontSize="xs">
                $5,000
              </SliderMark>
              <SliderMark value={10000} mt={2} fontSize="xs">
                $10,000
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Minimum: ${formData.minBudget || 500}
            </Text>
          </Box>

          {/* Availability */}
          <Box w="full">
            <Text fontSize="md" fontWeight="medium" color={textColor} mb={3}>
              Campaign Availability
            </Text>
            <RadioGroup
              value={formData.availability || 'flexible'}
              onChange={(value) => handlePreferenceChange('availability', value)}
            >
              <Stack spacing={3}>
                <Radio value="immediate" colorScheme="purple">
                  Available immediately
                </Radio>
                <Radio value="flexible" colorScheme="purple">
                  Flexible timing
                </Radio>
                <Radio value="scheduled" colorScheme="purple">
                  Prefer scheduled campaigns
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      ) : (
        // Brand Preferences
        <VStack spacing={6}>
          {/* Budget Range */}
          <Box w="full">
            <Text fontSize="md" fontWeight="medium" color={textColor} mb={3}>
              Campaign Budget Range
            </Text>
            <Select
              placeholder="Select budget range"
              value={formData.budgetRange || ''}
              onChange={(e) => handlePreferenceChange('budgetRange', e.target.value)}
              size="lg"
              borderRadius="lg"
            >
              {budgetRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </Select>
          </Box>

          {/* Campaign Timeline */}
          <Box w="full">
            <Text fontSize="md" fontWeight="medium" color={textColor} mb={3}>
              Preferred Campaign Timeline
            </Text>
            <Select
              placeholder="Select timeline"
              value={formData.timeline || ''}
              onChange={(e) => handlePreferenceChange('timeline', e.target.value)}
              size="lg"
              borderRadius="lg"
            >
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Box>

          {/* Target Audience Size */}
          <Box w="full">
            <Text fontSize="md" fontWeight="medium" color={textColor} mb={3}>
              Target Influencer Audience Size
            </Text>
            <RadioGroup
              value={formData.targetAudienceSize || 'micro'}
              onChange={(value) => handlePreferenceChange('targetAudienceSize', value)}
            >
              <Stack spacing={3}>
                <Radio value="micro" colorScheme="purple">
                  Micro (1K - 10K followers)
                </Radio>
                <Radio value="small" colorScheme="purple">
                  Small (10K - 50K followers)
                </Radio>
                <Radio value="medium" colorScheme="purple">
                  Medium (50K - 500K followers)
                </Radio>
                <Radio value="large" colorScheme="purple">
                  Large (500K+ followers)
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>

          {/* Campaign Goals */}
          <Box w="full">
            <Text fontSize="md" fontWeight="medium" color={textColor} mb={3}>
              Campaign Goals
            </Text>
            <CheckboxGroup
              value={formData.campaignGoals || []}
              onChange={(value) => handlePreferenceChange('campaignGoals', value)}
            >
              <VStack align="start" spacing={2}>
                <Checkbox value="brand-awareness" colorScheme="purple">
                  Brand Awareness
                </Checkbox>
                <Checkbox value="engagement" colorScheme="purple">
                  Engagement
                </Checkbox>
                <Checkbox value="sales" colorScheme="purple">
                  Sales & Conversions
                </Checkbox>
                <Checkbox value="reach" colorScheme="purple">
                  Reach & Impressions
                </Checkbox>
                <Checkbox value="lead-generation" colorScheme="purple">
                  Lead Generation
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </Box>
        </VStack>
      )}

      <Box
        p={3}
        bg="purple.50"
        borderRadius="lg"
        border="1px"
        borderColor="purple.200"
      >
        <Text fontSize="xs" color="purple.700" textAlign="center">
          🎯 These preferences help us match you with the best opportunities. You can always update them later!
        </Text>
      </Box>
    </VStack>
  );
};

export default Preferences;
