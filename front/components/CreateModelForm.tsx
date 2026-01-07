'use client';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  SimpleGrid,
  Separator,
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LuArrowLeft, LuSave, LuTrash2 } from 'react-icons/lu';
import Link from 'next/link';
import api from '@/lib/axios';
import { Field } from './ui/field';
import { NativeSelectField, NativeSelectRoot } from './ui/native-select';
import { toaster } from '@/components/ui/toaster';
import { useForm } from 'react-hook-form';

interface ModelFormData {
  model_name: string;
  model_type: string;
  classifier: string;
  dataset_name: string;
  start_date: string;
  end_date: string;
}

export default function CreateModelForm() {
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [recordCount, setRecordCount] = useState(0);
  const [modelType, setModelType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<ModelFormData>({
    defaultValues: {
      model_type: 'stock',
      start_date: '2022-01-01',
      end_date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: ModelFormData) => {
    setIsLoading(true);

    try {
      await api.post('/models', data);
      toaster.create({
        title: 'Model created',
        description: 'Your financial model is ready for training.',
        type: 'success',
      });

      router.push('/');
    } catch (error) {
      toaster.create({
        title: 'Error during model creation',
        description: 'Try again later.',
        type: 'error',
      });

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleModelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModelType(event.target.value);
    console.log('Wybrany typ:', event.target.value);
  };

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setRecordCount(diffDays);
    }
  }, [startDate, endDate]);

  return (
    <Flex flex="1" direction="column" justify="center" bg="gray.50" _dark={{ bg: 'transparent' }}>
      <Container maxW="container.md" py="10">
        <Link href="/" passHref>
          <HStack
            color="teal.600"
            mb="4"
            cursor="pointer"
            _hover={{ color: 'teal.700' }}
            gap="2"
            width="fit-content"
          >
            <LuArrowLeft size="16" />
            <Text fontSize="sm" fontWeight="medium">
              Back to Dashboard
            </Text>
          </HStack>
        </Link>

        <Box
          bg="white"
          _dark={{ bg: 'gray.900', borderColor: 'gray.800' }}
          borderRadius="xl"
          p={{ base: 6, md: 10 }}
          boxShadow="sm"
        >
          <Stack gap="8">
            <Box>
              <Heading size="xl" mb="2">
                Create Financial Model
              </Heading>
              <Text color="gray.500" fontSize="md">
                Configure your data parameters and machine learning algorithm.
              </Text>
            </Box>

            <Separator />

            <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
              {/* Type Select */}
              <Stack gap="2">
                <Field label="Model Name" fontWeight="bold">
                  <Input
                    {...register('model_name', { required: true })}
                    name="model_name"
                    placeholder="e.g. My First Prediction Model"
                    focusRingColor="teal.500"
                    // variant="subtle"
                  />
                </Field>
              </Stack>

              <Stack gap="2">
                <Field label="Type">
                  <NativeSelectRoot>
                    <NativeSelectField
                      {...register('model_type')}
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
              </Stack>

              {/* Ticker Select */}
              <Stack gap="2">
                <Field label="Classifier">
                  <NativeSelectRoot>
                    <NativeSelectField placeholder="Select Classifier" {...register('classifier')}>
                      <option value="random_forest">Random Forest</option>
                      <option value="xgboost">XGBoost</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
              </Stack>

              {/* Algorithm Select */}
              <Stack gap="2">
                {modelType === 'stock' && (
                  <Field label="Finance Stock Dataset">
                    <NativeSelectRoot>
                      <NativeSelectField placeholder="Select model" {...register('dataset_name')}>
                        <option value="AL.WA">Allegro Stock Dataset (AL.WA)</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>
                )}
              </Stack>

              <Stack gap={2}>
                {modelType === 'crypto' && (
                  <Field label="Crypto Dataset" fontWeight="bold">
                    <NativeSelectRoot>
                      <NativeSelectField placeholder="Select model" {...register('dataset_name')}>
                        <option value="AL.WA">Allegro Stock Dataset</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>
                )}
              </Stack>

              <HStack
                gridColumn={{ base: 'auto', md: '1 / -1' }}
                width="full"
                gap="4"
                alignItems="flex-end"
              >
                <Field label="Start Date">
                  <Input type="date" {...register('start_date')} />
                </Field>

                <Field label="End Date">
                  <Input type="date" {...register('end_date')} />
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
            </SimpleGrid>

            <Separator mt="4" />

            <Flex justify="space-between" align="center" pt="2">
              <Button variant="ghost" colorPalette="red" gap="2" size="sm">
                <LuTrash2 size="18" /> Clear Form
              </Button>

              <HStack gap="4">
                <Button variant="outline" size="md">
                  Cancel
                </Button>
                <Button
                  colorPalette="teal"
                  loading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                  size="md"
                  gap="2"
                  px="8"
                >
                  <LuSave size="18" /> Create Model
                </Button>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
}
