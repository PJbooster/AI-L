import CreateModelForm from '../../components/CreateModelForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata = {
  title: 'Create Model | FinAnalyze AI',
  description: 'Configure your financial analysis model parameters',
};

export default function CreateModelPage() {
  return (
    <main>
      <CreateModelForm />
    </main>
  );
}
