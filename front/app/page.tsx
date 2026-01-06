'use client';

import { Box, Button, Container, Flex, Heading, Text, VStack, IconButton } from '@chakra-ui/react';
import { Tooltip } from '../components/ui/tooltip';
import { LuPlus, LuInfo, LuLayoutDashboard } from 'react-icons/lu';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxW="container.xl" h="calc(100vh - 160px)" py="8">
      <Flex
        justify="space-between"
        align="center"
        mb="10"
        direction={{ base: 'column', sm: 'row' }}
        gap="4"
      >
        <VStack align={{ base: 'center', sm: 'start' }} gap="1">
          <Heading size="lg" fontWeight="bold">
            Dashboard
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Overview of your financial analysis operations
          </Text>
        </VStack>

        <Flex align="center" gap="3">
          <Link href="/create-model" passHref>
            <Button colorPalette="teal" size="md" gap="2">
              <LuPlus size="18" />
              Create model
            </Button>
          </Link>

          <Tooltip content="Click 'Create model' to configure a new dataset for AI training and analysis.">
            <IconButton variant="ghost" aria-label="Information" rounded="full" color="gray.400">
              <LuInfo size="20" />
            </IconButton>
          </Tooltip>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="400px"
        border="2px dashed"
        borderColor="gray.200"
        _dark={{ borderColor: 'gray.700' }}
        borderRadius="2xl"
        bg="white/50"
      >
        <VStack gap="6">
          <Box p="8" bg="gray.100" _dark={{ bg: 'gray.800' }} borderRadius="full" color="gray.400">
            <LuLayoutDashboard size="50" />
          </Box>

          <VStack gap="2" textAlign="center">
            <Heading size="md" color="gray.700" _dark={{ color: 'gray.200' }}>
              No models found
            </Heading>
            <Text color="gray.500" maxW="320px">
              Your model database is currently empty. Create a financial model to start predictive
              analysis.
            </Text>
          </VStack>

          <Link href="/create-model" passHref>
            <Button variant="surface" colorPalette="teal">
              Get Started
            </Button>
          </Link>
        </VStack>
      </Flex>
    </Container>
  );
}
