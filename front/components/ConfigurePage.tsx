'use client';

import { useState } from 'react';
import { Box, Button, Stack, Heading, Text, Input, HStack } from '@chakra-ui/react';
import { Field } from './ui/field';
import { NativeSelectField, NativeSelectRoot } from './ui/native-select';

const ConfigurePage = () => {
  const [loading, setLoading] = useState(false);
  const [modelType, setModelType] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    // event.preventDefault();
    // setLoading(true);
    // // Logika wysyłania danych
    // const formData = new FormData(event.currentTarget as HTMLFormElement);
    // const data = Object.fromEntries(formData.entries());
    // console.log('Form Submitted:', data);
    // // Symulacja API
    // setTimeout(() => setLoading(false), 1000);
  };

  const handleModelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModelType(event.target.value);
    console.log('Wybrany typ:', event.target.value);
  };

  return (
    <Box width="100%" maxW="full" p="8" borderWidth="1px" borderRadius="lg" bg="bg.panel">
      <form onSubmit={handleSubmit}>
        <Stack gap="6">
          <Heading size="md">Model Configuration</Heading>

          <Field label="Type">
            <NativeSelectRoot>
              <NativeSelectField
                name="model_type"
                placeholder="Select Type"
                value={modelType}
                onChange={handleModelTypeChange}
              >
                <option value="stock">Stock</option>
                <option value="crypto">Crypto</option>
                <option value="other">Other</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>

          <Field label="Classifier">
            <NativeSelectRoot>
              <NativeSelectField name="Classifier" placeholder="Select Classifier">
                <option value="random_forest">Random Forest</option>
                <option value="xgboost">XGBoost</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>

          {modelType === 'stock' && (
            <Field label="Finance Stock Dataset">
              <NativeSelectRoot>
                <NativeSelectField name="model_type" placeholder="Select model">
                  <option value="AL.WA">Allegro Stock Dataset (AL.WA)</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
          )}

          {modelType === 'crypto' && (
            <Field label="Crypto Dataset">
              <NativeSelectRoot>
                <NativeSelectField name="model_type" placeholder="Select model">
                  <option value="AL.WA">Allegro Stock Dataset</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
          )}

          <HStack gap="4" width="full">
            <Field label="Start Date">
              <Input type="date" name="start_date" />
            </Field>

            <Field label="End Date">
              <Input type="date" name="end_date" />
            </Field>
            <Field label="Dataset number of records">
              <Input
                type="number"
                name="records_count"
                defaultValue={0}
                disabled // Pole zablokowane
                variant="subtle" // Opcjonalnie: subtelniejszy wygląd dla zablokowanego pola
              />
            </Field>
          </HStack>

          <Button type="submit" colorPalette="blue" width="1/4" loading={loading}>
            Save Configuration
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ConfigurePage;
