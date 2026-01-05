'use client';

import { SimpleGrid, Container } from '@chakra-ui/react';
import { PredictionResultMemo } from './PredictionResult';

export function Card() {
  const predictionsArray = [
    { model_used: 'RandomForest', prediction: 1, probability_rise: 0.75, probability_fall: 0.25 },
    { model_used: 'XGBoost', prediction: 0, probability_rise: 0.3, probability_fall: 0.7 },
    { model_used: 'NeuralNet', prediction: 1, probability_rise: 0.85, probability_fall: 0.15 },
    { model_used: 'SVM', prediction: 0, probability_rise: 0.45, probability_fall: 0.55 },
    { model_used: 'SVM', prediction: 0, probability_rise: 0.45, probability_fall: 0.55 },
  ];

  return (
    <Container maxW="full" py="10">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6" width="100%">
        {predictionsArray.map((item, index) => (
          <PredictionResultMemo key={index} data={item} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Card;
