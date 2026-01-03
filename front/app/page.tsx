import Image from 'next/image';
import Card from '../components/Card';
import { PredictionData } from '../types';
import ConfigurePage from '../components/ConfigurePage';

async function getPredictionDetails(): Promise<PredictionData[]> {
  const apiUrl = process.env.API_URL || 'http://127.0.0.1:5000';

  try {
    const res = await fetch(`${apiUrl}/api/train`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    const data: PredictionData[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const predictionDetails: PredictionData[] = await getPredictionDetails();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ConfigurePage />
        <Card />
      </main>
    </div>
  );
}
