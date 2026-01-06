import { Box, Container, Stack, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box
      as="footer"
      background="gray.50"
      _dark={{ background: 'gray.900', borderColor: 'gray.800' }}
      borderTop="1px solid"
      borderColor="gray.200"
      mt="auto"
      py="6"
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap="4"
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            © 2024 FinAnalyze AI. All rights reserved
          </Text>
          <Stack direction="row" gap="6">
            <Text as="a" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
              Terms
            </Text>
            <Text as="a" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
              Privacy
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
