import { Box, Heading, Container, Text, Stack } from '@chakra-ui/react';
import ModelsTable from '../../components/ModelsTable';

export const metadata = {
  title: 'Models List | FinAnalyze AI',
};

export default function ModelsPage() {
  return (
    <Box bg="gray.50" _dark={{ bg: 'transparent' }} minH="calc(100vh - 160px)">
      <Container maxW="container.xl" py="8">
        <Stack gap="6">
          <Box>
            <Heading size="lg">Financial Models</Heading>
            <Text color="gray.500">Manage and train your financial analysis models.</Text>
          </Box>
          <ModelsTable />
        </Stack>
      </Container>
    </Box>
  );
}
