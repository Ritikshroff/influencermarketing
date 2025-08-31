import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardBody,
  Avatar,
  Input,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Badge,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiSend, FiSearch, FiMoreVertical, FiCheck, FiCheckCircle } from 'react-icons/fi';

const MotionBox = motion(Box);

interface Message {
  id: string;
  text: string;
  sender: 'influencer' | 'brand';
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  brand: {
    id: string;
    companyName: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      brand: {
        id: '1',
        companyName: 'TechCorp Solutions',
        avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face'
      },
      lastMessage: 'Great! Looking forward to working with you on this campaign.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 2,
      messages: [
        {
          id: '1',
          text: 'Hi Sarah! We loved your content and would like to collaborate on our new product launch.',
          sender: 'brand',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          isRead: true
        },
        {
          id: '2',
          text: 'That sounds amazing! I\'d love to hear more about the campaign details.',
          sender: 'influencer',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          isRead: true
        },
        {
          id: '3',
          text: 'Great! Looking forward to working with you on this campaign.',
          sender: 'brand',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          isRead: false
        }
      ]
    },
    {
      id: '2',
      brand: {
        id: '2',
        companyName: 'Fashion Forward',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      lastMessage: 'The campaign is performing really well!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      unreadCount: 0,
      messages: [
        {
          id: '1',
          text: 'Hi Sarah! Your fashion content is perfect for our brand.',
          sender: 'brand',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          isRead: true
        },
        {
          id: '2',
          text: 'Thank you! I\'m excited to work with Fashion Forward.',
          sender: 'influencer',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
          isRead: true
        },
        {
          id: '3',
          text: 'The campaign is performing really well!',
          sender: 'brand',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          isRead: true
        }
      ]
    },
    {
      id: '3',
      brand: {
        id: '3',
        companyName: 'Health & Wellness Co',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      lastMessage: 'When can you start the campaign?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      unreadCount: 1,
      messages: [
        {
          id: '1',
          text: 'Hi Sarah! We\'re looking for influencers for our wellness campaign.',
          sender: 'brand',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          isRead: true
        },
        {
          id: '2',
          text: 'I\'m interested! What are the campaign details?',
          sender: 'influencer',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          isRead: true
        },
        {
          id: '3',
          text: 'When can you start the campaign?',
          sender: 'brand',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          isRead: false
        }
      ]
    }
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'influencer',
      timestamp: new Date(),
      isRead: false
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage,
          lastMessageTime: new Date(),
          messages: [...conv.messages, message]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const ConversationItem = ({ conversation }: { conversation: Conversation }) => (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        bg={bgColor}
        border="1px"
        borderColor={borderColor}
        shadow="sm"
        cursor="pointer"
        onClick={() => {
          setSelectedConversation(conversation);
          if (isMobile) onOpen();
        }}
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
      >
        <CardBody p={4}>
          <HStack spacing={3} align="start">
            <Avatar
              size="md"
              src={conversation.brand.avatar}
              name={conversation.brand.companyName}
            />
            <VStack align="start" spacing={1} flex={1}>
              <HStack justify="space-between" w="full">
                <Text fontWeight="semibold" fontSize="sm">
                  {conversation.brand.companyName}
                </Text>
                <Text fontSize="xs" color={mutedTextColor}>
                  {formatTime(conversation.lastMessageTime)}
                </Text>
              </HStack>
              <Text fontSize="sm" color={mutedTextColor} noOfLines={2}>
                {conversation.lastMessage}
              </Text>
            </VStack>
            {conversation.unreadCount > 0 && (
              <Badge colorScheme="purple" borderRadius="full" px={2}>
                {conversation.unreadCount}
              </Badge>
            )}
          </HStack>
        </CardBody>
      </Card>
    </MotionBox>
  );

  const ChatInterface = () => (
    <VStack h="full" spacing={0}>
      {/* Chat Header */}
      <Box
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        p={4}
        w="full"
      >
        <HStack spacing={3}>
          <Avatar
            size="sm"
            src={selectedConversation?.brand.avatar}
            name={selectedConversation?.brand.companyName}
          />
          <VStack align="start" spacing={0} flex={1}>
            <Text fontWeight="semibold">
              {selectedConversation?.brand.companyName}
            </Text>
            <Text fontSize="xs" color={mutedTextColor}>
              Active now
            </Text>
          </VStack>
          <IconButton
            aria-label="More options"
            icon={<FiMoreVertical />}
            variant="ghost"
            size="sm"
          />
        </HStack>
      </Box>

      {/* Messages */}
      <Box
        flex={1}
        overflowY="auto"
        p={4}
        w="full"
        bg="gray.50"
      >
        <VStack spacing={4} align="stretch">
          {selectedConversation?.messages.map((message) => (
            <HStack
              key={message.id}
              justify={message.sender === 'influencer' ? 'flex-end' : 'flex-start'}
              spacing={2}
            >
              {message.sender === 'brand' && (
                <Avatar
                  size="xs"
                  src={selectedConversation.brand.avatar}
                  name={selectedConversation.brand.companyName}
                />
              )}
              <Box
                maxW="70%"
                bg={message.sender === 'influencer' ? 'purple.500' : bgColor}
                color={message.sender === 'influencer' ? 'white' : 'inherit'}
                p={3}
                borderRadius="lg"
                border={message.sender === 'brand' ? '1px' : 'none'}
                borderColor={borderColor}
              >
                <Text fontSize="sm">{message.text}</Text>
                <HStack justify="flex-end" mt={2} spacing={1}>
                  <Text fontSize="xs" opacity={0.7}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  {message.sender === 'influencer' && (
                    <Icon
                      as={message.isRead ? FiCheckCircle : FiCheck}
                      boxSize={3}
                      opacity={0.7}
                    />
                  )}
                </HStack>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Message Input */}
      <Box
        bg={bgColor}
        borderTop="1px"
        borderColor={borderColor}
        p={4}
        w="full"
      >
        <HStack spacing={3}>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            size="md"
            borderRadius="lg"
          />
          <IconButton
            aria-label="Send message"
            icon={<FiSend />}
            colorScheme="purple"
            onClick={handleSendMessage}
            isDisabled={!newMessage.trim()}
            size="md"
            borderRadius="lg"
          />
        </HStack>
      </Box>
    </VStack>
  );

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
            Messages 💬
          </Heading>
          <Text color={mutedTextColor}>
            Chat with brands and manage your conversations
          </Text>
        </VStack>
      </MotionBox>

      {/* Mobile Layout */}
      {isMobile ? (
        <VStack spacing={4} align="stretch">
          {/* Search */}
          <Box position="relative">
            <Input
              placeholder="Search conversations..."
              pl={10}
              size="md"
              borderRadius="lg"
            />
            <Icon
              as={FiSearch}
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              boxSize={4}
            />
          </Box>

          {/* Conversation List */}
          <VStack spacing={3} align="stretch">
            {conversations.map((conversation) => (
              <ConversationItem key={conversation.id} conversation={conversation} />
            ))}
          </VStack>

          {/* Chat Drawer */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottom="1px" borderColor={borderColor}>
                {selectedConversation?.brand.companyName}
              </DrawerHeader>
              <DrawerBody p={0}>
                {selectedConversation && <ChatInterface />}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </VStack>
      ) : (
        /* Desktop Layout */
        <Box display="flex" h="600px" gap={4}>
          {/* Conversation List */}
          <Box w="350px" flexShrink={0}>
            <VStack spacing={3} align="stretch" h="full">
              {/* Search */}
              <Box position="relative">
                <Input
                  placeholder="Search conversations..."
                  pl={10}
                  size="md"
                  borderRadius="lg"
                />
                <Icon
                  as={FiSearch}
                  position="absolute"
                  left={3}
                  top="50%"
                  transform="translateY(-50%)"
                  color="gray.400"
                  boxSize={4}
                />
              </Box>

              {/* Conversations */}
              <Box flex={1} overflowY="auto">
                <VStack spacing={3} align="stretch">
                  {conversations.map((conversation) => (
                    <ConversationItem key={conversation.id} conversation={conversation} />
                  ))}
                </VStack>
              </Box>
            </VStack>
          </Box>

          {/* Chat Interface */}
          <Box flex={1} bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor} overflow="hidden">
            {selectedConversation ? (
              <ChatInterface />
            ) : (
              <VStack justify="center" align="center" h="full" spacing={4}>
                <Text fontSize="lg" color={mutedTextColor}>
                  Select a conversation to start chatting
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Choose from your conversations on the left
                </Text>
              </VStack>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Messages;
