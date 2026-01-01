'use client';

import { Box, Text, Stack, HStack, Badge, Button, Table } from '@chakra-ui/react';

// Przywrócone importy z podfolderu ./ui/
import { StatLabel, StatRoot, StatValueText } from './ui/stat';
import { ProgressBar, ProgressRoot } from './ui/progress';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import React from 'react';
import { FinancialDataset, PredictionData } from '../types';

export const PredictionResult = ({
  data,
  dataset,
}: {
  data: PredictionData;
  dataset?: FinancialDataset;
}) => {
  const risePct = (data.probability_rise * 100).toFixed(1);
  const fallPct = (data.probability_fall * 100).toFixed(1);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="8"
      bg="bg.panel"
      boxShadow="sm"
      width="100%" /* Komponent zajmuje 100% dostępnej szerokości */
      maxW="full"
    >
      <Stack gap="6">
        {/* POPUP BUTTON - CHECK DATA */}
        <DialogRoot size="lg" placement="center">
          <DialogTrigger asChild>
            <Button variant="surface" colorPalette="blue" size="md" width="full">
              Check Data
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Financial Dataset Details</DialogTitle>
            </DialogHeader>
            <DialogBody pb="6">
              <Table.Root size="md" variant="line">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Indicator</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Value</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Result</Table.Cell>
                    <Table.Cell textAlign="end">{dataset?.result ?? 'N/A'}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>MA20</Table.Cell>
                    <Table.Cell textAlign="end">{dataset?.MA20 ?? 'N/A'}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>MA50</Table.Cell>
                    <Table.Cell textAlign="end">{dataset?.MA50 ?? 'N/A'}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </DialogBody>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>

        {/* MODEL INFO */}
        <HStack justify="space-between">
          <Text textStyle="md" color="fg.muted">
            Model Used:
          </Text>
          <Badge variant="subtle" colorPalette="blue" size="lg">
            {data.model_used}
          </Badge>
        </HStack>

        <hr />

        {/* MAIN PREDICTION */}
        <StatRoot>
          <StatLabel textStyle="md">Prediction Result</StatLabel>
          <StatValueText fontSize="4xl" color={data.prediction === 1 ? 'green.500' : 'red.500'}>
            {data.prediction === 1 ? 'RISE' : 'FALL'}
          </StatValueText>
        </StatRoot>

        {/* PROBABILITIES - FULL WIDTH */}
        <Stack gap="5" width="100%">
          <Box width="100%">
            <HStack justify="space-between" mb="2">
              <Text textStyle="sm" fontWeight="bold">
                Rise Probability
              </Text>
              <Text textStyle="sm" fontWeight="bold">
                {risePct}%
              </Text>
            </HStack>
            <ProgressRoot value={parseFloat(risePct)} colorPalette="green" size="md" width="100%">
              <ProgressBar />
            </ProgressRoot>
          </Box>

          <Box width="100%">
            <HStack justify="space-between" mb="2">
              <Text textStyle="sm" fontWeight="bold">
                Fall Probability
              </Text>
              <Text textStyle="sm" fontWeight="bold">
                {fallPct}%
              </Text>
            </HStack>
            <ProgressRoot value={parseFloat(fallPct)} colorPalette="red" size="md" width="100%">
              <ProgressBar />
            </ProgressRoot>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export const PredictionResultMemo = React.memo(PredictionResult);
