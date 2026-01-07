'use client';

import {
  Table,
  IconButton,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Box,
  Badge,
} from '@chakra-ui/react';
import { LuSettings, LuPlay, LuCalendar } from 'react-icons/lu';

const mockModels = [
  {
    id: '1',
    name: 'Alpha_XGB',
    type: 'Stock',
    classifier: 'XGBoost',
    dataset_name: 'Allegro (AL.WA)',
    date_range: '2022-01-01 - 2024-01-01',
    status: 'Created',
  },
  {
    id: '2',
    name: 'Crypto_RF',
    type: 'Crypto',
    classifier: 'Random Forest',
    dataset_name: 'Bitcoin (BTC/USD)',
    date_range: '2023-05-10 - 2025-01-01',
    status: 'Created',
  },
];

export default function ModelsTable() {
  return (
    <Box
      bg="white"
      _dark={{ bg: 'gray.900' }}
      borderRadius="xl"
      boxShadow="sm"
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Table.Root size="md" variant="line">
        <Table.Header bg="gray.50" _dark={{ bg: 'gray.800/50' }}>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Classifier</Table.ColumnHeader>
            <Table.ColumnHeader>Dataset Name</Table.ColumnHeader>
            <Table.ColumnHeader>Start/End Date</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {mockModels.map((model) => (
            <Table.Row key={model.id} _hover={{ bg: 'gray.50/50', _dark: { bg: 'gray.800/20' } }}>
              <Table.Cell fontWeight="semibold">{model.name}</Table.Cell>
              <Table.Cell>
                <Badge variant="outline" colorPalette={model.type === 'Crypto' ? 'orange' : 'blue'}>
                  {model.type}
                </Badge>
              </Table.Cell>
              <Table.Cell>{model.classifier}</Table.Cell>
              <Table.Cell fontSize="sm">{model.dataset_name}</Table.Cell>
              <Table.Cell fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                <LuCalendar style={{ display: 'inline', marginRight: '4px' }} />
                {model.date_range}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <MenuRoot positioning={{ placement: 'bottom-end', gutter: 8 }}>
                  <MenuTrigger asChild>
                    <IconButton variant="ghost" size="sm" aria-label="More options">
                      <LuSettings />
                    </IconButton>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem value="train" gap="2" color="teal.600">
                      <LuPlay size="14" />
                      Train
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
